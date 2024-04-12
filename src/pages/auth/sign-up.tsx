import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as zod from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpForm = zod.object({
  email: zod.string().email(),
  managerName: zod.string(),
  restaurantName: zod.string(),
  phone: zod.string(),
})

type signUpFormType = zod.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()
  const { handleSubmit, reset, register, formState } = useForm()

  async function handlesignUp(data: signUpFormType) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in'),
        },
      })

      console.log(data)

      reset()
    } catch {
      toast.error('Erro ao cadastrar restaurante.')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant={'outline'}>
          <Link to={'/sign-in'}>Fazer Login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl  font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handlesignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do Estabelecimento</Label>
              <Input
                {...register('restaurantName')}
                id="restaurantName"
                type="text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu Nome</Label>
              <Input
                {...register('managerName')}
                id="managerName"
                type="text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu E-mail</Label>
              <Input {...register('email')} id="email" type="email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu Celular</Label>
              <Input {...register('phone')} id="phone" type="tel" />
            </div>

            <Button
              type="submit"
              className="w-full disabled:cursor-not-allowed"
              disabled={formState.isSubmitting}
            >
              Finalize Cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a href="" className="underline underline-offset-4">
                termos de serviço
              </a>{' '}
              e{' '}
              <a href="" className="underline underline-offset-4">
                política de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
