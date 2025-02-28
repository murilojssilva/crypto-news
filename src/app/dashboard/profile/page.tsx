'use client'

import HeaderDashboard from '@/app/components/Dashboard/Header'
import Sidebar from '@/app/components/Sidebar'
import { useFormattedDate } from '@/hooks/useFormatted'
import { User } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function Profile() {
  const { data: session } = useSession()

  const currentDate = useFormattedDate()
  return (
    <div className='bg-gray-50 pb-4 h-screen flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <HeaderDashboard
          name={session?.user?.name as string}
          IconComponent={User}
          currentDate={currentDate}
          title='Perfil'
        />
      </div>
    </div>
  )
}
