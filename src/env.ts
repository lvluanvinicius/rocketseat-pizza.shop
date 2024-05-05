import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_API_ENABLED_DELY: z.string().transform((value) => value === 'true'),
})

export const env = envSchema.parse(import.meta.env)
