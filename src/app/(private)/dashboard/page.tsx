'use client'

import 'react-toastify/dist/ReactToastify.css'
import Skeleton from 'react-loading-skeleton'

import { Home, Pen } from 'lucide-react'
import HeaderDashboard from '@/app/components/Dashboard/Header'
import Sidebar from '@/app/components/Sidebar'
import { useSession } from 'next-auth/react'
import { useFormattedDate } from '@/hooks/useFormatted'
import { usePosts } from '@/context/PostContext'
import { Title } from '@/app/components/Dashboard/Title'

export default function Dashboard() {
  const { data: session } = useSession()
  const currentDate = useFormattedDate()
  const skeletons = Array(8).fill('')

  const { posts, loading } = usePosts()
  return (
    <div className='flex bg-gray-50 pb-4 h-screen '>
      <Sidebar />

      <div className='flex-1'>
        <HeaderDashboard
          name={session?.user?.name as string}
          IconComponent={Home}
          currentDate={currentDate}
          title='Dashboard'
        />
        <section className='p-6 grid gap-4'>
          <Title title='Dashboard' />
          {!loading ? (
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {skeletons.map((_, index) => (
                <div
                  key={index}
                  className='border border-gray-500 p-4 rounded-md flex flex-col gap-3 justify-around h-[12vh]'
                >
                  <Skeleton
                    key={index}
                    baseColor='#e0e0e0'
                    highlightColor='#bdbdbd'
                    className='flex items-center justify-center h-[8vh]'
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className='grid grid-cols-2 xl:grid-cols-4 md:grid-cols-3 gap-x-4 gap-y-8'>
              <div className='border border-gray-500 p-4 rounded-md flex flex-col gap-3 justify-around'>
                <div>
                  <h3 className='text-gray-800 text-xl font-bold'>
                    Total de posts
                  </h3>
                </div>
                <div className='flex flex-row justify-between'>
                  <Pen color='black' />
                  <span className='text-blue-800 font-bold text-3xl'>
                    {posts.length}
                  </span>
                </div>
              </div>

              <div className='border border-gray-500 p-4 rounded-md flex flex-col gap-3 justify-around'>
                <div>
                  <h3 className='text-gray-800 text-xl font-bold'>
                    Meus posts
                  </h3>
                </div>
                <div className='flex flex-row justify-between'>
                  <Pen color='black' />
                  <span className='text-blue-800 font-bold text-3xl'>
                    {
                      posts.filter(
                        (item) => item.writtenBy === session?.user.id
                      ).length
                    }
                  </span>
                </div>
              </div>
              <div className='border border-gray-500 p-4 rounded-md flex flex-col gap-3 justify-around'>
                <div>
                  <h3 className='text-gray-800 text-xl font-bold'>
                    Outros posts
                  </h3>
                </div>
                <div className='flex flex-row justify-between'>
                  <Pen color='black' />
                  <span className='text-blue-800 font-bold text-3xl'>
                    {
                      posts.filter(
                        (item) => item.writtenBy !== session?.user.id
                      ).length
                    }
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
