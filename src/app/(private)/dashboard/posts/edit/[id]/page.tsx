'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Input from '@/app/components/Form/Input'
import Textarea from '@/app/components/Form/Textarea'
import { usePosts } from '@/context/PostContext'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { getPostById } from '@/lib/posts/[id]'

import { Home, Save } from 'lucide-react'
import Sidebar from '@/app/components/Sidebar'
import HeaderDashboard from '@/app/components/Dashboard/Header'
import { useSession } from 'next-auth/react'
import { useFormattedDate } from '@/hooks/useFormatted'
import { Button } from '@/app/components/Dashboard/Button'
import {
  EditPostFormData,
  editPostFormValidationsSchema,
} from '@/app/schemas/EditPostSchema'
import { Title } from '@/app/components/Dashboard/Title'
import { Loading } from '@/app/components/Form/Loading'

export default function EditPost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditPostFormData>({
    resolver: zodResolver(editPostFormValidationsSchema),
  })

  const { id } = useParams()
  const router = useRouter()
  const { loading, setLoading, fetchPosts } = usePosts()
  const { data: session } = useSession()
  const currentDate = useFormattedDate()

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
  }, [])

  useEffect(() => {
    const savedPost = localStorage.getItem(`post-${id}`)
    if (savedPost) {
      const parsedData = JSON.parse(savedPost)
      setValue('content', parsedData.content)
    }
  }, [])

  const handleEditPostSubmit = async (data: EditPostFormData) => {
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
        fetchPosts()

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
    <div className='bg-gray-50 pb-4 h-screen flex'>
      <Sidebar />

      <div className='flex-1'>
        <HeaderDashboard
          name={session?.user?.name as string}
          IconComponent={Home}
          currentDate={currentDate}
          title='Editar Post'
        />

        <section className='p-6 grid gap-4'>
          <Title title='Editar post' />
          <div className='flex flex-col gap-8 w-full'>
            <form
              onSubmit={handleSubmit(handleEditPostSubmit)}
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
                disabled={loading}
                readOnly={loading}
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
                typeof='text'
                disabled={loading}
                readOnly={loading}
                /* @ts-expect-error: Ignoring type error for 'errorsField' property that is not part of TextareaProps */
                errorsField={errors.subtitle?.message ?? ''}
                placeholder='Conteúdo'
                className='border p-2 rounded h-40'
              />
              {errors.content && (
                <span className='text-red-500'>{errors.content.message}</span>
              )}

              <label className='text-bold text-blue-800 flex items-center gap-2 font-bold text-md'>
                <input type='checkbox' {...register('published')} />
                Publicar post
              </label>

              <Button
                type='submit'
                disabled={loading}
                IconComponent={loading ? Loading : Save}
                text={loading ? '' : 'Salvar alterações'}
              />
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
