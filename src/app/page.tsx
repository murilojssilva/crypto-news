'use client'

import Image from 'next/image'
import Footer from './components/Footer'
import { Header } from './components/Header'
import LatestNews from './components/LatestNews'
import blockchainImage from '@/assets/images/blockchain.avif'
import Link from 'next/link'
import { Coin } from '@phosphor-icons/react'
import { Blocks, Newspaper } from 'lucide-react'

export default function Home() {
  return (
    <div className='flex flex-col h-screen bg-white'>
      <Header />
      <div className='w-full p-4 flex flex-col md:flex-row items-center justify-between gap-32 max-w-screen-lg mx-auto'>
        <div className='w-full md:w-1/2 flex justify-center'>
          <Image
            src={blockchainImage}
            alt='Blockchain'
            className='w-full max-w-xs md:max-w-md h-auto'
          />
        </div>

        <article className='w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left justify-center gap-4'>
          <h2 className='text-blue-800 text-xl md:text-2xl font-bold'>
            Bem-vindo à CryptoNews
          </h2>
          <p className='text-base text-gray-800 text-justify'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
            obcaecati est deserunt dolores.
          </p>
          <Link
            className='bg-blue-800 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition'
            href='/about'
          >
            Conheça mais
          </Link>
        </article>
      </div>
      <LatestNews />
      <section className='bg-gray-100 flex flex-row justify-between p-8 gap-16'>
        <div className='flex flex-col items-center gap-4'>
          <Blocks size={64} color='blue' />
          <h2 className='font-bold text-blue-800'>Análise de projetos</h2>
          <p className='text-gray-800 text-justify'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            reprehenderit unde quis dicta, libero debitis excepturi
            perspiciatis, quia, in fugiat ratione beatae officiis quod? Non
            assumenda commodi placeat voluptatem fuga.
          </p>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <Coin size={64} color='blue' />
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
          <Newspaper size={64} color='blue' />
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
