'use client'

import { ToastContainer } from 'react-toastify'

interface BasicLayoutProps {
  children: React.ReactNode
}

export default function BasicDashboardLayout({ children }: BasicLayoutProps) {
  return (
    <div className='bg-gray-50 h-screen'>
      <div>{children}</div>
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
