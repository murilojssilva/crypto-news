'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

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
        const fetchedNews = data.posts || []
        setNews(fetchedNews)
      } catch (error) {
        console.error('Erro ao carregar notícias:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const latestNews = news.slice(-3)

  return (
    <section className='flex flex-col bg-gray-200 p-8'>
      <div className='flex flex-row justify-between'>
        <h1 className='text-blue-800 font-bold text-2xl'>Últimas notícias</h1>
        <span className='text-blue-800 text-sx'>
          <Link href='/news'>Ler todas</Link>
        </span>
      </div>
      <div className='flex flex-row items-center justify-center'>
        {loading ? (
          <div className='flex items-center justify-center h-[42vh]'>
            <p className='text-blue-800'>Carregando...</p>
          </div>
        ) : (
          latestNews.map((item: NewsItem) => (
            <article key={item.id} className='p-8'>
              <h2 className='text-blue-800 text-sx font-bold text-justify'>
                {item.title.length > 40
                  ? item.title.slice(0, 40).trimEnd() + '…'
                  : item.title}
              </h2>
              <p className='text-gray-800 font-medium text-sm'>
                {item.content.length > 100
                  ? item.content.slice(0, 100).trimEnd() + '…'
                  : item.content}
              </p>
              <Link href={`/news/${item.id}`}>
                <span className='text-blue-800 text-sx'>Ler mais</span>
              </Link>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
