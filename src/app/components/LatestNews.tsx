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

  useEffect(() => {
    // Carrega o JSON diretamente da pasta public
    fetch('/news.json')
      .then((response) => response.json())
      .then((data) => setNews(data))
  }, [])

  const latestNews = news.slice(-3)

  return (
    <section className='flex flex-col bg-gray-300 p-4'>
      <div className='flex flex-row justify-between'>
        <h1 className='text-gray-700 font-bold text-2xl'>Últimas notícias</h1>
        <span className='text-blue-800 text-sx'>
          <Link href='/news'>Ler todas</Link>
        </span>
      </div>
      <div className='flex flex-row items-center justify-center'>
        {news ? (
          <div className='w-[800px] h-[400px] animate-pulse bg-gray-300 rounded-md'></div>
        ) : (
          latestNews.map((item) => (
            <article key={item.id} className='p-8'>
              <h2 className='text-gray-900 text-xl'>{item.title}</h2>
              <p className='text-gray-800 font-medium text-sm'>
                {item.content}
              </p>
              <Link href='/'>
                <span className='text-blue-800 text-sx'>Ler mais</span>
              </Link>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
