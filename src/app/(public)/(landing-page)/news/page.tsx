'use client'

import { NewsItem } from '@/app/interfaces/PostInterface'
import { usePosts } from '@/context/PostContext'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import ReactMarkdown from 'react-markdown'

export default function News() {
  const { posts, loading } = usePosts()
  const skeletons = Array(3).fill('')

  return (
    <main className='flex flex-col flex-1'>
      <div className='flex flex-row justify-between p-8'>
        <h1 className='text-blue-800 font-bold text-2xl'>Últimas notícias</h1>
      </div>
      <section className='p-4 bg-gray-200'>
        {loading ? (
          <div className='grid gap-4'>
            {skeletons.map((_, index) => (
              <Skeleton
                key={index}
                baseColor='#e0e0e0'
                highlightColor='#bdbdbd'
                className='flex items-center justify-center h-[10vh]'
              />
            ))}
          </div>
        ) : (
          posts
            .filter((item) => item.published)
            .map((item: NewsItem) => (
              <article
                key={item.id}
                className='flex p-4 border-b border-blue-800'
              >
                <Link href={`/news/${item.id}`}>
                  <h2 className='text-blue-800 text-sx font-bold text-justify'>
                    {item.title}
                  </h2>
                  <div className='text-gray-800 font-medium text-sm'>
                    <ReactMarkdown>
                      {item.content.length > 200
                        ? item.content.slice(0, 200).trimEnd() + '…'
                        : item.content}
                    </ReactMarkdown>
                  </div>
                </Link>
              </article>
            ))
        )}
      </section>
    </main>
  )
}
