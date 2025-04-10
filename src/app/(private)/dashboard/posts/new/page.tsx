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
import { useCategories } from '@/context/CategoryContext'
import { useTheme } from 'next-themes'

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
  const { categories } = useCategories()
  const { data: session } = useSession()
  const currentDate = useFormattedDate()
  const { resolvedTheme } = useTheme()

  return (
    <div
      className={`pb-4 h-screen flex
     ${resolvedTheme === 'light' ? 'bg-gray-50' : 'bg-gray-800'}
    `}
    >
      <title>Nova postagem | CryptoNews</title>
      <Sidebar />

      <div className='flex-1 overflow-auto'>
        <HeaderDashboard
          firstName={session?.user?.firstName as string}
          IconComponent={Pen}
          currentDate={currentDate}
          title='Novo Post'
        />

        <section className='px-6 pt-6 flex flex-col gap-4 overflow-y-auto'>
          <Title title='Novo post' />

          <form
            onSubmit={handleSubmit(handleNewPostSubmit)}
            className='flex flex-col gap-4'
          >
            <label
              className={`${
                resolvedTheme === 'light' ? 'text-blue-800' : 'text-blue-400'
              }`}
              htmlFor='title'
            >
              Título
            </label>
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
            <label
              className={`${
                resolvedTheme === 'light' ? 'text-blue-800' : 'text-blue-400'
              }`}
              htmlFor='subtitle'
            >
              Subtítulo
            </label>
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
            <label
              className={`${
                resolvedTheme === 'light' ? 'text-blue-800' : 'text-blue-400'
              }`}
              htmlFor='title'
            >
              Conteúdo
            </label>
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

            <label
              className={`${
                resolvedTheme === 'light' ? 'text-blue-800' : 'text-blue-400'
              }`}
            >
              Selecione as categorias
            </label>
            <select
              {...register('categories')}
              multiple
              className={`border p-2 rounded w-full text-gray-400 ${
                loading && 'bg-gray-300 cursor-not-allowed'
              }
              ${
                resolvedTheme === 'light'
                  ? 'bg-gray-100 border-gray-200'
                  : 'bg-gray-800 border-gray-400'
              }
              `}
              disabled={loading}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categories && (
              <span className='text-red-500'>
                {errors.categories.message as string}
              </span>
            )}

            <label
              className={`flex items-center gap-2 p-4 w-full border rounded-md cursor-pointer
              ${
                resolvedTheme === 'light'
                  ? 'border-gray-200 text-blue-800 '
                  : 'border-gray-400 text-blue-400'
              }
              font-bold text-md
            `}
            >
              <input
                type='checkbox'
                {...register('published')}
                className='accent-blue-600'
              />
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
