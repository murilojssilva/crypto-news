'use client'

import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import NotFound from '@/assets/images/not_found.jpg'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getUserById } from '@/lib/users/[id]'
import { usePosts } from '@/context/PostContext'
import { NewsItemProps } from '@/app/interfaces/PostInterface'
import { Title } from '@/app/components/Dashboard/Title'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'
import { AlertTriangle } from 'lucide-react'

interface UserItem {
  id: string
  firstName: string
  lastName: string
}

export default function NewsPage() {
  const { fetchPostById, loading, setLoading } = usePosts()
  const [post, setPost] = useState<NewsItemProps | null>(null)
  const [user, setUser] = useState<UserItem>({} as UserItem)

  const { id } = useParams()

  useEffect(() => {
    async function loadPost() {
      if (!id) return
      const response = await fetchPostById(id as string)
      if (response !== null) {
        setPost(response as NewsItemProps)
      }
    }
    loadPost()
  }, [id])

  useEffect(() => {
    if (post?.userId) {
      const fetchUser = async () => {
        try {
          setLoading(true)
          const data = await getUserById(post.userId)
          setUser(data)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }

      fetchUser()
    }
  }, [post, setLoading])

  return (
    <main className='flex flex-col flex-1'>
      <title>Notícia | CryptoNews</title>
      {loading ? (
        <section className='p-4 items-center justify-center gap-4'>
          <Skeleton
            baseColor='#e0e0e0'
            highlightColor='#bdbdbd'
            className='flex items-center justify-center h-[10vh]'
          />
          <Skeleton
            baseColor='#e0e0e0'
            highlightColor='#bdbdbd'
            className='flex items-center justify-center my-8 h-[35vh]'
          />
        </section>
      ) : post ? (
        <section className='px-4 bg-gray-200'>
          <article className='p-8'>
            <div className='flex flex-col gap-8'>
              <div>
                <Title title={post.title} />
                <h3 className='text-gray-800 font-light text-md'>
                  {post.subtitle}
                </h3>
                <div className='flex flex-row'>
                  <div className='flex flex-row flex-wrap text-gray-500 font-light text-sm'>
                    {Object.keys(user).length > 0 && (
                      <>
                        <span>
                          {format(
                            new Date(post.createdAt),
                            "dd/MM/yyyy 'às' HH:mm",
                            {
                              locale: ptBR,
                            }
                          )}
                          , por {user.firstName} {user.lastName}
                        </span>

                        {post.createdAt !== post.updatedAt && (
                          <span className='ml-1'>
                            . Editado em{' '}
                            {format(
                              new Date(post.updatedAt),
                              "dd/MM/yyyy 'às' HH:mm",
                              {
                                locale: ptBR,
                              }
                            )}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex flex-row items-start'>
                <Image
                  src={NotFound}
                  alt='Not found Image'
                  className='mx-auto h-[40vh] w-[60vw] md:h-[60vh] md:w-[60vw] rounded-xl'
                />
              </div>
              <div
                className='text-gray-800 font-medium text-md text-justify'
                style={{ whiteSpace: 'pre-wrap', lineHeight: 1.75 }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    code({ className, children }) {
                      const match = /language-(\w+)/.exec(className || '')
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
                            style={oneDark}
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
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </article>
        </section>
      ) : !loading && !post ? (
        <div className='flex flex-col items-center justify-center gap-4 flex-1'>
          <AlertTriangle color='red' size={64} />
          <p className='text-gray-800 text-2xl font-bold text-justify'>
            Reportagem não encontrada
          </p>
        </div>
      ) : null}
    </main>
  )
}
