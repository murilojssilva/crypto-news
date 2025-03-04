'use client'
import Link from 'next/link'

import { signIn, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Input from '@/app/components/Form/Input'
import EyeButton from '@/app/components/Form/EyeButton'

const loginFormSchema = zod.object({
  email: zod.string().email('Digite um e-mail válido'),
  password: zod
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve ter pelo menos uma letra maiúscula')
    .regex(/[0-9]/, 'A senha deve ter pelo menos um número')
    .regex(/[\W_]/, 'A senha deve ter pelo menos um caractere especial'),
})

type LoginFormData = zod.infer<typeof loginFormSchema>

export default function LoginPage() {
  const router = useRouter()

  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const [passwordType, setPasswordType] = useState<'password' | 'text'>(
    'password'
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  useEffect(() => {
    console.log('Sessão no cliente:', session, 'Status:', status)
  }, [session, status])

  async function handleLoginSubmit(data: LoginFormData) {
    try {
      setLoading(true)

      const response = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (response?.error) {
        toast.error('E-mail ou senha inválidos')
        setLoading(false)
        return
      }

      if (response?.url) {
        router.push('/dashboard')
      } else {
        toast.error('Falha ao realizar o login. Tente novamente mais tarde.')
      }
    } catch (error) {
      console.error('Erro no login:', error)
      toast.error('Erro ao realizar o login. Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='flex flex-col items-center justify-center p-4 gap-16'>
      <section className='flex flex-col gap-4 text-center items-center md:text-left'>
        <span className='text-blue-800 text-4xl font-bold'>
          Acesse a plataforma
        </span>
        <p className='text-cyan-600 text-sm'>
          Faça login ou registre-se para acessar a dashboard
        </p>
      </section>

      <form
        onSubmit={handleSubmit(handleLoginSubmit)}
        className='flex flex-col gap-4 w-full max-w-sm'
      >
        <div className='flex flex-col gap-2'>
          <label className='text-blue-800' htmlFor='email'>
            E-mail
          </label>
          <Input
            type='email'
            id='email'
            placeholder='Digite seu e-mail'
            {...register('email')}
            errorsField={errors.email?.message ?? ''}
            name='email'
          />
          {errors.email && (
            <span className='text-red-500'>{errors.email?.message}</span>
          )}
        </div>

        <div className='flex flex-col gap-2 relative'>
          <label
            className='text-blue-800 flex justify-between'
            htmlFor='password'
          >
            Senha
            <Link
              href='/forgot-password'
              className='text-blue-800 hover:text-blue-600 hover:underline'
            >
              Esqueceu sua senha?
            </Link>
          </label>
          <Input
            type={passwordType}
            id='password'
            placeholder='Digite sua senha'
            {...register('password')}
            errorsField={errors.password?.message ?? ''}
            name='password'
          />
          {errors.password && (
            <span className='text-red-500'>{errors.password?.message}</span>
          )}

          <EyeButton
            passwordType={passwordType}
            setPasswordType={setPasswordType}
          />
        </div>

        <div className='flex justify-between my-4'>
          <Link
            href='/signup'
            className='bg-transparent text-blue-800 px-8 py-4 rounded-xl hover:text-blue-600'
          >
            Criar conta
          </Link>
          <button
            type='submit'
            className='bg-blue-800 font-bold text-md text-white px-8 py-4 rounded-xl hover:bg-blue-600'
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </main>
  )
}
