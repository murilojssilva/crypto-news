import Image from 'next/image'
import logo from '@/assets/images/bitwire.svg'
import Link from 'next/link'

export function Header() {
  return (
    <nav className='bg-gray-50'>
      <div className='max-w-screen-xl flex flex-row items-center justify-between mx-auto p-4'>
        <Link className='flex flex-row gap-2 items-center' href='/'>
          <Image src={logo} alt='CyptoNews' className='w-8 h-8' />
          <h1 className='text-blue-800 font-bold text-xl'>CryptoNews</h1>
        </Link>

        <ul className='flex flex-row items-center gap-2 font-medium bg-gray-50 md:bg-transparent'>
          <Link href='/news' className='text-blue-800 hover:text-blue-600'>
            <li className='hover:bg-gray-200 rounded-md p-2 bg-gray-50'>
              Notícias
            </li>
          </Link>
          <Link href='/about' className='text-blue-800 hover:text-blue-600'>
            <li className='hover:bg-gray-200 rounded-md p-2 bg-gray-50'>
              Sobre
            </li>
          </Link>
          <Link
            href='https://t.me/crypto_newsbr'
            className='text-blue-800 hover:text-blue-600'
          >
            <li className='hover:bg-gray-200 rounded-md p-2 bg-gray-50'>
              Grupo Vip
            </li>
          </Link>
          <Link href='/privacy' className='text-blue-800 hover:text-blue-600'>
            <li className='hover:bg-gray-200 rounded-md p-2 bg-gray-50'>
              Privacidade
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  )
}
