'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getPosts, createPost as createPostAPI } from '@/lib/posts'
import { deletePost, getPostById } from '@/lib/posts/[id]'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { NewPostFormData } from '@/app/schemas/NewPostSchema'
import {
  NewsItem,
  NewsItemProps,
  PostProps,
} from '@/app/interfaces/PostInterface'
import { EditPostFormData } from '@/app/schemas/EditPostSchema'
import { prisma } from '@/lib/prisma'

interface PostsContextType {
  posts: PostProps[] | NewsItem[]
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  error: string | null
  handleNewPostSubmit: (data: NewPostFormData) => Promise<void>
  handleEditPostSubmit: (data: NewPostFormData) => Promise<void>
  fetchPosts: () => Promise<void>
  fetchPostById: (id: string) => Promise<NewsItemProps | PostProps | null>
  handleDeletePost: (id: string) => Promise<void>
  createPost: (
    newPost: Omit<PostProps, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>
}

const PostsContext = createContext<PostsContextType | undefined>(undefined)

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostProps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const { data: session } = useSession()

  const { id } = useParams()

  useEffect(() => {
    if (id) {
      fetchPostById(id as string)
    }
  }, [id])

  const fetchPostById = async (
    id: string
  ): Promise<NewsItemProps | PostProps | null> => {
    if (!id) {
      console.error('ID do post não encontrado.')
      return null
    }

    try {
      setLoading(true)

      const response = await getPostById(id)
      if (!response) throw new Error('Post não encontrado')

      return response
    } catch (error) {
      console.error('Erro ao fazer o post:', error)
      toast.error('Erro ao recuperar postagens. Tente novamente mais tarde.')
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleNewPostSubmit = async (data: NewPostFormData) => {
    try {
      setLoading(true)

      console.log(data)

      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: data.title,
          subtitle: data.subtitle,
          content: data.content,
          published: data.published,
          userId: session?.user?.id,
          categories: data.categories,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Erro ao criar o post')
      }

      await response.json()

      fetchPosts()

      toast.success('Postagem publicada com sucesso!')
      router.push('/dashboard/posts')
    } catch (error) {
      console.error('Erro ao realizar a postagem:', error)
      toast.error('Erro ao realizar a postagem. Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  const handleEditPostSubmit = async (data: EditPostFormData) => {
    try {
      setLoading(true)

      if (id) {
        const categoryObjects = await Promise.all(
          data.categories.map(async (categoryName) => {
            let category = await prisma.category.findUnique({
              where: { name: categoryName },
            })

            if (!category) {
              category = await prisma.category.create({
                data: { name: categoryName },
              })
            }

            return { categoryId: category.id }
          })
        )

        await fetch(`/api/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            ...data,
            categories: categoryObjects.map((cat) => ({
              categoryId: cat.categoryId,
            })),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }

      toast.success('Postagem editada com sucesso!')
      router.push('/dashboard/posts')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao editar postagem. Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getPosts()
      setPosts(data)
    } catch (err) {
      setError('Erro ao carregar os posts.')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const createPost = async (
    newPost: Omit<PostProps, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    try {
      const createdPost = await createPostAPI(newPost)
      setPosts((prevPosts) => [createdPost, ...prevPosts])
    } catch (err) {
      console.log(err)
      setError('Erro ao criar o post.')
    }
  }

  const handleDeletePost = async (id: string): Promise<void> => {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir este post?'
    )

    if (confirmDelete) {
      try {
        setLoading(true)
        await deletePost(id)
        setPosts((prevNews) => prevNews.filter((item) => item.id !== id))
        fetchPosts()
        alert('Post excluído com sucesso!')
      } catch (error) {
        alert('Erro ao excluir o post')
        console.error('Erro ao excluir o post:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <PostsContext.Provider
      value={{
        posts,
        loading,
        error,
        fetchPosts,
        setLoading,
        handleNewPostSubmit,
        handleEditPostSubmit,
        createPost,
        handleDeletePost,
        fetchPostById,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}

export const usePosts = () => {
  const context = useContext(PostsContext)
  if (!context) {
    throw new Error('usePosts deve ser usado dentro de um PostsProvider')
  }
  return context
}
