'use client'

import Link from 'next/link'
import logo from '@/assets/images/bitwire.svg'
import Image from 'next/image'
import Input from '../components/Form/Input'
import { useState } from 'react'
import EyeButton from '../components/Form/EyeButton'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const loginFormValidationsSchema = zod.object({
  name: zod.string(),
  email: zod.string().email('Digite um endereço de e-mail válido'),
  password: zod
    .string()
    .nonempty('Digite uma senha')
    .min(8, 'A senha deve ter, ao menos, 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
    .regex(/[\W_]/, 'A senha deve conter pelo menos um caractere especial'),
  passwordConfirmType: zod
    .string()
    .nonempty('Digite uma senha')
    .min(8, 'A senha deve ter, ao menos, 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
    .regex(/[\W_]/, 'A senha deve conter pelo menos um caractere especial'),
})

type NewSignUpFormData = zod.infer<typeof loginFormValidationsSchema>

export default function SignUp() {
  const loginForm = useForm<NewSignUpFormData>({
    resolver: zodResolver(loginFormValidationsSchema),
  })

  const { register, handleSubmit, formState, reset } = loginForm

  const { errors } = formState

  function handleLoginSubmit(data: NewSignUpFormData) {
    console.log(data)
    reset()
  }

  const [passwordType, setPasswordType] = useState<'password' | 'text'>(
    'password'
  )
  const [passwordConfirmType, setPasswordConfirmType] = useState<
    'password' | 'text'
  >('password')
  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-2 h-screen bg-gray-50'>
        <div className='bg-blue-800 flex items-center justify-center'>
          <Image src={logo} alt='BitWire' />
        </div>
        <div className='flex items-center justify-around p-4 flex-col'>
          <main className='flex flex-col gap-4'>
            <span className='text-blue-800 text-4xl'>Bem vindo à BitWire</span>
            <p className='text-cyan-600 text-sm'>
              Crie seu cadastro para acessar a dashboard.
            </p>
          </main>
          <div className='flex flex-col gap-4 w-full'>
            <form
              onSubmit={handleSubmit(handleLoginSubmit)}
              className='flex flex-col gap-2'
            >
              <div className='flex flex-col gap-2'>
                <label className='text-cyan-600' htmlFor='name'>
                  Nome
                </label>
                <Input
                  {...register('name')}
                  errorsField={errors.name?.message ?? ''}
                  type='text'
                  id='name'
                  placeholder='Digite seu e-mail'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='text-cyan-600' htmlFor='email'>
                  E-mail
                </label>
                <Input
                  type='email'
                  errorsField={errors.email?.message ?? ''}
                  {...register('email')}
                  id='email'
                  placeholder='Digite seu e-mail'
                />
              </div>
              <div className='flex flex-col gap-2 relative'>
                <label
                  className='text-cyan-600 flex flex-row justify-between'
                  htmlFor='password'
                >
                  Senha
                </label>
                <Input
                  type={passwordType}
                  errorsField={errors.password?.message ?? ''}
                  {...register('password')}
                  id='password'
                  placeholder='Digite sua senha'
                />
                <EyeButton
                  passwordType={passwordType}
                  setPasswordType={setPasswordType}
                />
              </div>
              <div className='flex flex-col gap-2 relative'>
                <label
                  className='text-cyan-600 flex flex-row justify-between'
                  htmlFor='password'
                >
                  Confirme sua senha
                </label>
                <Input
                  type={passwordConfirmType}
                  {...register('passwordConfirmType')}
                  errorsField={errors.passwordConfirmType?.message ?? ''}
                  id='password-confirm'
                  placeholder='Digite sua senha'
                />
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
                <button className='bg-blue-800 px-8 py-4 rounded-xl hover:bg-blue-600'>
                  Criar conta
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
