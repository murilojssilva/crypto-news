'use client'

import { Home, Pen } from 'lucide-react'
import HeaderDashboard from '@/app/components/Dashboard/Header'
import Sidebar from '@/app/components/Sidebar'
import { useSession } from 'next-auth/react'
import { useFormattedDate } from '@/hooks/useFormatted'

export default function Dashboard() {
  const { data: session } = useSession()
  const currentDate = useFormattedDate()
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

        <div className='p-4 mb-4'>
          <div className='flex flex-row gap-4 justify-center'>
            <div className='border border-gray-500 p-4 rounded-md flex flex-col gap-3 justify-around'>
              <div>
                <h3 className='text-gray-800 text-xl font-bold'>
                  Número de posts
                </h3>
              </div>
              <div className='flex flex-row justify-between'>
                <Pen color='black' />
                <span className='text-blue-800 font-bold text-3xl'>9</span>
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
        </div>
      </div>
    </div>
  )
}
