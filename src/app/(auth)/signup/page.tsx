'use client'

import Link from 'next/link'
import logo from '@/assets/images/bitwire.svg'
import Image from 'next/image'
import Input from '../../components/Form/Input'
import { useState } from 'react'
import EyeButton from '../../components/Form/EyeButton'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'

const loginFormValidationsSchema = zod
  .object({
    firstName: zod.string().nonempty('Digite seu nome'),
    lastName: zod.string().nonempty('Digite seu sobrenome'),
    email: zod.string().email('Digite um endereço de e-mail válido'),
    password: zod
      .string()
      .min(8, 'A senha deve ter, ao menos, 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
      .regex(/[\W_]/, 'A senha deve conter pelo menos um caractere especial'),
    passwordConfirm: zod.string().nonempty('Confirme sua senha'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm'],
  })

type NewSignUpFormData = zod.infer<typeof loginFormValidationsSchema>

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
      await api.post('/users', {
        email: data.email,
        password: data.password,
        lastName: data.lastName,
        firstName: data.firstName,
        updatedAt: new Date(),
      })

      toast.success('Usuário registrado com sucesso')
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
    <div className='flex flex-col h-screen'>
      <div className='grid grid-rows-[10vh_90vh] h-screen bg-gray-50 sm:grid-rows-[10vh_90vh] md:grid-cols-2 md:grid-rows-1 md:h-screen'>
        <div className='bg-blue-800 flex items-center justify-center'>
          <Image
            src={logo}
            alt='CryptoNews'
            className='w-12 h-12 md:h-80 md:w-80'
          />
        </div>

        <div className='flex flex-col items-center justify-center p-4 gap-16'>
          <main className='flex flex-col gap-4 text-center items-center md:text-left'>
            <span className='text-blue-800 text-4xl font-bold'>
              Bem vindo à CryptoNews
            </span>
            <p className='text-cyan-600 text-sm'>
              Crie seu cadastro para acessar a dashboard
            </p>
          </main>

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
                  <span className='text-red-500'>
                    {errors.firstName?.message}
                  </span>
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
                  <span className='text-red-500'>
                    {errors.lastName?.message}
                  </span>
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
                  <span className='text-red-500'>
                    {errors.password?.message}
                  </span>
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
                <button
                  type='submit'
                  className='bg-blue-800 font-bold text-md px-8 py-4 rounded-xl hover:bg-blue-600'
                >
                  {loading ? 'Carregando...' : 'Criar conta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}
