'use client'

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

  const { posts } = usePosts()
  return (
    <div className='bg-gray-50 pb-4 h-screen flex'>
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
          <div className='grid grid-cols-2 gap-x-4 gap-y-8'>
            <div className='border border-gray-500 p-4 rounded-md flex flex-col gap-3 justify-around'>
              <div>
                <h3 className='text-gray-800 text-xl font-bold'>
                  Número de posts
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
                  Número de posts
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
                  Quantidade de likes
                </h3>
              </div>
              <div className='flex flex-row justify-between'>
                <Pen color='black' />
                <span className='text-blue-800 font-bold text-3xl'>4000</span>
              </div>
            </div>
            <div className='border border-gray-500 p-4 rounded-md flex flex-col gap-3 justify-around'>
              <div>
                <h3 className='text-gray-800 text-xl font-bold'>
                  Quantidade de likes
                </h3>
              </div>
              <div className='flex flex-row justify-between'>
                <Pen color='black' />
                <span className='text-blue-800 font-bold text-3xl'>4000</span>
              </div>
            </div>
            <div className='border border-gray-500 p-4 rounded-md flex flex-col gap-3 justify-around'>
              <div>
                <h3 className='text-gray-800 text-xl font-bold'>
                  Quantidade de likes
                </h3>
              </div>
              <div className='flex flex-row justify-between'>
                <Pen color='black' />
                <span className='text-blue-800 font-bold text-3xl'>4000</span>
              </div>
            </div>
            <div className='border border-gray-500 p-4 rounded-md flex flex-col gap-3 justify-around'>
              <div>
                <h3 className='text-gray-800 text-xl font-bold'>
                  Quantidade de likes
                </h3>
              </div>
              <div className='flex flex-row justify-between'>
                <Pen color='black' />
                <span className='text-blue-800 font-bold text-3xl'>4000</span>
              </div>
            </div>
            <div className='border border-gray-500 p-4 rounded-md flex flex-col gap-3 justify-around'>
              <div>
                <h3 className='text-gray-800 text-xl font-bold'>
                  Quantidade de likes
                </h3>
              </div>
              <div className='flex flex-row justify-between'>
                <Pen color='black' />
                <span className='text-blue-800 font-bold text-3xl'>4000</span>
              </div>
            </div>
            <div className='border border-gray-500 p-4 rounded-md flex flex-col gap-3 justify-around'>
              <div>
                <h3 className='text-gray-800 text-xl font-bold'>
                  Quantidade de likes
                </h3>
              </div>
              <div className='flex flex-row justify-between'>
                <Pen color='black' />
                <span className='text-blue-800 font-bold text-3xl'>4000</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
