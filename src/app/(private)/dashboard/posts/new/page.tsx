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

      <div className='flex-1'>
        <HeaderDashboard
          name={session?.user?.name as string}
          IconComponent={Pen}
          currentDate={currentDate}
          title='Novo Post'
        />

        <section className='p-6 grid gap-4'>
          <h2 className='text-4xl text-bold text-blue-800'>Novo post</h2>
          <form
            onSubmit={handleSubmit(handleNewPostSubmit)}
            className='flex flex-col gap-8'
          >
            <Input
              {...register('title')}
              errorsField={errors.title?.message ?? ''}
              type='text'
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
              placeholder='Subtítulo'
              className='border p-2 rounded'
            />
            {errors.subtitle && (
              <span className='text-red-500'>{errors.subtitle?.message}</span>
            )}
            <Textarea
              {...register('content')}
              /* @ts-expect-error: Ignoring type error for 'errorsField' property that is not part of TextareaProps */
              errorsField={errors.content?.message ?? ''}
              placeholder='Conteúdo'
              className='border p-2 rounded h-40'
            />
            {errors.content && (
              <span className='text-red-500'>{errors.content?.message}</span>
            )}

            <label className='text-sm text-bold text-blue-800 flex items-center gap-2 font-bold'>
              <input type='checkbox' {...register('published')} />
              Publicar post
            </label>

            <Button
              type='submit'
              disabled={loading}
              IconComponent={Plus}
              text={loading ? 'Publicando...' : 'Criar post'}
            />
          </form>
        </section>
      </div>
    </div>
  )
}
