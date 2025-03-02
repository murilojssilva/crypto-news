'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getPosts, createPost as createPostAPI } from '@/lib/posts'

interface Post {
  id: string
  title: string
  subtitle?: string
  content: string
  published: boolean
  written_by: string
  createdAt: string
  updatedAt: string
}

interface PostsContextType {
  posts: Post[]
  loading: boolean
  error: string | null
  fetchPosts: () => Promise<void>
  createPost: (
    newPost: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>
}

const PostsContext = createContext<PostsContextType | undefined>(undefined)

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
    newPost: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    try {
      const createdPost = await createPostAPI(newPost)
      setPosts((prevPosts) => [createdPost, ...prevPosts])
    } catch (err) {
      console.log(err)
      setError('Erro ao criar o post.')
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <PostsContext.Provider
      value={{ posts, loading, error, fetchPosts, createPost }}
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
