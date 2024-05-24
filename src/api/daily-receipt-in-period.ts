import { api } from '@/lib/axios'

export interface GetDailyReceiptInPeriodParams {
  from?: Date
  to?: Date
}

export type getDailyReceiptInPeriodResponse = {
  date: string
  receipt: number
}[]

export async function getDailyReceiptInPeriod({
  from,
  to,
}: GetDailyReceiptInPeriodParams) {
  const response = await api.get<getDailyReceiptInPeriodResponse>(
    '/metrics/daily-receipt-in-period',
    {
      params: {
        from,
        to,
      },
    },
  )

  return response.data
}
