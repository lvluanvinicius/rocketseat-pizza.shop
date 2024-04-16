import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { reactClient } from './lib/react-query'
import { routers } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizzashop-theme" defaultTheme="system">
        <Toaster richColors closeButton />
        <Helmet titleTemplate="%s | pizza.shop" />
        <QueryClientProvider client={reactClient}>
          <RouterProvider router={routers} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
