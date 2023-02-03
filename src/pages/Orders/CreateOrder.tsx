import type React from 'react'
import { useEffect, useState } from 'react'
import { BiChevronLeft, BiSend } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

import * as jcof from 'jcof'
import { useMetaMask } from 'metamask-react'

import orderContract from '@/data/orderContract'
import useTypedSelector from '@/hooks/useTypedSelector'
import { simplifyHash } from '@/utils/helpers'

import { fetchUser } from '../Users/Users'
import type { User } from '../Users/Users'
import css from './CreateOrder.module.css'

export interface OrderType {
  material: string
  provider: string
  importer: string
  supplier: string
  security: string
  quantity: string
  [key: string]: string
}
export default function CreateOrder() {
  const { ethereum, account } = useMetaMask()
  const [users, setUsers] = useState<User[]>([])
  const userId = useTypedSelector((state) => state.UserSlice.id)
  const navigate = useNavigate()

  const providers: User[] = users.filter((user) => user.role === 'Provider')
  const importers: User[] = users.filter((user) => user.role === 'Importer')
  const suppliers: User[] = users.filter((user) => user.role === 'Supplier')
  const securities: User[] = users.filter((user) => user.role === 'Security')

  // console.log({ providers, importer, supplier, security })

  useEffect(() => {
    fetchUser(ethereum, setUsers)
  }, [ethereum])

  const [order, setOrder] = useState<OrderType>({
    material: 'uranium',
    provider: '',
    importer: '',
    supplier: '',
    security: '',
    quantity: '0',
  })

  const handleOrderState = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setOrder((prev) => {
      prev[name] = value.toString()
      return { ...prev }
    })
  }

  const saveOrder = async () => {
    const { provider, importer, supplier, security, quantity, material } = order
    if (!provider || !importer || !supplier || !security || !quantity || !material) {
      return
    }

    const oderDetails = jcof.stringify({
      providerIds: [provider],
      importerIds: [importer],
      supplierIds: [supplier],
      securityIds: [security],
      products: [{ material, quantity: Number(quantity) }],
      unitPrice: 0,
      date: new Date().toISOString(),
    })

    const orderStatus = jcof.stringify({
      providerApproval: 'pending',
      importerApproval: 'pending',
      supplierApproval: 'pending',
      securityApproval: 'pending',
      orderStatus: 'pending',
    })

    const paymentStatus = jcof.stringify({
      providerPayment: 'pending',
      importerPayment: 'pending',
      supplierPayment: 'pending',
      securityPayment: 'pending',
    })

    const securityStatus = jcof.stringify({
      state: true,
      milestones: '1/1',
      validation: 'pending',
    })

    const delivaryStatus = jcof.stringify({
      location: '',
      eta: '',
    })

    // console.log(userId)
    const res = await orderContract(ethereum)
      .methods.createOrder(
        Number(userId),
        oderDetails,
        orderStatus,
        paymentStatus,
        securityStatus,
        delivaryStatus,
      )
      .send({ from: account, gas: 3000000 })

    if (res.status) {
      navigate('/orders')
    }
  }

  return (
    <div>
      <h1 className="text-lg font-bold flex items-center gap-3 ">
        <Link to="/orders" className="btn btn-circle btn-sm btn-outline">
          <BiChevronLeft size={22} />
        </Link>
        Place a New Order
      </h1>

      <h2 className="mt-5 mb-2 font-semibold">Select Material</h2>
      <div className="flex gap-3">
        <label className={css['img-btn']}>
          <input
            type="radio"
            name="material"
            checked={order.material === 'uranium'}
            value="uranium"
            onChange={handleOrderState}
          />
          <img
            src="data:image/png;base64,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"
            alt="uranium logo"
          />
        </label>

        <label className={css['img-btn']}>
          <input
            type="radio"
            name="material"
            checked={order.material === 'plutonium'}
            value="plutonium"
            onChange={handleOrderState}
          />
          <img
            src="data:image/png;base64,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"
            alt="Plutonium logo"
          />
        </label>

        <label className={css['img-btn']}>
          <input
            type="radio"
            name="material"
            checked={order.material === 'thorium'}
            value="thorium"
            onChange={handleOrderState}
          />
          <img
            src="data:image/png;base64,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"
            alt="Thorium logo"
          />
        </label>
      </div>

      <div className="form-control mt-5">
        <label className="input-group input-group-md ">
          <span>Quantity</span>
          <input
            onChange={handleOrderState}
            name="quantity"
            type="number"
            placeholder="0.00"
            className="input input-bordered input-md"
          />
          <span>tons</span>
        </label>
      </div>

      <div className="flex gap-4">
        <div className="form-control my-3">
          <div className="input-group">
            <span>Provider</span>
            <select
              title="Select Provider"
              name="provider"
              onChange={handleOrderState}
              value={order.provider}
              className="select select-bordered"
            >
              <option>Select Provider</option>
              {providers?.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name} ({simplifyHash(provider.accountHash)})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-control my-3">
          <div className="input-group">
            <span>Supplier</span>
            <select
              title="Select Supplier"
              name="supplier"
              onChange={handleOrderState}
              value={order.supplier}
              className="select select-bordered"
            >
              <option>Select Supplier</option>
              {suppliers?.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name} ({simplifyHash(supplier.accountHash)})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="form-control my-3">
          <div className="input-group">
            <span>Security</span>
            <select
              title="Select Security"
              name="security"
              onChange={handleOrderState}
              value={order.security}
              className="select select-bordered"
            >
              <option>Select Security</option>
              {securities.map((security) => (
                <option key={security.id} value={security.id}>
                  {security.name} ({simplifyHash(security.accountHash)})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-control my-3">
          <div className="input-group">
            <span>Importer</span>
            <select
              title="Select Importer"
              name="importer"
              onChange={handleOrderState}
              value={order.importer}
              className="select select-bordered"
            >
              <option>Select Importer</option>
              {importers.map((importer) => (
                <option key={importer.id} value={importer.id}>
                  {importer.name} ({simplifyHash(importer.accountHash)})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button onClick={saveOrder} type="button" className="btn btn-primary mt-2 btn-wide">
        Place Order
        <span className="ml-2">
          <BiSend size={22} />
        </span>
      </button>
    </div>
  )
}
