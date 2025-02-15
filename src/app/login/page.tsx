'use client'

import { useState } from 'react'
import Link from 'next/link'
import logo from '@/assets/images/bitwire.svg'
import Image from 'next/image'
import Input from '../components/Form/Input'
import EyeButton from '../components/Form/EyeButton'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const loginFormValidationsSchema = zod.object({
  email: zod.string().email('Digite um endereço de e-mail válido'),
  password: zod
    .string()
    .nonempty('Digite uma senha')
    .min(8, 'A senha deve ter, ao menos, 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
    .regex(/[\W_]/, 'A senha deve conter pelo menos um caractere especial'),
})

type NewLoginFormData = zod.infer<typeof loginFormValidationsSchema>

export default function Login() {
  const loginForm = useForm<NewLoginFormData>({
    resolver: zodResolver(loginFormValidationsSchema),
  })

  const { register, handleSubmit, formState, reset } = loginForm

  const { errors } = formState

  function handleLoginSubmit(data: NewLoginFormData) {
    console.log(data)
    reset()
  }
  const [passwordType, setPasswordType] = useState<'password' | 'text'>(
    'password'
  )

  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-2 h-screen bg-gray-50'>
        <div className='bg-blue-800 flex items-center justify-center'>
          <Image src={logo} alt='BitWire' />
        </div>
        <div className='flex items-center justify-around p-4 flex-col'>
          <main className='flex flex-col gap-4'>
            <span className='text-blue-800 text-4xl'>Acesse a plataforma</span>
            <p className='text-cyan-600 text-sm'>
              Faça login ou registre-se para acessar a dashboard
            </p>
          </main>
          <div className='flex flex-col gap-4 w-full'>
            <form
              onSubmit={handleSubmit(handleLoginSubmit)}
              action=''
              className='flex flex-col gap-2'
            >
              <div className='flex flex-col gap-2'>
                <label className='text-cyan-600' htmlFor='email'>
                  E-mail
                </label>
                <Input
                  type='email'
                  id='email'
                  placeholder='Digite seu e-mail'
                  {...register('email')}
                  errorsField={errors.email}
                />
                {errors.email && (
                  <span className='text-red-500'>{errors.email?.message}</span>
                )}
              </div>
              <div className='flex flex-col gap-2 relative'>
                <label
                  className='text-cyan-600 flex flex-row justify-between'
                  htmlFor='password'
                >
                  Senha
                  <a
                    className='text-blue-800 hover:text-blue-600 hover:underline'
                    href='/forgot-password'
                  >
                    Esqueceu sua senha?
                  </a>
                </label>
                <Input
                  type={passwordType}
                  id='password'
                  placeholder='Digite sua senha'
                  {...register('password')}
                  errorsField={errors.password}
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
              <div className='flex justify-between my-4'>
                <Link
                  href='/signup'
                  className='bg-transparent text-blue-800 px-8 py-4 rounded-xl hover:text-blue-600'
                >
                  Criar conta
                </Link>
                <button className='bg-blue-800 px-8 py-4 rounded-xl hover:bg-blue-600'>
                  Acessar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
