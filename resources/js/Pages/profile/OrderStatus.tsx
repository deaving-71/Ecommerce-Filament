import { OrderStatus as TOrderStatus } from "@/types"

export type OrderStatusProps = {
  status: TOrderStatus
}

export function OrderStatus({ status }: OrderStatusProps) {
  let statusColor = ""
  switch (status) {
    case "pending":
      statusColor = "bg-yellow-500"
      break
    case "processing":
      statusColor = "bg-blue-500"
      break
    case "shipped":
      statusColor = "bg-green-500"
      break
    case "delivered":
      statusColor = "bg-green-700"
      break
    case "canceled":
      statusColor = "bg-red-500"
      break
    case "declined":
      statusColor = "bg-red-700"
      break
    default:
      statusColor = "bg-gray-500"
  }

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium capitalize text-white ${statusColor}`}
    >
      {status}
    </span>
  )
}
