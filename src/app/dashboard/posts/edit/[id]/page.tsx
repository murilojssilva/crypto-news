'use client'

import HeaderDashboard from '@/app/components/Dashboard/Header'
import Sidebar from '@/app/components/Sidebar'
import { useFormattedDate } from '@/hooks/useFormatted'
import { Pen } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { toast } from 'react-toastify'
import Input from '@/app/components/Form/Input'
import Textarea from '@/app/components/Form/Textarea'
import { getPostById } from '@/lib/posts/[id]'

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

export default function Edit() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm<NewPostFormData>({
    resolver: zodResolver(newPostFormValidationsSchema),
    defaultValues: {
      published: false,
    },
  })
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          setLoading(true)
          const data = await getPostById(id as string)

          setValue('title', data.title)
          setValue('subtitle', data.subtitle)
          setValue('content', data.content)
          setValue('published', data.published)
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
  }, [id, setValue])

  const { data: session } = useSession()
  const currentDate = useFormattedDate()

  const handleEditPostSubmit = async (data: NewPostFormData) => {
    try {
      setLoading(true)
      if (id) {
        await fetch(`/api/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        toast.success('Postagem editada com sucesso!')

        router.push('/dashboard/posts')
      }
    } catch (error) {
      console.log(error)
      toast.error('Erro ao editar postagem. Tente novamente mais tarde.')
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
          title='Editar post'
        />
        <section className='p-6 grid gap-4'>
          <h2 className='text-4xl text-bold text-blue-800'>Editar post</h2>
          <form
            onSubmit={handleSubmit(handleEditPostSubmit)}
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
              disabled={loading || !isDirty || !isValid}
            >
              {loading ? 'Publicando...' : 'Salvar alterações'}
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
