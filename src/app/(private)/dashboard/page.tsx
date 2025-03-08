'use client'

import 'react-toastify/dist/ReactToastify.css'
import Skeleton from 'react-loading-skeleton'

import { Home, Pen, DollarSign, Newspaper, Crown } from 'lucide-react'
import HeaderDashboard from '@/app/components/Dashboard/Header'
import Sidebar from '@/app/components/Sidebar'
import { useSession } from 'next-auth/react'
import { useFormattedDate } from '@/hooks/useFormatted'
import { usePosts } from '@/context/PostContext'
import { Title } from '@/app/components/Dashboard/Title'
import { useUsers } from '@/context/UserContext'
import { Card } from '@/app/components/Dashboard/Card'

export default function Dashboard() {
  const { data: session } = useSession()
  const currentDate = useFormattedDate()
  const skeletons = Array(8).fill('')

  const { posts, loading } = usePosts()
  const { users } = useUsers()
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
          {loading ? (
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
              {session?.user.role === 'admin' && (
                <Card
                  text='Total de usuários'
                  value={users.length}
                  icon={<Crown color='black' />}
                />
              )}
              {session?.user.role === 'admin' && (
                <Card
                  text='Total de clientes'
                  value={
                    users.filter((item) => item.role === 'costumer').length
                  }
                  icon={<DollarSign color='black' />}
                />
              )}

              {session?.user.role === 'admin' && (
                <Card
                  text='Total de editores'
                  value={users.filter((item) => item.role === 'editor').length}
                  icon={<Pen color='black' />}
                />
              )}

              {session?.user.role !== 'costumer' && (
                <Card
                  text='Total de posts'
                  value={posts.length}
                  icon={<Newspaper color='black' />}
                />
              )}

              {session?.user.role !== 'costumer' && (
                <Card
                  text='Meus posts'
                  value={
                    posts.filter((item) => item.userId === session?.user.id)
                      .length
                  }
                  icon={<Newspaper color='black' />}
                />
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
