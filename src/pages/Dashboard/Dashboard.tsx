import { useEffect, useState } from 'react'
import { MdTimelapse } from 'react-icons/md'
import { TbTruckDelivery } from 'react-icons/tb'

import { useMetaMask } from 'metamask-react'

import type { Order } from '../Orders/Orders'
import { fetchOders } from '../Orders/Orders'

const countOnProgress = (orders: Order[] | undefined) => {
  if (!orders) {
    return 0
  }
  const onProgress = orders.filter((order) => order.deliveryStatus.eta !== '')
  return onProgress.length
}

const countOnPending = (orders: Order[] | undefined) => {
  if (!orders) {
    return 0
  }
  const onPending = orders.filter((order) => order.orderStatus.providerApproval === 'pending')
  return onPending.length
}

export default function Dashboard() {
  const { ethereum, account } = useMetaMask()

  const [orders, setOrders] = useState<Order[]>()

  useEffect(() => {
    if (account) {
      fetchOders(ethereum, setOrders)
    }
  }, [account, ethereum])

  // console.log(orders)
  const onProgress = countOnProgress(orders)
  const onPending = countOnPending(orders)
  // console.log(totalProgress)
  // const countOrProgress = orders?.

  const cards = [
    {
      title: 'On Progress',
      icon: <TbTruckDelivery size={45} strokeWidth={1.5} />,
      value: onProgress,
    },
    {
      title: 'On Pending',
      icon: <MdTimelapse size={45} />,
      value: onPending,
    },
  ]

  return (
    <div className="flex ">
      {cards.map((card) => (
        <div
          key={card.title}
          className="flex justify-between items-center w-56 p-4 rounded-xl border dark:shadow-md dark:border-slate-700 dark:bg-slate-900 bg-white mx-2"
        >
          <div className="flex flex-col">
            <span>{card.title}</span>
            <span className="text-xl font-semibold mt-3">{card.value}</span>
          </div>
          {card.icon}
        </div>
      ))}
    </div>
  )
}
