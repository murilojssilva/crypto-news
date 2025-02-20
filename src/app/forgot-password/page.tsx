'use client'

import logo from '@/assets/images/bitwire.svg'
import Image from 'next/image'
import Input from '../components/Form/Input'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const loginFormValidationsSchema = zod.object({
  email: zod.string().email('Digite um endereço de e-mail válido'),
})

type NewSignUpFormData = zod.infer<typeof loginFormValidationsSchema>

export default function ForgotPassword() {
  const loginForm = useForm<NewSignUpFormData>({
    resolver: zodResolver(loginFormValidationsSchema),
  })

  const { register, handleSubmit, formState, reset } = loginForm

  const { errors } = formState

  function handleLoginSubmit(data: NewSignUpFormData) {
    console.log(data)
    reset()
  }

  return (
    <div className='flex flex-col h-screen'>
      <div className='grid grid-rows-[10vh_90vh] h-screen bg-gray-50 sm:grid-rows-[10vh_90vh] md:grid-cols-2 md:grid-rows-1 md:h-screen'>
        <div className='bg-blue-800 flex items-center justify-center'>
          <Image
            src={logo}
            alt='BitWire'
            className='w-12 h-12 md:h-80 md:w-80'
          />
        </div>

        <div className='flex flex-col items-center justify-center p-4 gap-16'>
          <main className='flex flex-col gap-4 text-center items-center md:text-left'>
            <span className='text-blue-800 text-4xl font-bold'>
              Esqueceu sua senha?
            </span>
            <p className='text-cyan-600 text-sm'>
              Digite seu endereço de e-mail para receber um link de confirmação
            </p>
          </main>
          <div className='flex flex-col gap-4 w-full'>
            <form
              onSubmit={handleSubmit(handleLoginSubmit)}
              className='flex flex-col gap-2'
            >
              <div className='flex flex-col gap-2'>
                <label className='text-blue-800' htmlFor='email'>
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

              <button className='bg-blue-800 font-bold text-md px-8 py-4 rounded-xl hover:bg-blue-600'>
                Enviar e-mail
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
