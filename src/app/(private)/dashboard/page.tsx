'use client'

import { Home, Pen } from 'lucide-react'
import RootLayout from './layout'

export default function Dashboard() {
  return (
    <RootLayout title='Dashboard' IconComponent={Home}>
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
    </RootLayout>
  )
}
