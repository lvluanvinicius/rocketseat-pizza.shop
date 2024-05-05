export type OrderStatusType =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

export interface OrderStatusProps {
  status: OrderStatusType
}

const orderStatusMaps: Record<OrderStatusType, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  processing: 'Sendo preparado',
  delivering: 'Em entrega',
  delivered: 'Em preparo',
}

function translateColor(variant: OrderStatusType) {
  switch (variant) {
    case 'pending':
      return 'bg-slate-400'

    case 'canceled':
      return 'bg-rose-500'

    case 'processing':
      return 'bg-amber-500'

    case 'delivering':
      return 'bg-amber-500'

    case 'delivered':
      return 'bg-emerald-500'

    default:
      return 'bg-slate-400'
  }
}

export function OrderStatus({ status }: OrderStatusProps) {
  const classString = translateColor(status)

  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${classString}`} />
      <span className="font-medium text-muted-foreground">
        {orderStatusMaps[status]}
      </span>
    </div>
  )
}
