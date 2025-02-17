'use client'

import Link from 'next/link'
import Footer from '../components/Footer'
import { Header } from '../components/Header'
import { useEffect, useState } from 'react'

interface NewsItem {
  id: string
  title: string
  content: string
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    fetch('/news.json')
      .then((response) => response.json())
      .then((data) => setNews(data))
  }, [])

  return (
    <div className='flex flex-col bg-gray-200'>
      <Header />

      <div className='flex flex-row justify-between p-8'>
        <h1 className='text-blue-800 font-bold text-2xl'>Últimas notícias</h1>
      </div>
      <section className='px-4 bg-gray-200'>
        {news.length === 0 ? (
          <div className='flex items-center justify-center h-[42vh]'>
            <p className='text-blue-800'>Carregando...</p>
          </div>
        ) : (
          news.map((item) => (
            <article
              key={item.id}
              className='flex p-4 border-b border-gray-400'
            >
              <Link href={`/news/${item.id}`}>
                <h2 className='text-gray-900 text-xl font-bold'>
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
      <Footer />
    </div>
  )
}
