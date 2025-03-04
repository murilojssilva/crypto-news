'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getUserById } from '@/lib/users/[id]'
import { usePosts } from '@/context/PostContext'
import { NewsItemProps } from '@/app/interfaces/PostInterface'

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
                <h1 className='text-blue-800 font-bold text-2xl'>
                  {post.title}
                </h1>
                <h3 className='text-gray-500 font-light text-sm'>
                  {Object.keys(user).length > 0 &&
                    `${post.subtitle}, por ${user.firstName} ${user.lastName}`}
                </h3>
              </div>
              <p
                className='text-gray-800 font-medium text-md text-justify'
                style={{ whiteSpace: 'pre-wrap', lineHeight: 1.75 }}
              >
                {post.content}
              </p>
            </div>
          </article>
        </section>
      )}
    </main>
  )
}
