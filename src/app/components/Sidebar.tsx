'use client'

import Image from 'next/image'
import logo from '@/assets/images/bitwire.svg'
import { Home, LogOutIcon, Newspaper, Pen, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useMenu } from '@/context/MenuContext'

export default function Sidebar() {
  const { openMenu } = useMenu()
  const pathname = usePathname()
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
        className={`flex flex-col h-screen w-[8vh] border-r ${
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
        ${openMenu ? 'w-[24vh]' : 'w-[8vh]'} sticky top-0
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
      <div className='flex-1 flex flex-col gap-2'>
        <Link
          href='/dashboard'
          className={`group flex items-center gap-3 px-3 py-2 outline-none
            ${!openMenu && 'justify-center'}
            `}
        >
          <Home
            className='h-5 w-5 flex-shrink-0'
            color={
              pathname === '/dashboard'
                ? '#1565C0'
                : resolvedTheme === 'light'
                ? 'black'
                : 'gray'
            }
          />
          <span
            className={`rounded-full
            ${
              pathname === '/dashboard'
                ? `${
                    resolvedTheme === 'light'
                      ? 'text-blue-800'
                      : 'text-blue-400'
                  } cursor-not-allowed font-bold`
                : resolvedTheme === 'light'
                ? 'text-gray-600'
                : 'text-gray-200'
            }
            ${!openMenu && 'hidden'}
          `}
          >
            Dashboard
          </span>
        </Link>
        {session?.user.role === 'costumer' && (
          <Link
            href='/dashboard/news'
            className={`group flex items-center gap-3 px-3 py-2 outline-none
              ${!openMenu && 'justify-center'}
              `}
          >
            <Newspaper
              className='h-5 w-5 flex-shrink-0'
              color={
                pathname === '/dashboard/news'
                  ? '#1565C0'
                  : resolvedTheme === 'light'
                  ? 'black'
                  : 'gray'
              }
            />
            <span
              className={`rounded-full
            ${
              pathname === '/dashboard/news'
                ? `${
                    resolvedTheme === 'light'
                      ? 'text-blue-800'
                      : 'text-blue-400'
                  } cursor-not-allowed font-bold`
                : resolvedTheme === 'light'
                ? 'text-gray-600'
                : 'text-gray-200'
            }
            ${!openMenu && 'hidden'}
            `}
            >
              Notícias
            </span>
          </Link>
        )}
        {session?.user.role !== 'costumer' && (
          <Link
            href='/dashboard/posts'
            className={`group flex items-center gap-3 px-3 py-2 outline-none
              ${!openMenu && 'justify-center'}
              `}
          >
            <Pen
              className='h-5 w-5 flex-shrink-0'
              color={
                pathname === '/dashboard/posts'
                  ? '#1565C0'
                  : resolvedTheme === 'light'
                  ? 'black'
                  : 'gray'
              }
            />
            <span
              className={`rounded-full
            ${
              pathname === '/dashboard/posts'
                ? `${
                    resolvedTheme === 'light'
                      ? 'text-blue-800'
                      : 'text-blue-400'
                  } cursor-not-allowed font-bold`
                : resolvedTheme === 'light'
                ? 'text-gray-600'
                : 'text-gray-200'
            }
            ${!openMenu && 'hidden'}`}
            >
              Posts
            </span>
          </Link>
        )}
        <Link
          href='/dashboard/profile'
          className={`group flex items-center gap-3 px-3 py-2 outline-none
            ${!openMenu && 'justify-center'}
            `}
        >
          <User
            className='h-5 w-5 flex-shrink-0'
            color={
              pathname === '/dashboard/profile'
                ? '#1565C0'
                : resolvedTheme === 'light'
                ? 'black'
                : 'gray'
            }
          />
          <span
            className={`rounded-full
            ${
              pathname === '/dashboard/profile'
                ? `${
                    resolvedTheme === 'light'
                      ? 'text-blue-800'
                      : 'text-blue-400'
                  } cursor-not-allowed font-bold`
                : resolvedTheme === 'light'
                ? 'text-gray-600'
                : 'text-gray-200'
            }
            ${!openMenu && 'hidden'}
          `}
          >
            Perfil
          </span>
        </Link>
      </div>

      <div
        className={`flex items-center justify-center mx-auto pt-8 px-2 border-t
          ${resolvedTheme === 'light' ? 'border-gray-400' : 'border-gray-500'}
          ${openMenu ? 'w-[90%]' : 'w-[80%]'}
        `}
      >
        {openMenu && (
          <div className='flex flex-col'>
            <span
              className={`block text-xs font-bold ${
                resolvedTheme === 'light' ? 'text-gray-800' : 'text-gray-200'
              }
              `}
            >
              {session?.user.firstName as string}{' '}
              {session?.user.lastName as string}
            </span>
            <span
              className={`block text-xs
              ${resolvedTheme === 'light' ? 'text-gray-800' : 'text-gray-200'}
            `}
            >
              {session?.user.email}
            </span>
          </div>
        )}
        <button onClick={handleLogout}>
          <LogOutIcon color='red' />
        </button>
      </div>
    </div>
  )
}
