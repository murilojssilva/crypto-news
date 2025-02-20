'use client'

import Image from 'next/image'
import Footer from './components/Footer'
import { Header } from './components/Header'
import LatestNews from './components/LatestNews'
import blockchainImage from '@/assets/images/blockchain.png'
import Link from 'next/link'
import { Coin } from '@phosphor-icons/react'
import { Blocks, Newspaper } from 'lucide-react'

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen bg-white'>
      <div>
        <Header />
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
              Fique por dentro das últimas tendências do mundo cripto, análises
              de mercado e insights exclusivos.
            </p>
            <Link
              className='bg-blue-800 text-white py-3 w-full rounded-xl hover:bg-blue-600 transition-all duration-300 font-semibold text-center'
              href='/about'
            >
              Conheça mais
            </Link>
          </article>
        </section>
      </div>
      <LatestNews />
      <section className='flex flex-col md:flex-row bg-gray-100 justify-between p-8 gap-16'>
        <div className='flex flex-col items-center gap-4'>
          <Blocks size={64} color='#1565C0' />
          <h2 className='font-bold text-blue-800'>Análise de projetos</h2>
          <p className='text-gray-800 text-justify'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            reprehenderit unde quis dicta, libero debitis excepturi
            perspiciatis, quia, in fugiat ratione beatae officiis quod? Non
            assumenda commodi placeat voluptatem fuga.
          </p>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <Coin size={64} color='#1565C0' />
          <h2 className='font-bold text-blue-800'>
            Criptomoedas preferidas das baleias
          </h2>
          <p className='text-gray-800 text-justify'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            quibusdam earum, commodi officia, ex id officiis nemo eius repellat
            asperiores perferendis expedita hic possimus itaque quaerat eveniet
            molestiae ratione eum?
          </p>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <Newspaper size={64} color='#1565C0' />
          <h2 className='font-bold text-blue-800'>Notícias do mercado</h2>
          <p className='text-gray-800 text-justify'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto
            nesciunt ab voluptate soluta nemo, ipsum vero perspiciatis ullam eos
            non veniam quas mollitia nam officia vitae dignissimos repellat
            cupiditate ducimus.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  )
}
