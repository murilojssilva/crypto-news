'use client'

import Sidebar from '@/app/components/Sidebar'
import HeaderDashboard from '@/app/components/Dashboard/Header'
import { Pen } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { usePosts } from '@/context/PostContext'
import { useSession } from 'next-auth/react'
import { useFormattedDate } from '@/hooks/useFormatted'
import Input from '@/app/components/Form/Input'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Textarea from '@/app/components/Form/Textarea'
import { toast, ToastContainer } from 'react-toastify'
import { useState } from 'react'

const newPostFormValidationsSchema = zod.object({
  title: zod
    .string()
    .max(100, 'Título não pode ter mais de 100 caracteres')
    .nonempty('Digite o título da postagem'),
  subtitle: zod.string().nonempty('Digite o subtítulo'),
  content: zod.string().nonempty('Digite o conteúdo da postagem'),
  published: zod.boolean(),
})

type NewPostFormData = zod.infer<typeof newPostFormValidationsSchema>

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
  const [loading, setLoading] = useState(false)
  const { createPost } = usePosts()
  const router = useRouter()

  const currentDate = useFormattedDate()

  const { data: session } = useSession()

  const handleNewPostSubmit = async (data: NewPostFormData) => {
    try {
      setLoading(true)

      await createPost({
        title: data.title,
        subtitle: data.subtitle,
        content: data.content,
        published: data.published,
        written_by: session?.user?.id as string,
      })
      toast.success('Postagem publicada com sucesso!')
      router.push('/dashboard/posts')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao realizar a postagem. Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex bg-gray-50 h-screen'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <HeaderDashboard
          name={session?.user?.name as string}
          IconComponent={Pen}
          currentDate={currentDate}
          title='Dashboard'
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

            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              {loading ? 'Publicando...' : 'Criar post'}
            </button>
          </form>
        </section>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}
