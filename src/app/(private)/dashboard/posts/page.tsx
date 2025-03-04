'use client'

import { Pen, Plus, Trash } from 'lucide-react'
import Link from 'next/link'
import { usePosts } from '@/context/PostContext'
import { NewsItem } from '@/app/interfaces/PostInterface'
import { useSession } from 'next-auth/react'
import { useFormattedDate } from '@/hooks/useFormatted'
import Sidebar from '@/app/components/Sidebar'
import HeaderDashboard from '@/app/components/Dashboard/Header'

export default function Posts() {
  const { posts, loading, handleDeletePost } = usePosts()
  const { data: session } = useSession()
  const currentDate = useFormattedDate()

  return (
    <div className='bg-gray-50 pb-4 h-screen flex'>
      <Sidebar />

      <div className='flex-1'>
        <HeaderDashboard
          name={session?.user?.name as string}
          IconComponent={Pen}
          currentDate={currentDate}
          title='Posts'
        />

        <section className='px-4 mb-4 flex-1 overflow-auto max-h-[100vh]'>
          <div className='flex flex-row justify-center p-8'>
            <Link
              className='bg-blue-800 font-bold text-md text-white px-8 py-4 rounded-xl hover:bg-blue-600 flex items-center gap-2'
              href='/dashboard/posts/new'
            >
              <Plus /> Novo Post
            </Link>
          </div>
          {loading ? (
            <div className='flex items-center justify-center h-full'>
              <p className='text-blue-800'>Sem notícias disponíveis...</p>
            </div>
          ) : (
            posts.map((item: NewsItem) => (
              <article
                key={item.id}
                className='flex p-4 border-b border-blue-800 items-center justify-between'
              >
                <Link href={`/news/${item.id}`} className='flex-1'>
                  <h2 className='text-blue-800 text-sx font-bold'>
                    {item.title}
                  </h2>
                  <p className='text-gray-800 font-medium text-sm'>
                    {item.content.length > 200
                      ? item.content.slice(0, 200).trimEnd() + '…'
                      : item.content}
                  </p>
                </Link>
                <div className='flex flex-row gap-2'>
                  <Link href={`/dashboard/posts/edit/${item.id}`}>
                    <Pen size={24} color='grey' />
                  </Link>
                  <button onClick={() => handleDeletePost(item.id)}>
                    <Trash size={24} color='red' />
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  )
}
