'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuidv4 } from 'uuid'

import Input from '@/app/components/Form/Input'
import Textarea from '@/app/components/Form/Textarea'
import { usePosts } from '@/context/PostContext'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { getPostById } from '@/lib/posts/[id]'

import { Home, Plus, Save } from 'lucide-react'
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
import { useTheme } from 'next-themes'

export default function EditPost() {
  const [newCategory, setNewCategory] = useState('')
  const [addingCategory, setAddingCategory] = useState(false)
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
  const { categories, addCategory } = useCategories()
  const { resolvedTheme } = useTheme()

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
    <div
      className={`pb-4 h-screen flex
     ${resolvedTheme === 'light' ? 'bg-gray-50' : 'bg-gray-800'}
    `}
    >
      <title>Editar postagem | CryptoNews</title>
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
              <label
                className={`${
                  resolvedTheme === 'light' ? 'text-blue-800' : 'text-blue-400'
                }`}
                htmlFor='content'
              >
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
              <h3
                className={`${
                  resolvedTheme === 'light' ? 'text-blue-800' : 'text-blue-200'
                }`}
              >
                Selecione as categorias
              </h3>
              <ul className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full'>
                {categories.map((category) => {
                  const id = `category-${category.id}`
                  return (
                    <li key={category.id}>
                      <input
                        type='checkbox'
                        id={id}
                        value={category.name}
                        {...register('categories')}
                        className='hidden peer'
                        disabled={loading}
                      />
                      <label
                        htmlFor={id}
                        className={`inline-flex items-center justify-between w-full p-5 rounded-lg cursor-pointer border-2
                          ${
                            resolvedTheme === 'light'
                              ? 'border-gray-200 peer-checked:border-blue-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50 text-gray-500 bg-white'
                              : 'hover:text-gray-300 border-gray-700 peer-checked:border-blue-600 peer-checked:text-gray-300 text-gray-400 bg-gray-800 hover:bg-gray-700'
                          }
                          ${loading ? 'bg-gray-300 cursor-not-allowed' : ''}
                        `}
                      >
                        <div className='w-full text-lg font-semibold'>
                          {category.name}
                        </div>
                      </label>
                    </li>
                  )
                })}
                <li>
                  {addingCategory ? (
                    <div className='flex flex-col gap-2'>
                      <input
                        type='text'
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className={`p-2 rounded border
                                      ${
                                        resolvedTheme === 'light'
                                          ? 'border-gray-400 bg-gray-50 text-black'
                                          : 'border-gray-400 dark:text-white dark:bg-gray-800'
                                      }
                                      `}
                        placeholder='Nome da categoria'
                        disabled={loading}
                      />
                      <div className='flex gap-2'>
                        <button
                          type='button'
                          onClick={() => {
                            if (newCategory.trim()) {
                              addCategory({
                                id: uuidv4(),
                                name: newCategory.trim(),
                              })
                              setNewCategory('')
                              setAddingCategory(false)
                            }
                          }}
                          className='px-2 py-1 bg-blue-600 text-white rounded'
                        >
                          Adicionar
                        </button>
                        <button
                          type='button'
                          onClick={() => {
                            setNewCategory('')
                            setAddingCategory(false)
                          }}
                          className='px-2 py-1 border rounded bg-gray-100 text-gray-800 border-gray-800'
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type='button'
                      onClick={() => setAddingCategory(true)}
                      className='w-full h-full flex flex-col items-center justify-center p-2 border-2 border-dashed rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400'
                    >
                      <Plus size={24} />
                      <span className='text-sm'>Nova categoria</span>
                    </button>
                  )}
                </li>
              </ul>

              {errors.categories && (
                <span className='text-red-500'>
                  {errors.categories.message as string}
                </span>
              )}

              <label
                className={`flex items-center gap-2 p-4 w-full border rounded-md cursor-pointer
              ${
                resolvedTheme === 'light'
                  ? 'border-gray-200 text-blue-800'
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
