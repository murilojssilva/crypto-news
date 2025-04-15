'use client'

import Link from 'next/link'
import { usePosts } from '@/context/PostContext'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import NotFound from '@/assets/images/not_found.jpg'
import Image from 'next/image'

export default function LatestNews() {
  const { posts, loading } = usePosts()

  const skeletons = Array(3).fill('')

  return (
    <div className='flex flex-col bg-gray-200 p-8'>
      <section className='flex flex-col px-4 bg-gray-200'>
        <div className='flex flex-row justify-between'>
          <h1 className='text-blue-800 font-bold text-2xl'>Últimas notícias</h1>
          <span className='text-blue-800 text-xs'>
            {posts && <Link href='/news'>Ler todas</Link>}
          </span>
        </div>
        {loading ? (
          <div className='grid grid-cols-3 gap-4 pt-8'>
            {skeletons.map((_, index) => (
              <Skeleton
                key={index}
                baseColor='#e0e0e0'
                highlightColor='#bdbdbd'
                className='flex items-center justify-center h-[42vh]'
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className='flex items-center justify-center h-[42vh]'>
            <p className='text-blue-800'>Sem notícias disponíveis...</p>
          </div>
        ) : (
          <div className='grid md:grid-cols-3 grid-cols-1'>
            {posts.slice(-3).map((item) => (
              <div
                className='flex flex-row items-center justify-center gap-4 pt-8'
                key={item.id}
              >
                <Link className='flex flex-col gap-2' href={`/news/${item.id}`}>
                  <h2 className='text-blue-800 text-md font-bold text-justify'>
                    {item.title}
                  </h2>

                  <Image
                    src={NotFound}
                    alt='Not found Image'
                    className='mx-auto md:h-[25vh] md:w-[25vw] h-[80vh] w-[80vw] rounded-xl'
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
