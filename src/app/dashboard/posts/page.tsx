'use client'

import { Pen, Plus, Trash } from 'lucide-react'
import Sidebar from '@/app/components/Sidebar'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import HeaderDashboard from '@/app/components/Dashboard/Header'
import { useSession } from 'next-auth/react'
import { useFormattedDate } from '@/hooks/useFormatted'
import { deletePost } from '@/lib/posts/[id]'

interface NewsItem {
  id: string
  title: string
  content: string
}

export default function Posts() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()

  const currentDate = useFormattedDate()

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/posts')
        const data = await response.json()

        if (Array.isArray(data)) {
          setNews(data)
        } else {
          console.error('Formato inesperado da resposta:', data)
          setNews([])
        }
      } catch (error) {
        console.error('Erro ao buscar posts:', error)
        setNews([])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir este post?'
    )

    if (confirmDelete) {
      try {
        await deletePost(id) // Usando a função deletePost
        setNews((prevNews) => prevNews.filter((item) => item.id !== id))
        alert('Post excluído com sucesso!')
      } catch (error) {
        alert('Erro ao excluir o post')
        console.error('Erro ao excluir o post:', error)
      }
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
          title='Posts'
        />

        <section className='px-4 mb-4 flex-1 overflow-auto max-h-[100vh]'>
          <div className='flex flex-row justify-center'>
            <Link
              className='bg-blue-800 flex flex-row justify-around p-2 w-[50%] m-3 rounded-xl'
              href='/dashboard/posts/new'
            >
              <Plus /> Novo Post
            </Link>
          </div>
          {loading ? (
            <div className='flex items-center justify-center h-full'>
              <p className='text-blue-800'>Sem notícias disponíveis...</p>
            </div>
          ) : (
            news.map((item: NewsItem) => (
              <article
                key={item.id}
                className='flex p-4 border-b border-blue-800 items-center justify-between'
              >
                <Link href={`/news/${item.id}`} className='flex-1'>
                  <h2 className='text-blue-800 text-sx font-bold'>
                    {item.title}
                  </h2>
                  <p className='text-gray-800 font-medium text-sm'>
                    {item.content.length > 200
                      ? item.content.slice(0, 200).trimEnd() + '…'
                      : item.content}
                  </p>
                </Link>
                <div className='flex flex-row gap-2'>
                  <Link href={`/dashboard/posts/edit/${item.id}`}>
                    <Pen size={24} color='grey' />
                  </Link>
                  <button onClick={() => handleDelete(item.id)}>
                    <Trash size={24} color='red' />
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  )
}
