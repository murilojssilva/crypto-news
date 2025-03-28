'use client'

import { CategoryProps } from '@/app/interfaces/CategoryInterface'
import { NewsItem } from '@/app/interfaces/PostInterface'
import { usePosts } from '@/context/PostContext'
import { getCategoryById } from '@/lib/categories/[id]'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Bookmark, Calendar, Loader2, Pen } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function News() {
  const { posts, loading } = usePosts()

  const [postCategories, setPostCategories] = useState<
    Record<string, CategoryProps[]>
  >({})

  useEffect(() => {
    async function fetchCategories(postId: string) {
      try {
        const categoriesData = await getCategoryById(postId)
        setPostCategories((prev) => ({
          ...prev,
          [postId]: categoriesData,
        }))
      } catch (error) {
        console.error('Erro ao carregar categorias:', error)
      }
    }

    posts.forEach((post) => {
      if (!postCategories[post.id]) {
        fetchCategories(post.id as string)
      }
    })
  }, [posts, postCategories])

  return (
    <main className='flex flex-col flex-1 justify-between'>
      <div className='flex flex-row justify-between p-8'>
        <h1 className='text-blue-800 font-bold text-2xl'>Últimas notícias</h1>
      </div>
      <section className='p-4 bg-gray-200 flex flex-col justify-between'>
        {loading ? (
          <div className='grid h-full place-items-center text-blue-800'>
            <Loader2 className='animate-spin' />
          </div>
        ) : (
          posts
            .filter((item) => item.published)
            .map((item: NewsItem) => {
              const postCategoriesList = postCategories[item.id] || []
              return (
                <Link
                  key={item.id}
                  className='flex p-4 justify-between hover:bg-gray-300 hover:rounded-xl'
                  href={`/news/${item.id}`}
                >
                  <div className='flex flex-col'>
                    <h2 className='text-blue-800 text-lg font-bold'>
                      {item.title}
                    </h2>

                    <h4 className='text-gray-800 text-xs'>{item.subtitle}</h4>

                    <div className='text-gray-800 font-medium text-sm mt-2 line-clamp-3'>
                      <ReactMarkdown>
                        {item.content.length > 200
                          ? item.content.slice(0, 200).trimEnd() + '…'
                          : item.content}
                      </ReactMarkdown>
                    </div>

                    <div className='flex flex-row justify-between gap-4'>
                      <div className='flex flex-row gap-4'>
                        {postCategoriesList.length > 0 &&
                          postCategoriesList.map((category, index) => (
                            <span
                              key={index}
                              className='text-blue-800 font-bold text-xs border border-blue-800 hover:bg-blue-800 hover:text-gray-100 p-2 rounded-xl'
                            >
                              {category.name}
                            </span>
                          ))}
                      </div>
                      <div className='flex flex-row gap-4'>
                        <span className='text-blue-800 md:text-md text-xs justity-center font-bold flex flex-row items-center gap-1'>
                          <Calendar size={14} color='#1e40af' />
                          {format(
                            new Date(item.createdAt),
                            "dd/MM/yyyy 'às' HH:mm",
                            {
                              locale: ptBR,
                            }
                          )}
                        </span>
                        <span className='text-blue-800 md:text-md text-xs justity-center font-bold flex flex-row items-center gap-1'>
                          <Pen size={14} color='#1e40af' />
                          {format(
                            new Date(item.updatedAt),
                            "dd/MM/yyyy 'às' HH:mm",
                            {
                              locale: ptBR,
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Bookmark fill='#1e40af' color='#1e40af' />
                </Link>
              )
            })
        )}
      </section>
      <div className='flex flex-row justify-end gap-3 p-8'>
        <button className='px-4 py-2 rounded-xl text-gray-100 bg-blue-800 hover:bg-blue-600'>
          1
        </button>
        <button className='px-4 py-2 rounded-xl text-gray-600 bg-gray-300 hover:bg-gray-400'>
          2
        </button>
        <button className='px-4 py-2 rounded-xl text-gray-600 bg-gray-300 hover:bg-gray-400'>
          3
        </button>
        <button className='px-4 py-2 rounded-xl text-gray-600 bg-gray-300 hover:bg-gray-400'>
          4
        </button>
      </div>
    </main>
  )
}
