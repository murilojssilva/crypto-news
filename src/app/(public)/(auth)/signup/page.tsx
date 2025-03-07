'use client'

import Link from 'next/link'
import Input from '@/app/components/Form/Input'
import { useState } from 'react'
import EyeButton from '@/app/components/Form/EyeButton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import { Button } from '@/app/components/Dashboard/Button'
import { SignIn } from '@phosphor-icons/react'
import {
  loginFormValidationsSchema,
  NewSignUpFormData,
} from '@/app/schemas/SignUpSchema'
import { Loading } from '@/app/components/Form/Loading'

export default function SignUp() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const loginForm = useForm<NewSignUpFormData>({
    resolver: zodResolver(loginFormValidationsSchema),
  })

  const { register, handleSubmit, formState, reset } = loginForm

  const { errors } = formState

  async function handleSignUpSubmit(data: NewSignUpFormData) {
    try {
      setLoading(true)
      await api.post(
        '/users',
        {
          email: data.email,
          password: data.password,
          lastName: data.lastName,
          firstName: data.firstName,
          updatedAt: new Date(),
          role: 'costumer',
        },
        { withCredentials: true }
      )

      toast.success('Usuário registrado com sucesso')
      await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })
      reset()

      router.push('/dashboard')
    } catch (error: unknown) {
      setLoading(false)
      console.error('Error during registration:', error)

      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Erro ao registrar usuário. Tente novamente mais tarde.')
      }
    } finally {
      setLoading(false)
    }
  }

  const [passwordType, setPasswordType] = useState<'password' | 'text'>(
    'password'
  )
  const [passwordConfirmType, setPasswordConfirmType] = useState<
    'password' | 'text'
  >('password')
  return (
    <main className='flex flex-col items-center justify-center p-4 gap-16'>
      <section className='flex flex-col gap-4 text-center items-center md:text-left'>
        <span className='text-blue-800 text-4xl font-bold'>
          Bem vindo à CryptoNews
        </span>
        <p className='text-cyan-600 text-sm'>
          Crie seu cadastro para acessar a dashboard
        </p>
      </section>

      <div className='flex flex-col gap-4 w-full'>
        <form
          onSubmit={handleSubmit(handleSignUpSubmit)}
          className='flex flex-col gap-2'
        >
          <div className='flex flex-col gap-2'>
            <label className='text-blue-800' htmlFor='firstName'>
              Nome
            </label>
            <Input
              {...register('firstName')}
              errorsField={errors.firstName?.message ?? ''}
              type='text'
              id='firstName'
              placeholder='Digite seu nome'
              name='firstName'
            />
            {errors.firstName && (
              <span className='text-red-500'>{errors.firstName?.message}</span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-blue-800' htmlFor='lastName'>
              Sobrenome
            </label>
            <Input
              {...register('lastName')}
              errorsField={errors.lastName?.message ?? ''}
              type='text'
              id='lastName'
              name='lastName'
              placeholder='Digite seu sobrenome'
            />
            {errors.lastName && (
              <span className='text-red-500'>{errors.lastName?.message}</span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-blue-800' htmlFor='email'>
              E-mail
            </label>
            <Input
              type='email'
              errorsField={errors.email?.message ?? ''}
              {...register('email')}
              name='email'
              id='email'
              placeholder='Digite seu e-mail'
            />
            {errors.email && (
              <span className='text-red-500'>{errors.email?.message}</span>
            )}
          </div>
          <div className='flex flex-col gap-2 relative'>
            <label
              className='text-blue-800 flex flex-row justify-between'
              htmlFor='password'
            >
              Senha
            </label>
            <Input
              type={passwordType}
              errorsField={errors.password?.message ?? ''}
              {...register('password')}
              name='password'
              id='password'
              placeholder='Digite sua senha'
            />
            {errors.password && (
              <span className='text-red-500'>{errors.password?.message}</span>
            )}
            <EyeButton
              passwordType={passwordType}
              setPasswordType={setPasswordType}
            />
          </div>
          <div className='flex flex-col gap-2 relative'>
            <label
              className='text-blue-800 flex flex-row justify-between'
              htmlFor='password'
            >
              Confirme sua senha
            </label>
            <Input
              type={passwordConfirmType}
              {...register('passwordConfirm')}
              errorsField={errors.passwordConfirm?.message ?? ''}
              id='passwordConfirm'
              name='passwordConfirm'
              placeholder='Digite sua senha'
            />
            {errors.passwordConfirm && (
              <span className='text-red-500'>
                {errors.passwordConfirm?.message}
              </span>
            )}

            <EyeButton
              passwordType={passwordConfirmType}
              setPasswordType={setPasswordConfirmType}
            />
          </div>
          <div className='flex justify-between my-4'>
            <Link
              href='/login'
              className='bg-transparent text-blue-800 px-8 py-4 rounded-xl hover:text-blue-600'
            >
              Login
            </Link>
            <Button
              IconComponent={loading ? Loading : SignIn}
              text={loading ? '' : 'Criar conta'}
              type='submit'
            />
          </div>
        </form>
      </div>
    </main>
  )
}
