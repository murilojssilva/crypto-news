'use client'

import ReactMarkdown from 'react-markdown'
import { Pen, Plus, Trash } from 'lucide-react'
import Link from 'next/link'
import { usePosts } from '@/context/PostContext'
import { NewsItem } from '@/app/interfaces/PostInterface'
import { useSession } from 'next-auth/react'
import { useFormattedDate } from '@/hooks/useFormatted'
import Sidebar from '@/app/components/Sidebar'
import HeaderDashboard from '@/app/components/Dashboard/Header'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Title } from '@/app/components/Dashboard/Title'

export default function Posts() {
  const { posts, loading, handleDeletePost } = usePosts()
  const { data: session } = useSession()
  const currentDate = useFormattedDate()

  const skeletons = Array(3).fill('')
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

        <section className='px-6 pt-6 md:max-h-screen max-h-[calc(100vh-8rem)] flex flex-col gap-4 overflow-y-auto'>
          <div className='flex flex-row justify-between items-center'>
            <Title
              title={
                session?.user.role === 'editor'
                  ? 'Minhas postagens'
                  : session?.user.role === 'admin'
                  ? 'Todas as postagens'
                  : ''
              }
            />
            <Link
              href='/dashboard/posts/new'
              className='text-gray-100 p-2 text-sm whitespace-nowrap flex flex-row items-center gap-2 bg-blue-800 hover:bg-blue-600 rounded-xl'
            >
              <Plus size={20} /> Novo Post
            </Link>
          </div>
          {loading ? (
            <div className='flex items-center justify-center h-full flex-col'>
              {skeletons.map((_, index) => (
                <div
                  key={index}
                  className='flex p-16 w-full bg-gray-200 items-start justify-between my-2 rounded-xl '
                />
              ))}
            </div>
          ) : (
            posts
              .filter((item: NewsItem) => {
                if (session?.user.role === 'editor') {
                  return item.userId === session?.user.id
                }
                return true
              })
              .map((item: NewsItem) => (
                <article
                  key={item.id}
                  className='flex p-4 bg-gray-200 items-start justify-between gap-4 rounded-xl'
                >
                  <Link
                    href={`/news/${item.id}`}
                    className='flex-1 flex flex-col'
                  >
                    <Title title={item.title} />
                    <span className='text-gray-500 text-xs md:text-ms font-normal'>
                      {item.subtitle}
                    </span>
                    <span className='text-blue-800 text-xs md:text-sx font-bold'>
                      {format(
                        new Date(item.createdAt),
                        "dd/MM/yyyy 'às' HH:mm",
                        {
                          locale: ptBR,
                        }
                      )}
                    </span>
                    <div className='text-gray-800 font-medium text-sm md:text-md'>
                      <ReactMarkdown>
                        {item.content.length > 185
                          ? item.content.slice(0, 185).trimEnd() + '…'
                          : item.content}
                      </ReactMarkdown>
                    </div>
                  </Link>
                  <div className='flex flex-row gap-2 '>
                    {item.userId === session?.user.id && (
                      <Link href={`/dashboard/posts/edit/${item.id}`}>
                        <Pen size={24} color='#1565C0' />
                      </Link>
                    )}

                    {item.userId === session?.user.id && (
                      <button onClick={() => handleDeletePost(item.id)}>
                        <Trash size={24} color='red' />
                      </button>
                    )}
                  </div>
                </article>
              ))
          )}
        </section>
      </div>
    </div>
  )
}
