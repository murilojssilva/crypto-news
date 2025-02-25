'use client'

import { Home, Pen } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react'
import HeaderDashboard from '../components/Dashboard/Header'

interface NewsItem {
  id: string
  title: string
  content: string
}

export default function Dashboard() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://crypto-news-server-d982fcfac1fc.herokuapp.com/posts'
        )
        const data = await response.json()
        setNews(data.posts || [])
      } catch (error) {
        console.error('Erro ao buscar notícias:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  useEffect(() => {
    const date = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }
    let formattedDate = date.toLocaleDateString('pt-BR', options)
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    setCurrentDate(formattedDate)
  }, [])

  return (
    <div className='bg-gray-50 pb-4 h-screen flex'>
      <Sidebar />
      <div className='flex-1'>
        <HeaderDashboard
          name='Dashboard'
          IconComponent={Home}
          currentDate={currentDate}
          title='Dashboard'
        />
        <div className='p-4 mb-4'>
          <div className='flex flex-row gap-4 justify-center'>
            <div className='border border-gray-500 p-4 rounded-md flex flex-col gap-3 justify-around'>
              <div>
                <h3 className='text-gray-800 text-xl font-bold'>
                  Número de posts
                </h3>
              </div>
              <div className='flex flex-row justify-between'>
                <Pen color='black' />
                <span className='text-blue-800 font-bold text-3xl'>
                  {loading ? '...' : news.length}
                </span>
              </div>
            </div>
            <div className='border border-gray-500 p-4 rounded-md flex flex-col gap-3 justify-around'>
              <div>
                <h3 className='text-gray-800 text-xl font-bold'>
                  Quantidade de likes
                </h3>
              </div>
              <div className='flex flex-row justify-between'>
                <Pen color='black' />
                <span className='text-blue-800 font-bold text-3xl'>4000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
