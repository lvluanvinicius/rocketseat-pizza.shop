import { api } from '@/lib/axios'

interface IpdateProfileStoreBody {
  name: string
  description: string | null
}

export async function updateProfileStore({
  name,
  description,
}: IpdateProfileStoreBody) {
  await api.put('/profile', { name, description })
}
