import { MdTimelapse } from 'react-icons/md'
import { TbBuildingWarehouse, TbTruckDelivery } from 'react-icons/tb'

export default function Dashboard() {
  const onProgress = 2
  const onPending = 3
  const stockCapacity = '40%'

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
    {
      title: 'Stock Capacity',
      icon: <TbBuildingWarehouse size={45} />,
      value: stockCapacity,
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
