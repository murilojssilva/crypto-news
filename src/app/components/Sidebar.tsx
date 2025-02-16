'use client'

import Image from 'next/image'
import logo from '@/assets/images/bitwire.svg'
import { Home, Pen, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div>
      <div className='overflow-y-scroll sticky top-4 h-[calc(100vh)] w-[calc(30vh)] bg-gray-200 items-center'>
        <div className='flex flex-row gap-2 items-center justify-center py-8'>
          <Image src={logo} alt='CryptoNews' className='w-8 h-8' />
          <h1 className='text-blue-800 font-bold text-xl'>CryptoNews</h1>
        </div>
        <div className='flex flex-col px-10 gap-2'>
          <Link href='/dashboard'>
            <button
              className={`flex flex-row items-center gap-3 text-sx p-2 rounded-xl ${
                pathname === '/dashboard'
                  ? 'text-gray-800 font-bold bg-gray-100 w-full'
                  : 'text-gray-600 bg-gray-200'
              }`}
            >
              <Home color={pathname === '/dashboard' ? 'blue' : 'black'} />
              Dashboard
            </button>
          </Link>
          <Link href='/posts'>
            <button
              className={`flex flex-row items-center gap-3 text-sx p-2 rounded-xl ${
                pathname === '/posts'
                  ? 'text-gray-800 font-bold bg-gray-100 w-full'
                  : 'text-gray-600 bg-gray-200'
              }`}
            >
              <Pen color={pathname === '/posts' ? 'blue' : 'black'} />
              Posts
            </button>
          </Link>
          <Link href='/profile'>
            <button
              className={`flex flex-row items-center gap-3 text-sx p-2 rounded-xl ${
                pathname === '/profile'
                  ? 'text-gray-800 font-bold bg-gray-100 w-full'
                  : 'text-gray-600 bg-gray-200'
              }`}
            >
              <User color={pathname === '/profile' ? 'blue' : 'black'} />
              Perfil
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
