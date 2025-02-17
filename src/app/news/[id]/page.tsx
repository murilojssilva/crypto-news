'use client'

import Page404 from '@/app/404/page'
import Footer from '@/app/components/Footer'
import { Header } from '@/app/components/Header'
import { useEffect, useState } from 'react'

interface NewsPageItem {
  id: string
  title: string
  content: string
  subtitle: string
}

interface NewsPageProps {
  params: { id: string }
}

export default function NewsPage({ params }: NewsPageProps) {
  const [newsItem, setNewsItem] = useState<NewsPageItem | null>(null)

  useEffect(() => {
    fetch('/news.json')
      .then((res) => res.json())
      .then((data) => {
        const item = data.find((n: NewsPageItem) => n.id === params.id)
        setNewsItem(item || null)
      })
  }, [params.id])

  if (!newsItem) return <Page404 />

  return (
    <div className='flex flex-col bg-gray-200'>
      <Header />

      {newsItem ? (
        <article className='bg-gray-100 p-8' key={newsItem.id}>
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
              className='flex flex-col gap-4 text-gray-800 font-medium text-md text-justify'
              style={{ whiteSpace: 'pre-wrap', lineHeight: 1.75 }}
            >
              {newsItem.content}
            </p>
          </div>
        </article>
      ) : (
        <div className='flex items-center justify-center h-[42vh]'>
          <p className='text-gray-800'>Carregando...</p>
        </div>
      )}
      <Footer />
    </div>
  )
}
