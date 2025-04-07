'use client'

import ReactMarkdown from 'react-markdown'
import { Calendar, Pen, Plus, Trash } from 'lucide-react'
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
import { getCategoryById } from '@/lib/categories/[id]'
import { useEffect, useState } from 'react'
import { CategoryProps } from '@/app/interfaces/CategoryInterface'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import SyntaxHighlighter from 'react-syntax-highlighter'

export default function Posts() {
  const { posts, loading, handleDeletePost } = usePosts()
  const { data: session } = useSession()

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

  const currentDate = useFormattedDate()

  const skeletons = Array(3).fill('')

  return (
    <main className='bg-gray-50 pb-4 h-screen flex'>
      <title>Postagens | CryptoNews</title>
      <Sidebar />

      <div className='flex-1 overflow-auto'>
        <HeaderDashboard
          firstName={session?.user?.firstName as string}
          IconComponent={Pen}
          currentDate={currentDate}
          title='Posts'
        />

        <section className='px-6 pt-6 md:max-h-screen flex flex-col gap-4 overflow-y-auto'>
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
              <Plus size={20} fontWeight={'bold'} />{' '}
              <span className='hidden md:block'>Novo Post</span>
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
          ) : posts ? (
            posts
              .filter((item: NewsItem) => {
                if (session?.user.role === 'editor') {
                  return item.userId === session?.user.id
                }
                return true
              })
              .map((item: NewsItem) => {
                const postCategoriesList = postCategories[item.id] || [] // Pega as categorias do post específico
                return (
                  <article
                    key={item.id}
                    className='flex p-4 items-start justify-between hover:bg-gray-100 hover:rounded-xl'
                  >
                    <Link
                      href={`/news/${item.id}`}
                      className='flex-1 flex flex-col gap-4'
                    >
                      <div>
                        <h2 className='text-blue-800 font-semibold text-xl'>
                          {item.title}
                        </h2>
                        <span className='text-gray-500 text-sm md:text-ms font-normal'>
                          {item.subtitle}
                        </span>
                      </div>

                      <div className='text-gray-800 text-md'>
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]}
                          components={{
                            code({ className, children }) {
                              const match = /language-(\w+)/.exec(
                                className || ''
                              )
                              const codeText = String(children).trim()

                              return (
                                <div className='relative group my-4'>
                                  <button
                                    className='absolute right-2 top-2 text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity'
                                    onClick={() =>
                                      navigator.clipboard.writeText(codeText)
                                    }
                                  >
                                    Copiar
                                  </button>

                                  <SyntaxHighlighter
                                    language={match?.[1] || 'javascript'}
                                    PreTag='div'
                                    customStyle={{
                                      padding: '1rem',
                                      borderRadius: '0.5rem',
                                      fontSize: '0.875rem',
                                      overflowX: 'auto',
                                    }}
                                  >
                                    {codeText}
                                  </SyntaxHighlighter>
                                </div>
                              )
                            },
                          }}
                        >
                          {item.content.length > 185
                            ? item.content.slice(0, 185).trimEnd() + '…'
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
                    </Link>
                    <div className='flex flex-row gap-2'>
                      {item.userId === session?.user.id && (
                        <Link
                          className='hover:bg-blue-800 text-blue-800 hover:text-gray-200 rounded-xl p-2'
                          href={`/dashboard/posts/edit/${item.id}`}
                        >
                          <Pen size={24} />
                        </Link>
                      )}

                      {item.userId === session?.user.id && (
                        <button
                          className='hover:bg-red-500 text-red-500 hover:text-gray-200 rounded-xl p-2'
                          onClick={() => handleDeletePost(item.id)}
                        >
                          <Trash size={24} />
                        </button>
                      )}
                    </div>
                  </article>
                )
              })
          ) : (
            <div>
              <p className='text-blue-800'>Não há postagens</p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
