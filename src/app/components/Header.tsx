import Image from 'next/image'
import logo from '@/assets/images/bitwire.svg'
import Link from 'next/link'

export function Header() {
  return (
    <nav className='bg-gray-50'>
      <div className='max-w-screen-xl flex flex-row items-center justify-between mx-auto p-4'>
        <div className='flex flex-row gap-2 items-center'>
          <Image src={logo} alt='CyptoNews' className='w-8 h-8' />
          <h1 className='text-blue-800 font-bold text-xl'>CryptoNews</h1>
        </div>
        <ul className='flex flex-row items-center gap-2 font-medium bg-gray-50 md:bg-transparent'>
          <li>
            <Link href='/blog' className='text-blue-800 hover:text-blue-600'>
              Blog
            </Link>
          </li>
          <li>
            <Link href='/about' className='text-blue-800 hover:text-blue-600'>
              Sobre
            </Link>
          </li>
          <li>
            <Link
              href='https://t.me/crypto_newsbr'
              className='text-blue-800 hover:text-blue-600'
            >
              Grupo Vip
            </Link>
          </li>
          <li>
            <Link href='/privacy' className='text-blue-800 hover:text-blue-600'>
              Privacidade
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
