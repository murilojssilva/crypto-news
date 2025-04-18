import Image from 'next/image'
import Link from 'next/link'
import blockchainImage from '@/assets/images/blockchain.png'

export default function Welcome() {
  return (
    <section className='w-full p-4 flex flex-col md:flex-row items-center justify-around max-w-screen-lg mx-auto sm:flex-1'>
      <div className='w-full md:w-1/2 flex justify-center'>
        <Image
          src={blockchainImage}
          alt='Blockchain'
          className='w-full max-w-xs md:max-w-md h-auto'
        />
      </div>

      <article className='w-full flex flex-col items-center justify-center text-center gap-6 p-6 md:w-1/2'>
        <h2 className='text-blue-600 text-2xl md:text-3xl font-extrabold leading-snug'>
          Bem-vindo à <span className='text-blue-800'>CryptoNews</span>
        </h2>
        <p className='text-lg text-gray-700 leading-relaxed'>
          Fique por dentro das últimas tendências do mundo cripto, análises de
          mercado e insights exclusivos.
        </p>
        <Link
          className='bg-blue-800 text-white py-3 w-full rounded-xl hover:bg-blue-600 transition-all duration-300 font-semibold text-center'
          href='/about'
        >
          Conheça mais
        </Link>
      </article>
    </section>
  )
}
