'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface NewsItem {
  id: string
  title: string
  content: string
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(false)

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

  return (
    <main className='flex flex-col flex-1'>
      <div className='flex flex-row justify-between p-8'>
        <h1 className='text-blue-800 font-bold text-2xl'>Últimas notícias</h1>
      </div>
      <section className='px-4 bg-gray-200'>
        {loading ? (
          <div className='flex items-center justify-center h-[42vh]'>
            <p className='text-blue-800'>Sem notícias disponíveis...</p>
          </div>
        ) : (
          news.map((item: NewsItem) => (
            <article
              key={item.id}
              className='flex p-4 border-b border-blue-800'
            >
              <Link href={`/news/${item.id}`}>
                <h2 className='text-blue-800 text-sx font-bold text-justify'>
                  {item.title}
                </h2>
                <p className='text-gray-800 font-medium text-sm'>
                  {item.content.length > 200
                    ? item.content.slice(0, 200).trimEnd() + '…'
                    : item.content}
                </p>
              </Link>
            </article>
          ))
        )}
      </section>
    </main>
  )
}
