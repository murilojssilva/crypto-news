'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import logo from '@/assets/images/bitwire.svg'
import Input from '../components/Form/Input'
import EyeButton from '../components/Form/EyeButton'

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewLoginFormData>({
    resolver: zodResolver(loginFormValidationsSchema),
  })

  function handleLoginSubmit(data: NewLoginFormData) {
    console.log(data)
    reset()
  }

  const [passwordType, setPasswordType] = useState<'password' | 'text'>(
    'password'
  )

  return (
    <div className='flex flex-col h-screen'>
      <div className='grid grid-rows-[10vh_90vh] h-screen bg-gray-50 sm:grid-rows-[10vh_90vh] md:grid-cols-2 md:grid-rows-1 md:h-screen'>
        <div className='bg-blue-800 flex items-center justify-center'>
          <Image src={logo} alt='BitWire' className='w-20 h-20' />
        </div>

        <div className='flex flex-col items-center justify-center p-4 gap-16'>
          <main className='flex flex-col gap-4 text-center items-center md:text-left'>
            <span className='text-blue-800 text-4xl font-bold'>
              Acesse a plataforma
            </span>
            <p className='text-cyan-600 text-sm'>
              Faça login ou registre-se para acessar a dashboard
            </p>
          </main>

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
              />
              {errors.password && (
                <span className='text-red-500'>{errors.password?.message}</span>
              )}

              <EyeButton
                passwordType={passwordType}
                setPasswordType={setPasswordType}
              />
            </div>

            {/* Botões */}
            <div className='flex justify-between my-4'>
              <Link
                href='/signup'
                className='bg-transparent text-blue-800 px-8 py-4 rounded-xl hover:text-blue-600'
              >
                Criar conta
              </Link>
              <button className='bg-blue-800 font-bold text-md text-white px-8 py-4 rounded-xl hover:bg-blue-600'>
                Acessar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
