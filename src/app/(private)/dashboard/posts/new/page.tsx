'use client'

import { usePosts } from '@/context/PostContext'
import Input from '@/app/components/Form/Input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Textarea from '@/app/components/Form/Textarea'
import {
  NewPostFormData,
  newPostFormValidationsSchema,
} from '@/app/schemas/NewPostSchema'
import { Pen, Plus } from 'lucide-react'
import Sidebar from '@/app/components/Sidebar'
import HeaderDashboard from '@/app/components/Dashboard/Header'
import { useSession } from 'next-auth/react'
import { useFormattedDate } from '@/hooks/useFormatted'
import { Button } from '@/app/components/Dashboard/Button'
import { Title } from '@/app/components/Dashboard/Title'
import { Loading } from '@/app/components/Form/Loading'

export default function NewPost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPostFormData>({
    resolver: zodResolver(newPostFormValidationsSchema),
    defaultValues: {
      published: false,
    },
  })
  const { loading, handleNewPostSubmit } = usePosts()
  const { data: session } = useSession()
  const currentDate = useFormattedDate()

  return (
    <div className='bg-gray-50 pb-4 h-screen flex'>
      <Sidebar />

      <div className='flex-1 overflow-auto'>
        <HeaderDashboard
          firstName={session?.user?.firstName as string}
          IconComponent={Pen}
          currentDate={currentDate}
          title='Novo Post'
        />

        <section className='p-6 grid gap-4'>
          <Title title='Novo post' />
          <form
            onSubmit={handleSubmit(handleNewPostSubmit)}
            className='flex flex-col gap-8'
          >
            <Input
              {...register('title')}
              errorsField={errors.title?.message ?? ''}
              type='text'
              disabled={loading}
              readOnly={loading}
              placeholder='Título'
              className='border p-2 rounded'
            />
            {errors.title && (
              <span className='text-red-500'>{errors.title?.message}</span>
            )}
            <Input
              {...register('subtitle')}
              errorsField={errors.subtitle?.message ?? ''}
              type='text'
              disabled={loading}
              readOnly={loading}
              placeholder='Subtítulo'
              className='border p-2 rounded'
            />
            {errors.subtitle && (
              <span className='text-red-500'>{errors.subtitle?.message}</span>
            )}
            <Textarea
              {...register('content')}
              errorsField={errors.content?.message ?? ''}
              placeholder='Conteúdo'
              disabled={loading}
              readOnly={loading}
              className='border p-2 rounded h-40'
            />
            {errors.content && (
              <span className='text-red-500'>{errors.content?.message}</span>
            )}

            <label className='text-bold text-blue-800 flex items-center gap-2 font-bold text-md'>
              <input type='checkbox' {...register('published')} />
              Publicar post
            </label>

            <Button
              type='submit'
              disabled={loading}
              IconComponent={loading ? Loading : Plus}
              text={loading ? '' : 'Criar post'}
            />
          </form>
        </section>
      </div>
    </div>
  )
}
