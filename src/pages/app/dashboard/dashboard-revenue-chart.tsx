import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyReceiptInPeriod } from '@/api/daily-receipt-in-period'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DatePickerWithRange } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'

export default function DashboardRevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: subDays(new Date(), 7),
  })

  const { data: dailyReceiptInPeriod } = useQuery({
    queryKey: ['metrics', 'daily-receipt-in-period', dateRange],
    queryFn: () =>
      getDailyReceiptInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  })

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no perído
          </CardTitle>
          <CardDescription className="">
            Receita diária no período
          </CardDescription>
        </div>

        <div className="flex items-center gap-3 ">
          <Label>Período</Label>
          <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>

      <CardContent>
        {dailyReceiptInPeriod && (
          <ResponsiveContainer width={'100%'} height={240}>
            <LineChart style={{ fontSize: 12 }} data={dailyReceiptInPeriod}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />

              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={100}
                tickFormatter={(value: number) =>
                  (value / 100).toLocaleString('pt-BR', {
                    currency: 'BRL',
                    style: 'currency',
                  })
                }
              />

              <CartesianGrid vertical={false} className="stroke-muted" />

              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={colors.violet['500']}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
