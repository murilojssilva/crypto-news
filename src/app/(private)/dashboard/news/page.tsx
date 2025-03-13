'use client'

import ReactMarkdown from 'react-markdown'
import {
  Calendar,
  BookmarkPlus,
  BookmarkMinus,
  Filter,
  Newspaper,
} from 'lucide-react'
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
import { useState } from 'react'

export default function DashboardNews() {
  const { posts, loading } = usePosts()
  const { data: session } = useSession()
  const currentDate = useFormattedDate()
  const [isFavorited, setIsFavorited] = useState(false)

  async function handleFavoriteNews(id: string) {
    setIsFavorited(!isFavorited)
    console.log(id)
  }

  const skeletons = Array(3).fill('')
  return (
    <div className='bg-gray-50 pb-4 h-screen flex'>
      <Sidebar />

      <div className='flex-1 overflow-auto'>
        <HeaderDashboard
          firstName={session?.user?.firstName as string}
          IconComponent={Newspaper}
          currentDate={currentDate}
          title='Notícias'
        />

        <section className='px-6 pt-6 md:max-h-screen flex flex-col gap-4 overflow-y-auto'>
          <div className='flex flex-row justify-between items-center'>
            <Title title='Últimas notícias' />
            <span className='p-2 rounded-xl cursor-pointer text-blue-800 hover:bg-blue-800 hover:text-gray-50'>
              <Filter size={20} />
            </span>
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
          ) : posts ? (
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
                  className='flex p-4 items-start justify-between hover:bg-gray-100 hover:rounded-xl'
                >
                  <Link
                    href={`/news/${item.id}`}
                    className='flex-1 flex flex-col gap-4'
                  >
                    <div>
                      <Title title={item.title} />
                      <span className='text-gray-500 text-sm md:text-ms font-normal'>
                        {item.subtitle}
                      </span>
                    </div>

                    <div className='text-gray-800 text-md'>
                      <ReactMarkdown>
                        {item.content.length > 185
                          ? item.content.slice(0, 185).trimEnd() + '…'
                          : item.content}
                      </ReactMarkdown>
                    </div>

                    <div className='flex flex-row justify-start gap-4'>
                      <span className='text-blue-800 font-bold text-xs border border-blue-800 hover:bg-blue-800 hover:text-gray-100 p-2 rounded-xl'>
                        Negócios
                      </span>
                      <span className='text-blue-800 text-md font-bold flex flex-row items-center gap-1'>
                        <Calendar size={14} color='#1e40af' />
                        {format(
                          new Date(item.createdAt),
                          "dd/MM/yyyy 'às' HH:mm",
                          {
                            locale: ptBR,
                          }
                        )}
                      </span>
                    </div>
                  </Link>
                  <div className='flex flex-row gap-2 '>
                    {item.userId === session?.user.id && (
                      <button
                        className={`rounded-xl p-2
                          ${
                            isFavorited
                              ? 'hover:bg-blue-200 text-blue-800 hover:text-blue-800'
                              : 'hover:bg-red-200 text-red-500 hover:text-red-500'
                          }
                          
                          `}
                        onClick={() => handleFavoriteNews(item.id)}
                      >
                        {isFavorited ? (
                          <BookmarkPlus size={24} />
                        ) : (
                          <BookmarkMinus />
                        )}
                      </button>
                    )}
                  </div>
                </article>
              ))
          ) : (
            <div>
              <p className='text-blue-800'>Não há postagens</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
