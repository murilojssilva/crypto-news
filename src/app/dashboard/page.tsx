'use client'

import { Home, Pen } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const date = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }
    let formattedDate = date.toLocaleDateString('pt-BR', options)
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    setCurrentDate(formattedDate)
  }, [])

  return (
    <div className='bg-gray-50 pb-4 h-screen flex'>
      <Sidebar />
      <div className='flex-1 '>
        <div className='p-4 mt-2 border-b border-gray-300'>
          <div className='flex items-center justify-between w-full'>
            <div>
              <h1 className='text-blue-800 font-bold'>Olá, User</h1>
              <span className='text-gray-800'>{currentDate}</span>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <Home color='#1565C0' />
              <span className='font-bold text-gray-800'>Dashboard</span>
            </div>
          </div>
        </div>
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
                <span className='text-blue-800 font-bold text-3xl'>3</span>
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
