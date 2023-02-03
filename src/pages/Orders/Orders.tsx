import { useEffect, useState } from 'react'
import { BiChevronRight, BiTrash } from 'react-icons/bi'
import { TbPackgeExport } from 'react-icons/tb'
import { Link } from 'react-router-dom'

import * as jcof from 'jcof'
import { useMetaMask } from 'metamask-react'

import orderContract from '@/data/orderContract'

export interface Order {
  id: string
  userId: string
  orderDetails: {
    providerIds: string[]
    importerIds: string[]
    supplierIds: string[]
    securityIds: string[]
    products: {
      material: string
      quantity: number
      unitPrice: number
    }[]
    date: string
  }
  orderStatus: {
    providerApproval: string
    importerApproval: string
    supplierApproval: string
    securityApproval: string
    orderStatus: string
  }
  paymentStatus: {
    providerPayment: string
    importerPayment: string
    supplierPayment: string
    securityPayment: string
  }
  securityStatus: {
    state: string | boolean
    milestones: string
    validation: string
  }
  deliveryStatus: {
    location: { lat: number; lng: number }
    eta: string
  }
}

export const fetchOders = async (eth: unknown, setOrders: (orders: Order[]) => void) => {
  const orderArr: Order[] = []
  const orderCount = await orderContract(eth).methods.orderId().call()

  for (let i = 1; i <= Number(orderCount); i++) {
    const { id, userId, orderDetails, orderStatus, paymentStatus, securityStatus, deliveryStatus } =
      await orderContract(eth).methods.orders(i).call()

    orderArr.push({
      id,
      userId,
      orderDetails: jcof.parse(orderDetails),
      orderStatus: jcof.parse(orderStatus),
      paymentStatus: jcof.parse(paymentStatus),
      securityStatus: jcof.parse(securityStatus),
      deliveryStatus: jcof.parse(deliveryStatus),
    })

    // console.log({
    //   userId,
    //   orderDetails: JSON.parse(orderDetails),
    //   orderStatus: JSON.parse(orderStatus),
    //   paymentStatus: JSON.parse(paymentStatus),
    //   securityStatus: JSON.parse(securityStatus),
    //   deliveryStatus: JSON.parse(deliveryStatus),
    // })
    // console.log({
    //   userId,
    //   orderDetails,
    //   orderStatus,
    //   paymentStatus,
    //   securityStatus,
    //   deliveryStatus,
    // })
  }
  setOrders(orderArr)
}

export default function Orders() {
  const { ethereum, account } = useMetaMask()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (account) {
      fetchOders(ethereum, setOrders)
    }
  }, [account, ethereum])

  const deleteOrder = (id: string) => async () => {
    const res = await orderContract(ethereum).methods.deleteOrder(id).send({ from: account })
    if (res.status) {
      fetchOders(ethereum, setOrders)
    }
  }

  return (
    <div>
      <div className="flex items-center ">
        <h1 className="text-xl font-bold mr-1">Orders</h1>
        <Link to="/create-order" className="btn btn-sm btn-outline ml-3">
          <span className="mr-2">Place New Order</span>
          <TbPackgeExport size={22} />
        </Link>
      </div>

      <div className="mt-6 w-100 flex gap-4">
        {orders?.map((order, i) => (
          <div key={`order-${i + 9}`} className="card w-96 bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className="card-title">Order {order.id}</h2>
                <button
                  title="Delete order"
                  onClick={deleteOrder(order.id)}
                  type="button"
                  className="btn btn-sm btn-circle"
                >
                  <BiTrash />
                </button>
              </div>
              <p>Provider Status: {order.orderStatus.providerApproval}</p>
              <div className="card-actions justify-end">
                <Link to={`/order-details/${order.id}`} className="btn btn-primary">
                  Details <BiChevronRight />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
