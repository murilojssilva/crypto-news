import Link from 'next/link'
import Footer from '../components/Footer'
import { Header } from '../components/Header'

interface NewsItem {
  id: string
  title: string
  content: string
}

export default async function News() {
  const response = await fetch(
    'https://crypto-news-server-d982fcfac1fc.herokuapp.com/posts',
    {
      cache: 'no-store',
    }
  )

  const data = await response.json()

  const news = data.posts || []

  return (
    <div className='flex flex-col bg-gray-200'>
      <Header />

      <div className='flex flex-row justify-between p-8'>
        <h1 className='text-blue-800 font-bold text-2xl'>Últimas notícias</h1>
      </div>
      <section className='px-4 bg-gray-200'>
        {news.length === 0 ? (
          <div className='flex items-center justify-center h-[42vh]'>
            <p className='text-blue-800'>Sem notícias disponíveis...</p>
          </div>
        ) : (
          news.map((item: NewsItem) => (
            <article
              key={item.id}
              className='flex p-4 border-b border-blue-800'
            >
              <Link href={`/news/${item.id}`}>
                <h2 className='text-blue-800 text-sx font-bold text-justify'>
                  {item.title}
                </h2>
                <p className='text-gray-800 font-medium text-sm'>
                  {item.content.length > 200
                    ? item.content.slice(0, 200).trimEnd() + '…'
                    : item.content}
                </p>
              </Link>
            </article>
          ))
        )}
      </section>
      <Footer />
    </div>
  )
}
