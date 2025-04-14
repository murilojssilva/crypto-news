'use client'

import Image from 'next/image'
import logo from '@/assets/images/bitwire.svg'
import { Home, LogOutIcon, Newspaper, Pen, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useMenu } from '@/context/MenuContext'
import SidebarItem from './SidebarItem'

export default function Sidebar() {
  const { openMenu } = useMenu()
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const { data: session, status } = useSession()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  if (status === 'loading')
    return (
      <div
        className={`flex flex-col h-screen w-[10vh] border-r ${
          resolvedTheme === 'light'
            ? 'bg-gray-200 border-gray-300'
            : 'bg-gray-900 border-gray-500'
        }`}
      />
    )

  return (
    <div
      className={`flex flex-col gap-4 h-screen items-center py-6
        border-r
        ${openMenu ? 'w-[32vh]' : 'w-[10vh]'} sticky top-0
      ${
        resolvedTheme === 'light'
          ? 'bg-gray-200 border-gray-300'
          : 'bg-gray-900 border-gray-500'
      }
      `}
    >
      <div
        className={`flex flex-col justify-center items-center gap-4 pb-4 border-b
          ${resolvedTheme === 'light' ? 'border-gray-400' : 'border-gray-500'}
          ${openMenu ? 'w-[90%]' : 'w-[80%]'}
        `}
      >
        <Link
          className='flex flex-row gap-2 items-center'
          href='/'
          aria-label='CryptoNews'
        >
          <Image src={logo} alt='CryptoNews' className='w-8 h-8' />
          <span
            className={`font-bold text-md
              ${resolvedTheme === 'light' ? 'text-blue-800' : 'text-blue-400'}
              ${!openMenu && 'hidden'}`}
          >
            CryptoNews
          </span>
        </Link>
      </div>
      <div
        className={`flex-1 flex flex-col gap-2
        ${openMenu && 'self-start'}
        `}
      >
        <SidebarItem title='Dashboard' href='/dashboard' icon={Home} />
        {session?.user.role === 'costumer' && (
          <SidebarItem
            title='Notícias'
            href='/dashboard/news'
            icon={Newspaper}
          />
        )}
        {session?.user.role !== 'costumer' && (
          <SidebarItem title='Postagens' href='/dashboard/posts' icon={Pen} />
        )}
        <SidebarItem title='Perfil' href='/dashboard/profile' icon={User} />
      </div>

      <div
        className={`flex items-center gap-1
    ${openMenu ? 'w-[90%] justify-between' : 'w-[80%] justify-center'}
  `}
      >
        {openMenu && (
          <div className='flex flex-row items-center gap-3'>
            <span
              className={`font-medium p-2 rounded-full
          ${
            resolvedTheme === 'light'
              ? 'text-gray-300 bg-gray-600'
              : 'text-gray-200 bg-gray-600'
          }
        `}
            >
              MS
            </span>
            <div className='flex flex-col'>
              <span
                className={`block text-xs ${
                  resolvedTheme === 'light' ? 'text-gray-800' : 'text-gray-200'
                }`}
              >
                {String(session?.user.firstName)}
              </span>
              <span
                className={`block text-xs font-bold ${
                  resolvedTheme === 'light' ? 'text-gray-800' : 'text-gray-200'
                }`}
              >
                {String(session?.user.lastName)}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={`p-1 rounded
            ${
              resolvedTheme === 'light'
                ? 'hover:bg-gray-200'
                : 'hover:bg-gray-800'
            }
          `}
        >
          <LogOutIcon color='red' />
        </button>
      </div>
    </div>
  )
}
