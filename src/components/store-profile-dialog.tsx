import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManageRestaurant,
  GetManageRestaurantResponse,
} from '@/api/get-managed-restaurant'
import { updateProfileStore } from '@/api/update-profile'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()

  const { data: profileManagedRestaurant } = useQuery({
    queryKey: ['profile.managed-restaurant'],
    queryFn: getManageRestaurant,
    staleTime: Infinity,
  })

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: profileManagedRestaurant?.name ?? '',
      description: profileManagedRestaurant?.description ?? '',
    },
  })

  function updateManageRestaurantCached({
    name,
    description,
  }: StoreProfileSchema) {
    const cached = queryClient.getQueryData<GetManageRestaurantResponse>([
      'profile.managed-restaurant',
    ])

    if (cached) {
      queryClient.setQueryData<GetManageRestaurantResponse>(
        ['profile.managed-restaurant'],
        {
          ...cached,
          description,
          name,
        },
      )
    }

    return { cached }
  }

  const { mutateAsync: updateProfileStoreFn } = useMutation({
    mutationFn: updateProfileStore,
    onMutate({ name, description }) {
      const { cached } = updateManageRestaurantCached({ name, description })

      return { previousProfile: cached }
    },

    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManageRestaurantCached(context.previousProfile)
      }
    },
  })

  async function handleUpdateProfileStore(data: StoreProfileSchema) {
    try {
      await updateProfileStoreFn({
        name: data.name,
        description: data.description,
      })

      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Falha ao atualizar o perfil, tente novamente!')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da Loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu
          cliente.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfileStore)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input
              className="col-span-3 !rounded-[6px]"
              id="name"
              {...register('name')}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3 !rounded-[6px]"
              id="description"
              rows={10}
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'ghost'} type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant={'success'} disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
