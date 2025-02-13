import Link from 'next/link'

export function Header() {
  return (
    <nav className='bg-gray-50'>
      <div className='max-w-screen-xl flex flex-col items-center justify-between mx-auto p-4'>
        <ul className='flex flex-row md:flex-row md:space-x-4 font-medium mt-4 md:mt-0 rounded-lg bg-gray-50 md:bg-transparent'>
          <li className='text-gray-800'>
            <Link href='/blog'>Blog</Link>
          </li>
          <li className='text-gray-800'>
            <Link href='/about'>Sobre</Link>
          </li>
          <li className='text-gray-800'>
            <Link href='/telegram'>Grupo Vip</Link>
          </li>
          <li className='text-gray-800'>
            <Link href='/privacy'>Privacidade</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
