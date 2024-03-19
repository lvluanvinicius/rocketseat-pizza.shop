import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import * as zod from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = zod.object({
  email: zod.string().email(),
})

type SignInFormType = zod.infer<typeof signInForm>

export function SignIn() {
  const { handleSubmit, reset, register, formState } = useForm()

  async function handleSignIn(data: SignInFormType) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        action: {
          label: 'Reenviar',
          onClick: () => {
            toast.success('Link reencaminhado.')
          },
        },
      })

      console.log(data)

      reset()
    } catch {
      toast.error('Erro exemplo.')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant={'ghost'}>
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
