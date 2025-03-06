'use client'

import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { usePosts } from '@/context/PostContext'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { LatestNewsProps } from '../interfaces/PostInterface'

export default function LatestNews({ count = 3 }: LatestNewsProps) {
  const { posts, loading } = usePosts()

  const latestNews = posts.slice(-count)
  const skeletons = Array(count).fill('')

  return (
    <div className='flex flex-col bg-gray-200 p-8'>
      <section className='px-4 bg-gray-200'>
        <div className='flex flex-row justify-between'>
          <h1 className='text-blue-800 font-bold text-2xl'>Últimas notícias</h1>
          <span className='text-blue-800 text-sx'>
            {posts && <Link href='/news'>Ler todas</Link>}
          </span>
        </div>
        {loading ? (
          <div className='grid gap-4'>
            {skeletons.map((_, index) => (
              <Skeleton
                key={index}
                baseColor='#e0e0e0'
                highlightColor='#bdbdbd'
                className='flex items-center justify-center h-[8vh]'
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
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
                  <ReactMarkdown>
                    {item.content.length > 200
                      ? item.content.slice(0, 200).trimEnd() + '…'
                      : item.content}
                  </ReactMarkdown>
                </p>
              </Link>
            </article>
          ))
        )}
      </section>
    </div>
  )
}
