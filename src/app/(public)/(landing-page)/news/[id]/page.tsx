'use client'

import ReactMarkdown from 'react-markdown'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getUserById } from '@/lib/users/[id]'
import { usePosts } from '@/context/PostContext'
import { NewsItemProps } from '@/app/interfaces/PostInterface'
import { Title } from '@/app/components/Dashboard/Title'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface UserItem {
  id: string
  firstName: string
  lastName: string
}

export default function NewsPage() {
  const { fetchPostById, loading, setLoading } = usePosts()
  const [post, setPost] = useState<NewsItemProps>({} as NewsItemProps)
  const [user, setUser] = useState<UserItem>({} as UserItem)

  const { id } = useParams()

  useEffect(() => {
    async function loadPost() {
      if (!id) return
      const response = await fetchPostById(id as string)
      if (response !== null) {
        setPost(response as NewsItemProps)
      }
    }
    loadPost()
  }, [id])

  useEffect(() => {
    if (post?.writtenBy) {
      const fetchUser = async () => {
        try {
          setLoading(true)
          const data = await getUserById(post.writtenBy)
          setUser(data)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }

      fetchUser()
    }
  }, [post])

  return (
    <main className='flex flex-col flex-1'>
      {loading ? (
        <section className='px-4 bg-gray-200 flex items-center justify-center'>
          <div className='flex items-center justify-center h-[50vh]'>
            <p className='text-blue-800 text-lg font-semibold'>Carregando...</p>
          </div>
        </section>
      ) : (
        <section className='px-4 bg-gray-200'>
          <article className='p-8'>
            <div className='flex flex-col gap-8'>
              <div>
                <Title title={post.title} />
                <h3 className='text-gray-800 font-light text-md'>
                  {post.subtitle}
                </h3>
                <span className='text-gray-500 font-light text-sm'>
                  {Object.keys(user).length > 0 &&
                    `${format(
                      new Date(post.createdAt),
                      "dd/MM/yyyy 'às' HH:mm",
                      {
                        locale: ptBR,
                      }
                    )}, por ${user.firstName} ${user.lastName}`}
                </span>
              </div>
              <p
                className='text-gray-800 font-medium text-md text-justify'
                style={{ whiteSpace: 'pre-wrap', lineHeight: 1.75 }}
              >
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </p>
            </div>
          </article>
        </section>
      )}
    </main>
  )
}
