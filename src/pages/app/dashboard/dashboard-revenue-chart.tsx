import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  { date: '10/12', revenue: 1800 },
  { date: '11/12', revenue: 1500 },
  { date: '12/12', revenue: 950 },
  { date: '13/12', revenue: 400 },
  { date: '14/12', revenue: 750 },
  { date: '15/12', revenue: 600 },
  { date: '16/12', revenue: 2100 },
]

export default function DashboardRevenueChart() {
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
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width={'100%'} height={240}>
          <LineChart style={{ fontSize: 12 }} data={data}>
            <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />

            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={100}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  currency: 'BRL',
                  style: 'currency',
                })
              }
            />

            <CartesianGrid vertical={false} className="stroke-muted" />

            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.violet['500']}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
