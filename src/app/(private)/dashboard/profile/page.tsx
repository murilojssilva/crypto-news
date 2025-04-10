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
import { Loading } from '@/app/components/Form/Loading'
import { useTheme } from 'next-themes'

export default function Profile() {
  const { data: session } = useSession()
  const currentDate = useFormattedDate()

  const [loading, setLoading] = useState(false)

  const { resolvedTheme } = useTheme()

  const editProfileForm = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileFormValidationsSchema),
  })

  const { register, handleSubmit, formState, setValue } = editProfileForm

  const { errors } = formState

  async function handleEditProfile(data: EditProfileFormData) {
    try {
      setLoading(true)

      const body: Record<string, unknown> = {
        email: data.email,
        lastName: data.lastName,
        firstName: data.firstName,
        updatedAt: new Date(),
        role: data.role,
        plan: data.plan,
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
          setValue('role', data.role)
          setValue('plan', data.plan)
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
  }, [session?.user, setValue])
  return (
    <div
      className={`pb-4 h-screen flex
    ${resolvedTheme === 'light' ? 'bg-gray-50' : 'bg-gray-800'}
    `}
    >
      <title>Editar perfil | CryptoNews</title>
      <Sidebar />
      <div className='flex-1 overflow-auto'>
        <HeaderDashboard
          firstName={session?.user?.firstName as string}
          IconComponent={User}
          currentDate={currentDate}
          title='Perfil'
        />
        <section className='px-6 pt-6 flex flex-col gap-4 overflow-y-auto'>
          <Title title='Perfil' />

          <div className='flex flex-col gap-8 w-full'>
            <form
              onSubmit={handleSubmit(handleEditProfile)}
              className='flex flex-col gap-8'
            >
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <label
                    className={`${
                      resolvedTheme === 'light'
                        ? 'text-blue-800'
                        : 'text-blue-200'
                    }`}
                    htmlFor='firstName'
                  >
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
                  <label
                    className={`${
                      resolvedTheme === 'light'
                        ? 'text-blue-800'
                        : 'text-blue-200'
                    }`}
                    htmlFor='lastName'
                  >
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
                  <label
                    className={`${
                      resolvedTheme === 'light'
                        ? 'text-blue-800'
                        : 'text-blue-200'
                    }`}
                    htmlFor='email'
                  >
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
                <div className='flex flex-col gap-2'>
                  <label
                    className={`${
                      resolvedTheme === 'light'
                        ? 'text-blue-800'
                        : 'text-blue-200'
                    }`}
                    htmlFor='roles'
                  >
                    Cargo
                  </label>
                  <select
                    id='role'
                    contentEditable={false}
                    disabled
                    aria-invalid={!!errors.role}
                    {...register('role')}
                    name='role'
                    className='p-2 rounded-md border border-gray-500 text-md text-gray-900 pr-8 cursor-not-allowed bg-gray-300'
                  >
                    <option value=''>Selecione uma opção</option>
                    <option value='admin'>Administrador</option>
                    <option value='editor'>Editor</option>
                    <option value='costumer'>Cliente</option>
                  </select>
                  {errors.role && (
                    <span className='text-red-500'>{errors.role?.message}</span>
                  )}
                </div>
                <div className='flex flex-col gap-2'>
                  <label
                    className={`${
                      resolvedTheme === 'light'
                        ? 'text-blue-800'
                        : 'text-blue-200'
                    }`}
                    htmlFor='roles'
                  >
                    Plano
                  </label>
                  <select
                    id='plan'
                    contentEditable={false}
                    disabled
                    aria-invalid={!!errors.plan}
                    {...register('plan')}
                    name='plan'
                    className='p-2 rounded-md border border-gray-500 text-md text-gray-900 pr-8 cursor-not-allowed bg-gray-300'
                  >
                    <option value=''>Selecione uma opção</option>
                    <option value='free'>Gratuito</option>
                    <option value='premium'>Premium</option>
                  </select>
                  {errors.role && (
                    <span className='text-red-500'>{errors.role?.message}</span>
                  )}
                </div>
                <div className='flex flex-col gap-2 relative'>
                  <label
                    className={`
                      ${
                        resolvedTheme === 'light'
                          ? 'text-blue-800'
                          : 'text-blue-200'
                      }
                      flex flex-row justify-between`}
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
                    className={`
                      ${
                        resolvedTheme === 'light'
                          ? 'text-blue-800'
                          : 'text-blue-200'
                      }
                      flex flex-row justify-between`}
                    htmlFor='passwordConfirm'
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
                IconComponent={loading ? Loading : Save}
                text={loading ? '' : 'Editar perfil'}
                type='submit'
              />
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
