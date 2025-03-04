'use client'

import { User } from 'lucide-react'
import Sidebar from '@/app/components/Sidebar'
import HeaderDashboard from '@/app/components/Dashboard/Header'
import { useSession } from 'next-auth/react'
import { useFormattedDate } from '@/hooks/useFormatted'

export default function Profile() {
  const { data: session } = useSession()
  const currentDate = useFormattedDate()
  return (
    <div className='bg-gray-50 pb-4 h-screen flex'>
      <Sidebar />
      <div className='flex-1'>
        <HeaderDashboard
          name={session?.user?.name as string}
          IconComponent={User}
          currentDate={currentDate}
          title='Perfil'
        />
        <h1>Perfil</h1>
      </div>
    </div>
  )
}
