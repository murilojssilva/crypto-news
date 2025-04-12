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
import { useFormatAmount } from '@/hooks/useFormatAmount'
import { useWhatsAppFormat } from '@/hooks/useWhatsAppFormat'

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
        amount: data.amount,
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
          setValue('amount', data.amount)
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
                <label
                  className={`${
                    resolvedTheme === 'light'
                      ? 'text-blue-800'
                      : 'text-blue-200'
                  }`}
                  htmlFor='birth'
                >
                  Localização
                </label>
                <div className='grid grid-cols-2 gap-3 items-center'>
                  <div className='flex flex-col gap-2'>
                    <select
                      id='state'
                      contentEditable={false}
                      aria-invalid={!!errors.state}
                      {...register('state')}
                      name='state'
                      className='p-2 rounded-md border border-gray-500 text-md text-gray-900 pr-8 bg-gray-300'
                    >
                      <option value=''>Estado</option>
                      <option value='Acre'>Acre</option>
                      <option value='Rio de Janeiro'>Rio de Janeiro</option>
                      <option value='São Paulo'>São Paulo</option>
                    </select>
                    {errors.state && (
                      <span className='text-red-500'>
                        {errors.state?.message}
                      </span>
                    )}
                  </div>
                  <div className='flex flex-col gap-2'>
                    <select
                      id='city'
                      contentEditable={false}
                      aria-invalid={!!errors.city}
                      {...register('city')}
                      name='city'
                      className='p-2 rounded-md border border-gray-500 text-md text-gray-900 pr-8 bg-gray-300'
                    >
                      <option value=''>Cidade</option>
                      <option value='Petrópolis'>Petrópolis</option>
                      <option value='Rio de Janeoro'>Rio de Janeiro</option>
                      <option value='São Gonçalo'>São Gonçalo</option>
                    </select>
                    {errors.city && (
                      <span className='text-red-500'>
                        {errors.city?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <label
                    className={`${
                      resolvedTheme === 'light'
                        ? 'text-blue-800'
                        : 'text-blue-200'
                    }`}
                    htmlFor='genders'
                  >
                    Gênero
                  </label>
                  <select
                    id='gender'
                    contentEditable={false}
                    disabled
                    aria-invalid={!!errors.gender}
                    {...register('gender')}
                    name='gender'
                    className='p-2 rounded-md border border-gray-500 text-md text-gray-900 pr-8 cursor-not-allowed bg-gray-300'
                  >
                    <option value=''>Selecione uma opção</option>
                    <option value='admin'>Masculino</option>
                    <option value='editor'>Feminino</option>
                    <option value='costumer'>Outro</option>
                  </select>
                  {errors.gender && (
                    <span className='text-red-500'>
                      {errors.gender?.message}
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
                    htmlFor='amount'
                  >
                    Renda
                  </label>
                  <Input
                    {...register('amount')}
                    errorsField={errors.amount?.message ?? ''}
                    type='number'
                    id='amount'
                    name='amount'
                    placeholder='R$ 1.000,00'
                    value={useFormatAmount(amount)}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '')
                      setValue('amount', raw) // atualiza o valor bruto no form
                    }}
                    disabled={loading}
                    readOnly={loading}
                  />
                  {errors.amount && (
                    <span className='text-red-500'>
                      {errors.amount?.message}
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
                    htmlFor='experience_age'
                  >
                    Anos de experiência
                  </label>
                  <Input
                    {...register('experience_age')}
                    errorsField={errors.experience_age?.message ?? ''}
                    type='text'
                    id='experience_age'
                    name='experience_age'
                    placeholder='1'
                    disabled={loading}
                    readOnly={loading}
                  />
                  {errors.experience_age && (
                    <span className='text-red-500'>
                      {errors.experience_age?.message}
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
                <label
                  className={`${
                    resolvedTheme === 'light'
                      ? 'text-blue-800'
                      : 'text-blue-200'
                  }`}
                  htmlFor='birth'
                >
                  Redes sociais
                </label>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 items-center'>
                  <div className='flex flex-col gap-2'>
                    <label
                      className={`${
                        resolvedTheme === 'light'
                          ? 'text-blue-800'
                          : 'text-blue-200'
                      }`}
                      htmlFor='social_x'
                    >
                      X
                    </label>
                    <Input
                      type='social_x'
                      errorsField={errors.social_x?.message ?? ''}
                      {...register('social_x')}
                      name='social_x'
                      id='social_x'
                      placeholder='murilojssilva'
                    />
                    {errors.social_x && (
                      <span className='text-red-500'>
                        {errors.social_x?.message}
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
                      htmlFor='social_discord'
                    >
                      Discord
                    </label>
                    <Input
                      type='social_discord'
                      errorsField={errors.social_discord?.message ?? ''}
                      {...register('social_discord')}
                      name='social_discord'
                      id='social_discord'
                      placeholder='murilojssilva#9337'
                    />
                    {errors.social_telegram && (
                      <span className='text-red-500'>
                        {errors.social_telegram?.message}
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
                      htmlFor='social_telegram'
                    >
                      Telegram
                    </label>
                    <Input
                      type='social_telegram'
                      errorsField={errors.social_telegram?.message ?? ''}
                      {...register('social_telegram')}
                      name='social_telegram'
                      id='social_telegram'
                      placeholder='murilojssilva'
                    />
                    {errors.social_telegram && (
                      <span className='text-red-500'>
                        {errors.social_telegram?.message}
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
                      htmlFor='social_whatsapp'
                    >
                      WhatsApp
                    </label>
                    <Input
                      type='social_whatsapp'
                      errorsField={errors.social_whatsapp?.message ?? ''}
                      {...register('social_whatsapp')}
                      name='social_whatsapp'
                      id='social_whatsapp'
                      placeholder='(21) 99999-9999'
                      value={useWhatsAppFormat('99999999999')}
                    />
                    {errors.social_whatsapp && (
                      <span className='text-red-500'>
                        {errors.social_whatsapp?.message}
                      </span>
                    )}
                  </div>
                </div>

                <label
                  className={`${
                    resolvedTheme === 'light'
                      ? 'text-blue-800'
                      : 'text-blue-200'
                  }`}
                  htmlFor='birth'
                >
                  Data de nascimento
                </label>
                <div className='grid grid-cols-3 gap-3 items-center'>
                  <div className='flex flex-col gap-2'>
                    <Input
                      type='day_birth'
                      errorsField={errors.day_birth?.message ?? ''}
                      {...register('day_birth')}
                      name='day_birth'
                      id='day_birth'
                      placeholder='31'
                    />
                    {errors.day_birth && (
                      <span className='text-red-500'>
                        {errors.day_birth?.message}
                      </span>
                    )}
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Input
                      type='month_birth'
                      errorsField={errors.month_birth?.message ?? ''}
                      {...register('month_birth')}
                      name='month_birth'
                      id='month_birth'
                      placeholder='12'
                    />
                    {errors.month_birth && (
                      <span className='text-red-500'>
                        {errors.month_birth?.message}
                      </span>
                    )}
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Input
                      type='year_birth'
                      errorsField={errors.year_birth?.message ?? ''}
                      {...register('year_birth')}
                      name='year_birth'
                      id='year_birth'
                      placeholder='2025'
                    />
                    {errors.year_birth && (
                      <span className='text-red-500'>
                        {errors.year_birth?.message}
                      </span>
                    )}
                  </div>
                </div>

                {session?.user.role === 'admin' && (
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
                      <span className='text-red-500'>
                        {errors.role?.message}
                      </span>
                    )}
                  </div>
                )}
                <div className='flex flex-col gap-2'>
                  <label
                    className={`${
                      resolvedTheme === 'light'
                        ? 'text-blue-800'
                        : 'text-blue-200'
                    }`}
                    htmlFor='roles'
                  >
                    Estilo do investidor
                  </label>
                  <select
                    id='investor_style'
                    contentEditable={false}
                    disabled
                    aria-invalid={!!errors.investor_style}
                    {...register('investor_style')}
                    name='investor_style'
                    className='p-2 rounded-md border border-gray-500 text-md text-gray-900 pr-8 cursor-not-allowed bg-gray-300'
                  >
                    <option value=''>Selecione uma opção</option>
                    <option value='admin'>Conservador</option>
                    <option value='editor'>Arrojado</option>
                    <option value='costumer'>Personalizado</option>
                  </select>
                  {errors.investor_style && (
                    <span className='text-red-500'>
                      {errors.investor_style?.message}
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
