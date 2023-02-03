import { useEffect, useState } from 'react'
import { BiChevronLeft } from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom'

import * as jcof from 'jcof'
import { useMetaMask } from 'metamask-react'

import orderContract from '@/data/orderContract'
import useTypedSelector from '@/hooks/useTypedSelector'

import type { LatAndLng } from './Location'
import Location from './Location'
import type { Order } from './Orders'

const fetchOder = async (eth: unknown, orderId: string, setOrder: (orders: Order) => void) => {
  const { id, userId, orderDetails, orderStatus, paymentStatus, securityStatus, deliveryStatus } =
    await orderContract(eth).methods.orders(orderId).call()

  const order: Order = {
    id,
    userId,
    orderDetails: jcof.parse(orderDetails),
    orderStatus: jcof.parse(orderStatus),
    paymentStatus: jcof.parse(paymentStatus),
    securityStatus: jcof.parse(securityStatus),
    deliveryStatus: jcof.parse(deliveryStatus),
  }

  // console.log({
  //   userId,
  //   orderDetails: JSON.parse(orderDetails),
  //   orderStatus: JSON.parse(orderStatus),
  //   paymentStatus: JSON.parse(paymentStatus),
  //   securityStatus: JSON.parse(securityStatus),
  //   deliveryStatus: JSON.parse(deliveryStatus),
  // })

  setOrder(order)
}

export default function OrderDetails() {
  const { ethereum, account } = useMetaMask()
  const { id: orderId } = useParams()
  const [order, setOrder] = useState<Order>()
  const { id: loginUserId, role } = useTypedSelector((state) => state.UserSlice)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const isNotProvider = role !== 'Provider'
  const isNotImporter = role !== 'Importer'
  const isNotSecurity = role !== 'Security'
  const isNotSupplier = role !== 'Supplier'

  useEffect(() => {
    if (ethereum && orderId) {
      fetchOder(ethereum, orderId, setOrder)
    }
  }, [account, ethereum, orderId])

  const totalPrice = order?.orderDetails.products.reduce(
    (acc, cur) => acc + cur.unitPrice * cur.quantity,
    0,
  )

  const handleInputs = async (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { id, value, name } = e.target
    const tempOrder: Order = structuredClone(order)
    if (id === 'provider-status') {
      tempOrder.orderStatus.providerApproval = value
    } else if (id === 'importer-status') {
      tempOrder.orderStatus.importerApproval = value
    } else if (id === 'security-status') {
      tempOrder.orderStatus.securityApproval = value
    } else if (id === 'supplier-status') {
      tempOrder.orderStatus.supplierApproval = value
    } else if (id === 'provider-payment-status') {
      tempOrder.paymentStatus.providerPayment = value
    } else if (id === 'importer-payment-status') {
      tempOrder.paymentStatus.importerPayment = value
    } else if (id === 'security-payment-status') {
      tempOrder.paymentStatus.securityPayment = value
    } else if (id === 'supplier-payment-status') {
      tempOrder.paymentStatus.supplierPayment = value
    } else if (id === 'eta') {
      tempOrder.deliveryStatus.eta = value
    } else if (id === 'unit-price') {
      tempOrder.orderDetails.products[Number(name)].unitPrice = Number(value)
    }

    setOrder(tempOrder)
  }

  const updateOrder = async () => {
    const res = await orderContract(ethereum)
      .methods.updateOrder(
        orderId,
        loginUserId,
        jcof.stringify(order?.orderDetails),
        jcof.stringify(order?.orderStatus),
        jcof.stringify(order?.paymentStatus),
        jcof.stringify(order?.securityStatus),
        jcof.stringify(order?.deliveryStatus),
      )
      .send({ from: account, gas: 3000000 })

    if (res.status && orderId) {
      fetchOder(ethereum, orderId, setOrder)
    }
  }

  // lister event for order update
  useEffect(() => {
    if (ethereum) {
      const orderContractInstance = orderContract(ethereum)
      orderContractInstance.events
        .onOrderUpdate()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .on('data', (event: any) => {
          const {
            id,
            userId,
            orderDetails,
            orderStatus,
            paymentStatus,
            securityStatus,
            deliveryStatus,
          } = event.returnValues

          const order: Order = {
            id,
            userId,
            orderDetails: JSON.parse(orderDetails),
            orderStatus: JSON.parse(orderStatus),
            paymentStatus: JSON.parse(paymentStatus),
            securityStatus: JSON.parse(securityStatus),
            deliveryStatus: JSON.parse(deliveryStatus),
          }
          setOrder(order)
          // console.log({ event })
        })
        .on('error', console.error)
    }
  }, [ethereum, orderId])

  const handleLocation = ({ lat, lng }: LatAndLng) => {
    const tempOrder: Order = structuredClone(order)
    tempOrder.deliveryStatus.location = {
      lat,
      lng,
    }
    setOrder(tempOrder)
  }

  console.log(order?.deliveryStatus.location)

  return (
    <div>
      <div className="flex items-center ">
        <Link to="/orders" className="btn btn-circle btn-sm btn-outline mr-3">
          <BiChevronLeft size={22} />
        </Link>
        <h1 className="text-xl font-bold mr-1">Order Details</h1>
      </div>

      <br />
      <br />
      <div>Order ID: {order?.id}</div>
      <div className="w-2/5">
        <h2 className="font-semibold mt-2">Order Details</h2>
        <div className="overflow-x-auto mt-2">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>Material</th>
                <th>Quantity</th>
                <th>Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {order?.orderDetails.products.map((product, i) => (
                <tr key={`pdt-${i * 8}`}>
                  <td>{product.material}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <input
                      disabled={isNotProvider}
                      placeholder="0.00"
                      id="unit-price"
                      name={i.toString()}
                      type="number"
                      value={product.unitPrice}
                      onChange={handleInputs}
                      className="input input-xs"
                    />
                  </td>
                </tr>
              ))}

              <tr>
                <td></td>
                <td>Total:</td>
                <td>{totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card border-slate-900 border p-3 mt-4">
        <h2 className="font-semibold">Order Approval</h2>

        <div className="mt-2">
          <label htmlFor="provider-status" className="w-32 inline-block">
            Provider
          </label>
          <select
            disabled={isNotProvider}
            onChange={handleInputs}
            value={order?.orderStatus.providerApproval}
            id="provider-status"
            className="select select-bordered select-sm w-full max-w-xs"
          >
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="approved">Approved</option>
          </select>
        </div>
        <div className="mt-2">
          <label htmlFor="importer-status" className="w-32 inline-block">
            Importer
          </label>
          <select
            disabled={isNotImporter}
            onChange={handleInputs}
            value={order?.orderStatus.importerApproval}
            id="importer-status"
            className="select select-bordered select-sm w-full max-w-xs"
          >
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="approved">Ot the way</option>
          </select>
        </div>
        <div className="mt-2">
          <label htmlFor="security-status" className="w-32 inline-block">
            Security
          </label>
          <select
            disabled={isNotSecurity}
            onChange={handleInputs}
            value={order?.orderStatus.securityApproval}
            id="security-status"
            className="select select-bordered select-sm w-full max-w-xs"
          >
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="approved">Secured</option>
          </select>
        </div>
        <div className="mt-2">
          <label htmlFor="supplier-status" className="w-32 inline-block">
            Supplier
          </label>
          <select
            disabled={isNotSupplier}
            onChange={handleInputs}
            value={order?.orderStatus.supplierApproval}
            id="supplier-status"
            className="select select-bordered select-sm w-full max-w-xs"
          >
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="card border-slate-900 border p-3 mt-4">
        <h2 className="font-semibold ">Payment Status</h2>

        <div className="mt-2">
          <label htmlFor="provider-payment-status" className="w-32 inline-block">
            Provider
          </label>
          <select
            disabled={isNotProvider}
            onChange={handleInputs}
            value={order?.paymentStatus.providerPayment}
            id="provider-payment-status"
            className="select select-bordered select-sm w-full max-w-xs"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        <div className="mt-2">
          <label htmlFor="importer-payment-status" className="w-32 inline-block">
            Importer
          </label>
          <select
            disabled={isNotImporter}
            onChange={handleInputs}
            value={order?.paymentStatus.importerPayment}
            id="importer-payment-status"
            className="select select-bordered select-sm w-full max-w-xs"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div className="mt-2">
          <label htmlFor="security-payment-status" className="w-32 inline-block">
            Security
          </label>
          <select
            disabled={isNotSecurity}
            onChange={handleInputs}
            value={order?.paymentStatus.securityPayment}
            id="security-payment-status"
            className="select select-bordered select-sm w-full max-w-xs"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div className="mt-2">
          <label htmlFor="supplier-payment-status" className="w-32 inline-block">
            Supplier
          </label>
          <select
            disabled={isNotSupplier}
            onChange={handleInputs}
            value={order?.paymentStatus.supplierPayment}
            id="supplier-payment-status"
            className="select select-bordered select-sm w-full max-w-xs"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>

      <div className="card border-slate-900 border p-3 mt-4">
        <h2 className="font-semibold mt-8">Delivery Status</h2>

        <div className="mt-2">
          <label htmlFor="eta" className="w-32 inline-block">
            ETA
          </label>
          <input
            disabled={isNotImporter}
            onChange={handleInputs}
            type="date"
            value={order?.deliveryStatus.eta}
            id="eta"
            className="input input-xs"
          />
        </div>

        <p className="mt-2 mb-2">Location</p>
        <Location
          onChange={handleLocation}
          latlng={order?.deliveryStatus.location || { lat: 0, lng: 0 }}
          disabled={isNotImporter}
        />
      </div>

      <button onClick={updateOrder} className="btn btn-primary btn-wide mt-4">
        Update
      </button>
    </div>
  )
}

// provider status: approved | rejected | pending
// importer status: pending | recieved | on the way
// security status: pending | secured
// supplier status: pending | delivered

// payment status
// provider payment status: pending | paid
// importer payment status: pending | paid
// supplier payment status: pending | paid
// security payment status: pending | paid

// delivery status
// location:
// eta: 2021-10-10

// security status
// milestone: 1/3
// validation: ok | not ok
