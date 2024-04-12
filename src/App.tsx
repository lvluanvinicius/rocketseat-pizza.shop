import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { routers } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizzashop-theme" defaultTheme="system">
        <Toaster richColors closeButton />
        <Helmet titleTemplate="%s | pizza.shop" />
        <RouterProvider router={routers} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
