'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Page404 from '@/app/404/page'
import Footer from '@/app/components/Footer'
import { Header } from '@/app/components/Header'

interface NewsPageItem {
  id: string
  title: string
  content: string
  subtitle: string
}

export default function NewsPage() {
  const { id } = useParams() as { id?: string }

  const [newsItem, setNewsItem] = useState<NewsPageItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    fetch('/news.json')
      .then((res) => res.json())
      .then((data) => {
        const item = data.find((n: NewsPageItem) => n.id === id)
        setNewsItem(item || null)
      })
      .catch((error) => console.error('Erro ao buscar notícia:', error))
      .finally(() => setIsLoading(false))
  }, [id])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-200'>
        <p className='text-gray-800 text-lg'>Carregando notícia...</p>
      </div>
    )
  }

  if (!newsItem) {
    return <Page404 />
  }

  return (
    <div className='flex flex-col min-h-screen bg-gray-200'>
      <Header />

      <article className='bg-gray-100 p-8 flex-1'>
        <div className='flex flex-col gap-8'>
          <div>
            <h1 className='text-blue-800 font-bold text-2xl'>
              {newsItem.title}
            </h1>
            <h3 className='text-gray-500 font-light text-sm'>
              {newsItem.subtitle}
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

      <Footer />
    </div>
  )
}
