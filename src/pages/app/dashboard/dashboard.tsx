import { Helmet } from 'react-helmet-async'

import { DashboardDayOrdersAmountCard } from './dashboard-day-orders-amount-card'
import { DashboardMonthCancelOrdersAmountCard } from './dashboard-month-canceled-orders-amount-card'
import { DashboardMonthOrdersAmountCard } from './dashboard-month-orders-amount-card'
import { DashboardMonthRevenueCard } from './dashboard-month-revenue-card'
import DashboardPopularProductsChart from './dashboard-popular-products-chart'
import DashboardRevenueChart from './dashboard-revenue-chart'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Pedidos</h1>

        <div className="grid grid-cols-4 gap-4 space-y-2.5">
          <DashboardMonthRevenueCard />
          <DashboardMonthOrdersAmountCard />
          <DashboardDayOrdersAmountCard />
          <DashboardMonthCancelOrdersAmountCard />
        </div>

        <div className="grid grid-cols-9 gap-4 space-y-2.5">
          <DashboardRevenueChart />
          <DashboardPopularProductsChart />
        </div>
      </div>
    </>
  )
}
