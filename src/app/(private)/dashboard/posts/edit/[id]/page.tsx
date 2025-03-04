'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Input from '@/app/components/Form/Input'
import Textarea from '@/app/components/Form/Textarea'
import {
  EditPostFormData,
  editPostFormValidationsSchema,
} from '@/app/schemas/NewPostSchema'
import { usePosts } from '@/context/PostContext'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { getPostById } from '@/lib/posts/[id]'
import RootLayout from '../../../layout'
import { Pen } from 'lucide-react'

export default function EditPost() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm<EditPostFormData>({
    resolver: zodResolver(editPostFormValidationsSchema),
  })

  const { id } = useParams()
  const router = useRouter()
  const { loading, setLoading, fetchPosts } = usePosts()

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
    <RootLayout title='Perfil' IconComponent={Pen}>
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
            placeholder='Conteúdo'
            className='border p-2 rounded h-40'
          />
          {errors.content && (
            <span className='text-red-500'>{errors.content.message}</span>
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
    </RootLayout>
  )
}
