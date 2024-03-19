import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { routers } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <Toaster richColors closeButton />
      <Helmet titleTemplate="%s | pizza.shop" />
      <RouterProvider router={routers} />
    </HelmetProvider>
  )
}
