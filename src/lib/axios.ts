import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

if (env.VITE_API_ENABLED_DELY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolv) => setTimeout(resolv, 500))

    return config
  })
}
