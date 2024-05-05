import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { OrderStatus, OrderStatusType } from '@/pages/app/orders/order-status'

import { OrderDetails } from './order-details'

interface OrderTableRow {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRow) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderid: string, status: OrderStatusType) {
    const cachedOrderList = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    cachedOrderList.forEach(([cacheKey, cachedData]) => {
      if (!cachedData) {
        return null
      }

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cachedData,
        orders: cachedData.orders.map((order) => {
          if (order.orderId === orderid) {
            return { ...order, status }
          }

          return order
        }),
      })
    })
  }

  const { mutateAsync: approveOrderFN, isPending: pendingApproveOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'processing')
      },
    })

  const { mutateAsync: dispatchOrderFN, isPending: pendingDispatchOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivering')
      },
    })

  const { mutateAsync: deliverOrderFN, isPending: pendingDeliverOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivered')
      },
    })

  const { mutateAsync: cancelOrderFN, isPending: pendingCancelOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'canceled')
      },
    })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant={'outline'} size={'xs'}>
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do Pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-sm font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button
            variant={'outline'}
            size={'xs'}
            onClick={() => approveOrderFN({ orderId: order.orderId })}
            disabled={pendingApproveOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" /> Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            variant={'outline'}
            size={'xs'}
            onClick={() => dispatchOrderFN({ orderId: order.orderId })}
            disabled={pendingDispatchOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" /> Em entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            variant={'outline'}
            size={'xs'}
            onClick={() => deliverOrderFN({ orderId: order.orderId })}
            disabled={pendingDeliverOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" /> Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          onClick={() => cancelOrderFN({ orderId: order.orderId })}
          variant={'ghost'}
          size={'xs'}
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            pendingCancelOrder
          }
        >
          <X className="mr-2 h-3 w-3" /> Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
