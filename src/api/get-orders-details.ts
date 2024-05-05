import { api } from './../lib/axios'

export interface GetOrdersDetails {
  orderId: string
}

export interface GetOrdersDetailsResponse {
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  id: string
  createdAt: string
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

export async function getOrderDetails({ orderId }: GetOrdersDetails) {
  const response = await api.get<GetOrdersDetailsResponse>(`/orders/${orderId}`)

  return response.data
}
