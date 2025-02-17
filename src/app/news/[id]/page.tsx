'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Link from 'next/link'

interface NewsPageItem {
  id: string
  title: string
  content: string
  subtitle: string
}

export default function NewsPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [newsItem, setNewsItem] = useState<NewsPageItem | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/news.json')
      .then((res) => res.json())
      .then((data) => {
        const item = data.find((n: NewsPageItem) => n.id === id)
        setNewsItem(item)
      })
  }, [id, router])

  return (
    <main className=''>
      <Header />
      {newsItem ? (
        <main className='bg-gray-100 p-4'>
          <div className='py-2'>
            <div className='pb-4'>
              <span className='text-xl items-center'>
                <Link className='text-blue-800' href='/'>
                  {'Home '}
                </Link>
                <span className='text-gray-600'>→ </span>
                <Link className='text-blue-800' href='news'>
                  {'Últimas notícias '}
                </Link>
                <span className='text-gray-600'>→ {newsItem.title}</span>
              </span>
            </div>
            <h1 className='text-gray-700 font-bold text-2xl'>
              {newsItem.title}
            </h1>
            <h3 className='text-gray-500 font-light text-sm'>
              {newsItem.subtitle}
            </h3>
          </div>
          <article className='flex flex-col gap-4'>
            <p className='text-gray-800 font-medium text-md'>
              {newsItem.content}
            </p>
          </article>
        </main>
      ) : (
        <main className='bg-gray-100 h-[58vh] flex items-center justify-center'>
          <p className='text-gray-800'>Carregando...</p>
        </main>
      )}
      <Footer />
    </main>
  )
}
