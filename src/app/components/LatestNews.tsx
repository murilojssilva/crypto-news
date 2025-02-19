'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface NewsItem {
  id: string
  title: string
  content: string
}

export default function LatestNews() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

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

  const latestNews = news.slice(-3)

  return (
    <div className='flex flex-col bg-gray-200 p-8'>
      <section className='px-4 bg-gray-200'>
        <div className='flex flex-row justify-between'>
          <h1 className='text-blue-800 font-bold text-2xl'>Últimas notícias</h1>
          <span className='text-blue-800 text-sx'>
            <Link href='/news'>Ler todas</Link>
          </span>
        </div>
        {loading ? (
          <div className='flex items-center justify-center h-[42vh]'>
            <p className='text-blue-800'>Carregando notícias...</p>
          </div>
        ) : news.length === 0 ? (
          <div className='flex items-center justify-center h-[42vh]'>
            <p className='text-blue-800'>Sem notícias disponíveis...</p>
          </div>
        ) : (
          latestNews.map((item) => (
            <article
              key={item.id}
              className='flex flex-row p-4 border-b border-blue-800'
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
    </div>
  )
}
