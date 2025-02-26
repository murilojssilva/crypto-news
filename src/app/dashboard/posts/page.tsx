'use client'

import { Pen, Trash } from '@phosphor-icons/react'
import Sidebar from '../../components/Sidebar'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import HeaderDashboard from '@/app/components/Dashboard/Header'

interface NewsItem {
  id: string
  title: string
  content: string
}

export default function Posts() {
  const [currentDate, setCurrentDate] = useState('')
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const date = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }
    let formattedDate = date.toLocaleDateString('pt-BR', options)
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    setCurrentDate(formattedDate)
  }, [])

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://crypto-news-server-d982fcfac1fc.herokuapp.com/posts'
        )
        const data = await response.json()
        setNews(data.posts || [])
      } catch (error) {
        console.error('Erro ao buscar notícias:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <div className='flex bg-gray-50 h-screen'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <HeaderDashboard
          name='User'
          IconComponent={Pen}
          currentDate={currentDate}
          title='Posts'
        />

        <section className='px-4 mb-4 flex-1 overflow-auto max-h-[100vh]'>
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
                  <button>
                    <Pen size={24} color='grey' />
                  </button>
                  <button>
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
