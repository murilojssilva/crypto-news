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
import { getCategoryById } from '@/lib/categories/[id]'
import { useCategories } from '@/context/CategoryContext'

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
  const { categories } = useCategories()

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          setLoading(true)
          const data = await getPostById(id as string)

          const categoriesData = await getCategoryById(data.id as string)

          console.log({ data, categoriesData })

          if (Array.isArray(categoriesData)) {
            const selectedCategoryNames = categoriesData.map((cat) => cat.name)
            setValue('categories', selectedCategoryNames)
          } else {
            setValue('categories', [])
          }

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
  }, [id, setValue, setLoading])

  useEffect(() => {
    const savedPost = localStorage.getItem(`post-${id}`)
    if (savedPost) {
      const parsedData = JSON.parse(savedPost)
      setValue('content', parsedData.content)
    }
  }, [id, setValue])

  const handleEditPostSubmit = async (data: EditPostFormData) => {
    try {
      setLoading(true)

      if (id) {
        const formattedData = {
          ...data,
          id,
          updatedAt: new Date(),
          categories:
            data.categories?.map((categoryId: string) => ({
              id: categoryId,
            })) || [],
        }

        await fetch(`/api/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify(formattedData),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        toast.success('Postagem editada com sucesso!')
        fetchPosts()
        router.push('/dashboard/posts')
      }
    } catch (error) {
      console.error('Erro ao editar postagem:', error)
      toast.error('Erro ao editar postagem. Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-gray-50 pb-4 h-screen flex'>
      <title>CryptoNews | Editar postagem</title>
      <Sidebar />

      <div className='flex-1 overflow-auto'>
        <HeaderDashboard
          firstName={session?.user?.firstName as string}
          IconComponent={Home}
          currentDate={currentDate}
          title='Editar Post'
        />

        <section className='px-6 pt-6 flex flex-col gap-4 overflow-y-auto'>
          <Title title='Editar post' />
          <div className='flex flex-col gap-8 w-full'>
            <form
              onSubmit={handleSubmit(handleEditPostSubmit)}
              className='flex flex-col gap-2'
            >
              <label className='text-blue-800' htmlFor='title'>
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
              <label className='text-blue-800' htmlFor='subtitle'>
                Subtítulo
              </label>
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
              <label className='text-blue-800' htmlFor='content'>
                Conteúdo
              </label>
              <Textarea
                {...register('content')}
                typeof='text'
                disabled={loading}
                readOnly={loading}
                errorsField={errors.subtitle?.message ?? ''}
                placeholder='Conteúdo'
                className='border p-2 rounded h-40'
              />
              {errors.content && (
                <span className='text-red-500'>{errors.content.message}</span>
              )}

              <label className='text-bold text-blue-800 font-bold text-xl'>
                Selecione as categorias
              </label>
              <select
                {...register('categories')}
                multiple
                className={`border p-2 rounded w-full text-gray-400 ${
                  loading && 'bg-gray-300 cursor-not-allowed'
                }`}
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
