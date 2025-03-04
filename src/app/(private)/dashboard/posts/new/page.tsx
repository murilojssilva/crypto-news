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
import RootLayout from '../../layout'
import { Pen } from 'lucide-react'

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

  return (
    <RootLayout title='Teste' IconComponent={Pen}>
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

          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            {loading ? 'Publicando...' : 'Criar post'}
          </button>
        </form>
      </section>
    </RootLayout>
  )
}
