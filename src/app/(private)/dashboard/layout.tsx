'use client'

import { ToastContainer } from 'react-toastify'
import { useFormattedDate } from '@/hooks/useFormatted'
import { useSession } from 'next-auth/react'
import Sidebar from '@/app/components/Sidebar'
import HeaderDashboard from '@/app/components/Dashboard/Header'
import { Home } from 'lucide-react'

interface RootLayoutProps {
  children: React.ReactNode
  title: string
  IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>> // Tipo adequado para ícones SVG
}

export default function RootLayout({
  children,
  title,
  IconComponent = Home,
}: RootLayoutProps) {
  const { data: session } = useSession()
  const currentDate = useFormattedDate()

  return (
    <div className='bg-gray-50 pb-4 h-screen flex'>
      <Sidebar />
      <div className='flex-1'>
        <HeaderDashboard
          name={session?.user?.name as string}
          IconComponent={IconComponent}
          currentDate={currentDate}
          title={title}
        />
        {children}
      </div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}
