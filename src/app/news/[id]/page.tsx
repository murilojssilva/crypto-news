'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Footer from '@/app/components/Footer'
import { Header } from '@/app/components/Header'
import { getPostById } from '@/lib/posts/[id]'
import { getUserById } from '@/lib/users/[id]'

interface NewsPageItem {
  id: string
  title: string
  content: string
  subtitle: string
  writtenBy: string
}

interface UserItem {
  id: string
  firstName: string
  lastName: string
}

export default function NewsPage() {
  const [newsItem, setNewsItem] = useState<NewsPageItem>({} as NewsPageItem)
  const [user, setUser] = useState<UserItem>({} as UserItem)

  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          setLoading(true)
          const data = await getPostById(id as string)
          console.log('Spider: ', data)
          setNewsItem(data)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }

      fetchPost()
    }
  }, [id])

  useEffect(() => {
    if (newsItem?.writtenBy) {
      const fetchUser = async () => {
        try {
          setLoading(true)
          const data = await getUserById(newsItem.writtenBy)
          console.log('Stagi ', data)
          setUser(data)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }

      fetchUser()
    }
  }, [newsItem?.writtenBy])

  return (
    <div className='flex flex-col min-h-screen bg-gray-200'>
      <Header />

      {loading ? (
        <section className='px-4 bg-gray-200 flex-1 flex items-center justify-center'>
          <div className='flex items-center justify-center h-[50vh]'>
            <p className='text-blue-800 text-lg font-semibold'>Carregando...</p>
          </div>
        </section>
      ) : (
        <section className='px-4 bg-gray-200 flex-1'>
          <article className='p-8'>
            <div className='flex flex-col gap-8'>
              <div>
                <h1 className='text-blue-800 font-bold text-2xl'>
                  {newsItem.title}
                </h1>
                <h3 className='text-gray-500 font-light text-sm'>
                  {Object.keys(user).length > 0 &&
                    `${newsItem.subtitle}, por ${user.firstName} ${user.lastName}`}
                </h3>
              </div>
              <p
                className='text-gray-800 font-medium text-md text-justify'
                style={{ whiteSpace: 'pre-wrap', lineHeight: 1.75 }}
              >
                {newsItem.content}
              </p>
            </div>
          </article>
        </section>
      )}

      <Footer />
    </div>
  )
}
