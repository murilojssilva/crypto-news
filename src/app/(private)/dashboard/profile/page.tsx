'use client'

import { Save, User } from 'lucide-react'
import Sidebar from '@/app/components/Sidebar'
import HeaderDashboard from '@/app/components/Dashboard/Header'
import { useSession } from 'next-auth/react'
import { useFormattedDate } from '@/hooks/useFormatted'
import { Button } from '@/app/components/Dashboard/Button'
import EyeButton from '@/app/components/Form/EyeButton'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import Input from '@/app/components/Form/Input'
import { getUserById } from '@/lib/users/[id]'
import {
  EditProfileFormData,
  editProfileFormValidationsSchema,
} from '@/app/schemas/EditProfileSchema'
import { Title } from '@/app/components/Dashboard/Title'

export default function Profile() {
  const { data: session } = useSession()
  const currentDate = useFormattedDate()

  const [loading, setLoading] = useState(false)

  const loginForm = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileFormValidationsSchema),
  })

  const { register, handleSubmit, formState, setValue } = loginForm

  const { errors } = formState

  async function handleEditProfile(data: EditProfileFormData) {
    try {
      setLoading(true)

      const body: Record<string, unknown> = {
        email: data.email,
        lastName: data.lastName,
        firstName: data.firstName,
        updatedAt: new Date(),
      }

      if (data.password) {
        body.password = data.password
      }

      await fetch(`/api/users/${session?.user.id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      toast.success('Perfil editado com sucesso!')
    } catch (error: unknown) {
      setLoading(false)
      console.error('Error during editing:', error)

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

  useEffect(() => {
    if (session?.user) {
      const fetchPost = async () => {
        try {
          setLoading(true)
          const data = await getUserById(session.user.id as string)

          setValue('firstName', data.firstName)
          setValue('lastName', data.lastName)
          setValue('email', data.email)
        } catch (error) {
          console.log(error)
          toast.error(
            'Erro ao recuperar postagens. Tente novamente mais tarde.'
          )
        } finally {
          setLoading(false)
        }
      }
      fetchPost()
    }
  }, [session?.user.id, setValue])
  return (
    <div className='bg-gray-50 pb-4 h-screen flex'>
      <Sidebar />
      <div className='flex-1'>
        <HeaderDashboard
          name={session?.user?.name as string}
          IconComponent={User}
          currentDate={currentDate}
          title='Perfil'
        />
        <section className='p-6 min-h-screen flex flex-col gap-4'>
          <Title title='Perfil' />

          <div className='flex flex-col gap-8 w-full'>
            <form
              onSubmit={handleSubmit(handleEditProfile)}
              className='flex flex-col gap-8'
            >
              <div className='flex flex-col gap-4'>
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
                    disabled={loading}
                    readOnly={loading}
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
                    disabled={loading}
                    readOnly={loading}
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
                    disabled
                    readOnly
                    errorsField={errors.email?.message ?? ''}
                    {...register('email')}
                    name='email'
                    id='email'
                    placeholder='Digite seu e-mail'
                  />
                  {errors.email && (
                    <span className='text-red-500'>
                      {errors.email?.message}
                    </span>
                  )}
                </div>
                <div className='flex flex-col gap-2 relative'>
                  <label
                    className='text-blue-800 flex flex-row justify-between'
                    htmlFor='password'
                  >
                    Nova senha
                  </label>
                  <Input
                    type={passwordType}
                    errorsField={errors.password?.message ?? ''}
                    {...register('password')}
                    name='password'
                    id='password'
                    placeholder='Digite sua senha'
                    disabled={loading}
                    readOnly={loading}
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
                    Confirme a nova senha
                  </label>
                  <Input
                    type={passwordConfirmType}
                    {...register('passwordConfirm')}
                    errorsField={errors.passwordConfirm?.message ?? ''}
                    id='passwordConfirm'
                    name='passwordConfirm'
                    placeholder='Digite sua senha'
                    disabled={loading}
                    readOnly={loading}
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
              </div>

              <Button
                IconComponent={Save}
                text={loading ? 'Carregando...' : 'Editar perfil'}
                type='submit'
              />
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
