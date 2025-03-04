'use client'

import Image from 'next/image'
import logo from '@/assets/images/bitwire.svg'
import { ToastContainer } from 'react-toastify'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex flex-col h-screen'>
      <div className='grid grid-rows-[10vh_90vh] h-screen bg-gray-50 sm:grid-rows-[10vh_90vh] md:grid-cols-2 md:grid-rows-1 md:h-screen'>
        <div className='bg-blue-800 flex items-center justify-center'>
          <Image
            src={logo}
            alt='BitWire'
            className='w-12 h-12 md:h-80 md:w-80'
          />
        </div>
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
