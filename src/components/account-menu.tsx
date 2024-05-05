import { useMutation, useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { getManageRestaurant } from '@/api/get-managed-restaurant'
import { getProfile } from '@/api/get-profile'
import { signOut } from '@/api/sign-out'

import { StoreProfileDialog } from './store-profile-dialog'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export default function AccountMenu() {
  const navigate = useNavigate()

  const { data: profileMe, isLoading: profileMeIsLoading } = useQuery({
    queryKey: ['profile.me'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  const {
    data: profileManagedRestaurant,
    isLoading: managedRestaurantIsLoading,
  } = useQuery({
    queryKey: ['profile.managed-restaurant'],
    queryFn: getManageRestaurant,
    staleTime: Infinity,
  })

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess() {
      navigate('/sign-in', { replace: true })
    },
  })

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'outline'}
            className="flex select-none items-center gap-2 !rounded-[6px]"
          >
            {managedRestaurantIsLoading ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              profileManagedRestaurant?.name
            )}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 !rounded-[4px]">
          <DropdownMenuLabel className="flex flex-col">
            {profileMeIsLoading ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                <span>{profileMe?.name}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {profileMe?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuLabel className="flex cursor-pointer items-center gap-1">
              <Building className="mr-2 h-4 w-4" />
              <span>Perfil da Loja</span>
            </DropdownMenuLabel>
          </DialogTrigger>
          <DropdownMenuLabel
            asChild
            className="flex items-center gap-1 text-rose-500 dark:text-rose-400"
          >
            <button
              onClick={() => signOutFn()}
              disabled={isSigningOut}
              className="w-full"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  )
}
