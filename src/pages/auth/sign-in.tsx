import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import * as zod from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = zod.object({
  email: zod.string().email(),
})

type SignInFormType = zod.infer<typeof signInForm>

export function SignIn() {
  const [searchParams] = useSearchParams()
  const { handleSubmit, reset, register, formState } = useForm<SignInFormType>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInFormType) {
    try {
      await authenticate({ email: data.email })

      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        action: {
          label: 'Reenviar',
          onClick: () => {
            toast.success('Link reencaminhado.')
          },
        },
      })
      reset()
    } catch {
      toast.error('Erro exemplo.')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant={'outline'}>
          <Link to={'/sign-up'}>Novo estabelecimento</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl  font-semibold tracking-tight">
              Acessar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu E-mail</Label>
              <Input {...register('email')} id="email" type="email" />
            </div>

            <Button
              type="submit"
              className="w-full disabled:cursor-not-allowed"
              disabled={formState.isSubmitting}
            >
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
