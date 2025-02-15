import Link from 'next/link'
import Footer from '../components/Footer'
import { Header } from '../components/Header'

export default function News() {
  return (
    <div className='flex flex-col bg-gray-200'>
      <Header />
      <section className='p-8 bg-gray-200'>
        <div className='py-2'>
          <div className='pb-4'>
            <span className='text-xl items-center'>
              <Link className='text-blue-800' href='/'>
                Home
              </Link>{' '}
              <span className='text-gray-600'>→ </span>
              <Link className='text-blue-800' href='news'>
                Últimas Notícias
              </Link>{' '}
              <span className='text-gray-600'>→ Bitcoin em queda</span>
            </span>
          </div>
          <h1 className='text-gray-700 font-bold text-2xl'>Bitcoin em queda</h1>
          <h3 className='text-gray-500 font-light text-sm'>
            Maior queda dos últimos 30 meses
          </h3>
        </div>
        <article className='flex flex-col gap-4'>
          <p className='text-gray-800 font-medium text-md'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            dicta recusandae qui facere nostrum deleniti ea vitae facilis
            quibusdam modi omnis temporibus quae perferendis officia veritatis
            alias minus, ratione vel.
          </p>
          <p className='text-gray-800 font-medium text-md'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            dicta recusandae qui facere nostrum deleniti ea vitae facilis
            quibusdam modi omnis temporibus quae perferendis officia veritatis
            alias minus, ratione vel.
          </p>
          <p className='text-gray-800 font-medium text-md'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            dicta recusandae qui facere nostrum deleniti ea vitae facilis
            quibusdam modi omnis temporibus quae perferendis officia veritatis
            alias minus, ratione vel.
          </p>
          <p className='text-gray-800 font-medium text-md'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            dicta recusandae qui facere nostrum deleniti ea vitae facilis
            quibusdam modi omnis temporibus quae perferendis officia veritatis
            alias minus, ratione vel.
          </p>
          <p className='text-gray-800 font-medium text-md'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            dicta recusandae qui facere nostrum deleniti ea vitae facilis
            quibusdam modi omnis temporibus quae perferendis officia veritatis
            alias minus, ratione vel.
          </p>
          <p className='text-gray-800 font-medium text-md'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            dicta recusandae qui facere nostrum deleniti ea vitae facilis
            quibusdam modi omnis temporibus quae perferendis officia veritatis
            alias minus, ratione vel.
          </p>
          <p className='text-gray-800 font-medium text-md'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            dicta recusandae qui facere nostrum deleniti ea vitae facilis
            quibusdam modi omnis temporibus quae perferendis officia veritatis
            alias minus, ratione vel.
          </p>
        </article>
      </section>
      <Footer />
    </div>
  )
}
