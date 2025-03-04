'use client'

import Input from '@/app/components/Form/Input'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const loginFormValidationsSchema = zod.object({
  email: zod.string().email('Digite um endereço de e-mail válido'),
})

type NewSignUpFormData = zod.infer<typeof loginFormValidationsSchema>

export default function ForgotPassword() {
  const loginForm = useForm<NewSignUpFormData>({
    resolver: zodResolver(loginFormValidationsSchema),
  })

  const { register, handleSubmit, formState, reset } = loginForm
  const router = useRouter()
  const { errors } = formState

  function handleForgotPasswordSubmit(data: NewSignUpFormData) {
    try {
      console.log(data)
      reset()
      toast.success(
        'Verifique sua caixa de e-mail com o link para redefinição.'
      )
      router.push('/login')
    } catch (error) {
      console.log(error)
      toast.error('E-mail não cadastrado no sistema')
    }
  }

  return (
    <main className='flex flex-col items-center justify-center p-4 gap-16'>
      <section className='flex flex-col gap-4 text-center items-center md:text-left'>
        <span className='text-blue-800 text-4xl font-bold'>
          Esqueceu sua senha?
        </span>
        <p className='text-cyan-600 text-sm'>
          Digite seu endereço de e-mail para receber um link de confirmação
        </p>
      </section>
      <section className='flex flex-col gap-4 w-full'>
        <form
          onSubmit={handleSubmit(handleForgotPasswordSubmit)}
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
      </section>
    </main>
  )
}
