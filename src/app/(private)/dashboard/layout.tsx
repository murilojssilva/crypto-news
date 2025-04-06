'use client'

import { useTheme } from 'next-themes'
import { ToastContainer } from 'react-toastify'

interface BasicLayoutProps {
  children: React.ReactNode
}

export default function BasicDashboardLayout({ children }: BasicLayoutProps) {
  const { resolvedTheme } = useTheme()
  return (
    <div
      className={`h-screen
    ${resolvedTheme === 'light' ? 'bg-gray-200' : 'bg-gray-800'}`}
    >
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
