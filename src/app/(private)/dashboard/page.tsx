'use client'

import 'react-toastify/dist/ReactToastify.css'
import Skeleton from 'react-loading-skeleton'

import {
  Home,
  DollarSign,
  Newspaper,
  BadgeCheck,
  Pen,
  Bookmark,
  Eye,
  X,
} from 'lucide-react'
import HeaderDashboard from '@/app/components/Dashboard/Header'
import Sidebar from '@/app/components/Sidebar'
import { getSession, useSession } from 'next-auth/react'
import { useFormattedDate } from '@/hooks/useFormatted'
import { usePosts } from '@/context/PostContext'

import { useUsers } from '@/context/UserContext'
import { Card } from '@/app/components/Dashboard/Card'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { formatDate } from '@/hooks/formatDate'
import { formatUserRole } from '@/hooks/useUserRole'
import { formatUserPlan } from '@/hooks/useUserPlan'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Loading } from '@/app/components/Form/Loading'
import { useTheme } from 'next-themes'
import { getUserById } from '@/lib/users/[id]'
import { UserProps } from '@/app/interfaces/UserInterface'

interface ItemProps {
  name: string
  symbol: string
  price: string
}

export default function Dashboard() {
  const { data: session } = useSession()
  const currentDate = useFormattedDate()
  const skeletons = Array(8).fill('')
  const [showUser, setShowUser] = useState<UserProps>({} as UserProps)

  const [openModal, setModal] = useState(false)
  async function handleModal(id: string) {
    setModal(!openModal)
    const data = await getUserById(id as string)
    setShowUser(data)
  }

  const [activeTab, setActiveTab] = useState('crypto')
  const [cryptoData, setCryptoData] = useState<ItemProps[]>([] as ItemProps[])
  const [fiatData, setFiatData] = useState<ItemProps[]>([] as ItemProps[])
  const [loadingCoins, setLoadingCoins] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingCoins(true)

        const [cryptoRes, fiatRes] = await Promise.all([
          axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
              ids: 'bitcoin,ethereum,binancecoin,solana,cardano,dogecoin,matic-network,arbitrum,the-open-network,chainlink,render-token,ripple,bitmart-token,sui',
              vs_currencies: 'usd',
            },
          }),
          axios.get('https://api.coingecko.com/api/v3/exchange_rates'),
        ])

        const cryptoPrices = cryptoRes.data
        const rates = fiatRes.data.rates

        const brlRate = rates.brl.value

        const formatPrice = (price: number | undefined) => {
          return price
            ? Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(price)
            : 'N/A'
        }

        setCryptoData([
          {
            name: 'Bitcoin',
            symbol: 'BTC',
            price: Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'USD',
            }).format(cryptoPrices.bitcoin?.usd),
          },
          {
            name: 'Ethereum',
            symbol: 'ETH',
            price: Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'USD',
            }).format(cryptoPrices.ethereum?.usd),
          },
          {
            name: 'BNB',
            symbol: 'BNB',
            price: Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'USD',
            }).format(cryptoPrices.binancecoin?.usd),
          },
          {
            name: 'Solana',
            symbol: 'SOL',
            price: Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'USD',
            }).format(cryptoPrices.solana?.usd),
          },
          {
            name: 'Cardano',
            symbol: 'ADA',
            price: Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'USD',
            }).format(cryptoPrices.cardano?.usd),
          },
          {
            name: 'Dogecoin',
            symbol: 'DOGE',
            price: Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'USD',
            }).format(cryptoPrices.dogecoin?.usd),
          },
          {
            name: 'Polygon',
            symbol: 'POL',
            price: Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'USD',
            }).format(cryptoPrices['matic-network']?.usd),
          },
          {
            name: 'Arbitrum',
            symbol: 'ARB',
            price: Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'USD',
            }).format(cryptoPrices.arbitrum?.usd),
          },
          {
            name: 'SUI',
            symbol: 'SUI',
            price: Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'USD',
            }).format(cryptoPrices.sui?.usd),
          },
          {
            name: 'Chainlink',
            symbol: 'LINK',
            price: Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'USD',
            }).format(cryptoPrices.chainlink?.usd),
          },
          {
            name: 'Render',
            symbol: 'RNDR',
            price: Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'USD',
            }).format(cryptoPrices['render-token']?.usd),
          },
          {
            name: 'BitMart',
            symbol: 'BMX',
            price: Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'USD',
            }).format(cryptoPrices['bitmart-token']?.usd),
          },
          {
            name: 'XRP',
            symbol: 'XRP',
            price: Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'USD',
            }).format(cryptoPrices['ripple']?.usd),
          },
          {
            name: 'Toncoin',
            symbol: 'TON',
            price: Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'USD',
            }).format(cryptoPrices['the-open-network']?.usd),
          },
        ])

        setFiatData([
          {
            name: 'Dólar Americano',
            symbol: 'USD',
            price: formatPrice(brlRate / rates.usd.value),
          },
          {
            name: 'Euro',
            symbol: 'EUR',
            price: formatPrice(brlRate / rates.eur.value),
          },
          {
            name: 'Libra Esterlina',
            symbol: 'GBP',
            price: formatPrice(brlRate / rates.gbp.value),
          },
          {
            name: 'Iene Japonês',
            symbol: 'JPY',
            price: formatPrice(brlRate / rates.jpy.value),
          },
          {
            name: 'Franco Suíço',
            symbol: 'CHF',
            price: formatPrice(brlRate / rates.chf.value),
          },
          {
            name: 'Dólar Canadense',
            symbol: 'CAD',
            price: formatPrice(brlRate / rates.cad.value),
          },
          {
            name: 'Dólar Australiano',
            symbol: 'AUD',
            price: formatPrice(brlRate / rates.aud.value),
          },
          {
            name: 'Rand Sul-Africano',
            symbol: 'ZAR',
            price: formatPrice(brlRate / rates.zar.value),
          },
          {
            name: 'Yuan Chinês',
            symbol: 'CNY',
            price: formatPrice(brlRate / rates.cny.value),
          },
          {
            name: 'Peso Argentino',
            symbol: 'ARS',
            price: formatPrice(brlRate / rates.ars.value),
          },
        ])
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setLoadingCoins(false)
      }
    }

    fetchData()
  }, [])

  const { posts, loading } = usePosts()
  const { users } = useUsers()
  const { resolvedTheme } = useTheme()

  const router = useRouter()

  async function handleAssignPremium(plan: string) {
    try {
      await fetch(`/api/users/${session?.user.id}/plan`, {
        method: 'PUT',
        body: JSON.stringify({ plan }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      toast.success(`Obrigado por assinar o plano 
        ${plan === 'premium' ? 'Premium' : 'Standard'}
        !`)

      await getSession()

      router.push('/dashboard')
    } catch (error) {
      console.error('Erro ao atualizar o plano:', error)
      toast.error('Erro ao atualizar seu plano. Tente novamente mais tarde.')
    }
  }

  return (
    <div
      className={`pb-4 h-screen flex
    ${resolvedTheme === 'light' ? 'bg-gray-50' : 'bg-gray-800'}
    `}
    >
      <title>Dashboard | CryptoNews</title>
      <Sidebar />

      <div className='flex-1 overflow-auto'>
        <HeaderDashboard
          firstName={session?.user?.firstName as string}
          IconComponent={Home}
          currentDate={currentDate}
          title='Dashboard'
        />
        <section className='p-6  flex flex-col gap-4 overflow-y-auto'>
          {session?.user.role === 'costumer' && (
            <section>
              {loading ? (
                <div
                  className={`border border-gray-300 p-4 rounded-md flex flex-col gap-3 justify-around h-[60vh]
                ${resolvedTheme === 'light' ? 'bg-gray-100' : ' bg-gray-700'}
              `}
                ></div>
              ) : (
                <div className='flex flex-col border border-gray-300 rounded-xl p-4'>
                  <h2
                    className={`font-semibold text-lg mt-2
                  ${
                    resolvedTheme === 'light'
                      ? 'text-blue-800'
                      : 'text-blue-400'
                  }
                `}
                  >
                    Mercado
                  </h2>
                  {loadingCoins ? (
                    <div className='flex justify-center'>
                      <Loading />
                    </div>
                  ) : (
                    <div className='w-full max-w-2xl mx-auto rounded-lg p-6'>
                      <div className='flex border-b'>
                        <button
                          className={`w-1/2 py-2 text-center ${
                            activeTab === 'crypto'
                              ? `border-b-2 font-semibold ${
                                  resolvedTheme === 'light'
                                    ? 'border-blue-800 text-blue-800'
                                    : 'border-blue-400 text-blue-400'
                                }`
                              : 'text-gray-500'
                          }`}
                          onClick={() => setActiveTab('crypto')}
                        >
                          Criptomoedas
                        </button>
                        <button
                          className={`w-1/2 py-2 text-center ${
                            activeTab === 'fiat'
                              ? `border-b-2 font-semibold ${
                                  resolvedTheme === 'light'
                                    ? 'border-blue-800 text-blue-800'
                                    : 'border-blue-400 text-blue-400'
                                }`
                              : 'text-gray-500'
                          }`}
                          onClick={() => setActiveTab('fiat')}
                        >
                          Moedas Fiduciárias
                        </button>
                      </div>
                      <div className='w-full overflow-x-auto rounded-lg mt-4'>
                        <table className='w-full mt-4 border-collapse'>
                          <thead>
                            <tr
                              className={`${
                                resolvedTheme === 'light'
                                  ? 'bg-gray-200'
                                  : 'bg-gray-700'
                              }`}
                            >
                              <th
                                className={`p-2 text-left ${
                                  resolvedTheme === 'light'
                                    ? 'text-blue-800'
                                    : 'text-blue-400'
                                }`}
                              >
                                Nome
                              </th>
                              <th
                                className={`p-2 text-left ${
                                  resolvedTheme === 'light'
                                    ? 'text-blue-800'
                                    : 'text-blue-400'
                                }`}
                              >
                                Símbolo
                              </th>
                              <th
                                className={`p-2 text-right ${
                                  resolvedTheme === 'light'
                                    ? 'text-blue-800'
                                    : 'text-blue-400'
                                }`}
                              >
                                Preço
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {(activeTab === 'crypto'
                              ? cryptoData
                              : fiatData
                            ).map((item: ItemProps, index) => (
                              <tr
                                key={index}
                                className={`border-t transition-colors
                                  ${
                                    resolvedTheme === 'light'
                                      ? 'hover:bg-gray-100'
                                      : 'hover:bg-gray-700'
                                  }
                                  `}
                              >
                                <td
                                  className={`p-2 ${
                                    resolvedTheme === 'light'
                                      ? 'text-gray-800'
                                      : 'text-gray-200'
                                  }`}
                                >
                                  {item.name}
                                </td>
                                <td
                                  className={`p-2 ${
                                    resolvedTheme === 'light'
                                      ? 'text-gray-800'
                                      : 'text-gray-200'
                                  }`}
                                >
                                  {item.symbol}
                                </td>
                                <td
                                  className={`p-2 ${
                                    resolvedTheme === 'light'
                                      ? 'text-gray-800'
                                      : 'text-gray-200'
                                  } text-right`}
                                >
                                  {item.price}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}
          <section>
            {loading ? (
              <div className='py-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 md:grid-cols-3 gap-4'>
                {skeletons.map((_, index) => (
                  <div
                    key={index}
                    className={`border border-gray-300 p-4 rounded-md flex flex-col gap-3 justify-around h-[12vh]
                      ${
                        resolvedTheme === 'light'
                          ? 'bg-gray-100'
                          : ' bg-gray-700'
                      }
                    `}
                  >
                    <Skeleton
                      key={index}
                      baseColor='#e0e0e0'
                      highlightColor='#bdbdbd'
                      className='flex items-center justify-center h-[8vh]'
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`flex flex-col border-2 rounded-xl p-4
              ${
                resolvedTheme === 'light'
                  ? 'border-gray-200'
                  : 'border-gray-700'
              }
              `}
              >
                <h2
                  className={`font-semibold text-lg mt-2
                  ${
                    resolvedTheme === 'light'
                      ? 'text-blue-800'
                      : 'text-blue-400'
                  }
                `}
                >
                  Informações
                </h2>

                <div className='py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8'>
                  {session?.user.role === 'admin' && (
                    <Card
                      text='Total de clientes'
                      value={
                        users.filter((item) => item.role === 'costumer').length
                      }
                      icon={
                        <DollarSign
                          color={resolvedTheme === 'light' ? 'black' : 'gray'}
                        />
                      }
                    />
                  )}

                  {session?.user.role !== 'costumer' && (
                    <>
                      <Card
                        text='Total de posts'
                        value={posts.length}
                        icon={
                          <Newspaper
                            color={resolvedTheme === 'light' ? 'black' : 'gray'}
                          />
                        }
                      />
                      <Card
                        text='Meus posts'
                        value={
                          posts.filter(
                            (item) => item.userId === session?.user.id
                          ).length
                        }
                        icon={
                          <Newspaper
                            color={resolvedTheme === 'light' ? 'black' : 'gray'}
                          />
                        }
                      />
                    </>
                  )}
                  {session?.user.role === 'costumer' && (
                    <Card
                      text='Posts favoritados'
                      value={
                        posts.filter((item) => item.userId === session?.user.id)
                          .length
                      }
                      icon={
                        <Bookmark
                          color={resolvedTheme === 'light' ? 'black' : 'gray'}
                        />
                      }
                    />
                  )}
                </div>
              </div>
            )}
          </section>
          {session?.user.role === 'costumer' && (
            <section className='flex flex-col items-center xl:grid xl:grid-cols-3 gap-4'>
              <div
                className={`w-full max-w-sm p-4 border-2 rounded-lg shadow-sm sm:p-8 
              
              ${
                resolvedTheme === 'light'
                  ? 'bg-gray-50 border-gray-200'
                  : 'bg-gray-800 border-gray-700'
              }
              `}
              >
                <h5
                  className={`mb-4 text-xl font-medium 
                  ${
                    resolvedTheme === 'light'
                      ? 'text-blue-800'
                      : 'text-blue-400'
                  }`}
                >
                  Gratuito
                </h5>
                <div
                  className={`flex items-baseline 
                  ${
                    resolvedTheme === 'light'
                      ? 'text-blue-800'
                      : 'text-blue-400'
                  }
                  `}
                >
                  <span className='text-3xl font-semibold'>R$</span>
                  <span className='text-5xl font-extrabold tracking-tight'>
                    0
                  </span>
                  <span
                    className={`ms-1 text-xl font-normal 
                    ${
                      resolvedTheme === 'light'
                        ? 'text-gray-800'
                        : 'text-gray-400'
                    }
                    `}
                  >
                    /mês
                  </span>
                </div>

                <ul role='list' className='space-y-5 my-7'>
                  <li className='flex decoration-gray-500'>
                    <BadgeCheck size={20} fill='blue' color='white' />
                    <span
                      className={`text-base font-normal leading-tight ms-3
                      ${
                        resolvedTheme === 'light'
                          ? 'text-gray-800'
                          : 'text-gray-200'
                      }
                       `}
                    >
                      Notícias e análises do mercado
                    </span>
                  </li>
                  <li className='flex items-center'>
                    <BadgeCheck size={20} fill='blue' color='white' />
                    <span
                      className={`text-base font-normal leading-tight ms-3
                      ${
                        resolvedTheme === 'light'
                          ? 'text-gray-800'
                          : 'text-gray-200'
                      }
                       `}
                    >
                      Acompanhamento das criptomoedas
                    </span>
                  </li>
                  <li className='flex items-center'>
                    <BadgeCheck size={20} fill='blue' color='white' />
                    <span
                      className={`text-base font-normal leading-tight ms-3
                      ${
                        resolvedTheme === 'light'
                          ? 'text-gray-800'
                          : 'text-gray-200'
                      }
                       `}
                    >
                      Conteúdos educativos
                    </span>
                  </li>

                  <li className='flex line-through decoration-gray-500'>
                    <BadgeCheck
                      size={20}
                      fill='gray'
                      color={resolvedTheme === 'light' ? 'white' : 'black'}
                    />
                    <span className='text-base font-normal leading-tight text-gray-500 ms-3'>
                      Gráficos com indicadores
                    </span>
                  </li>
                  <li className='flex line-through decoration-gray-500'>
                    <BadgeCheck
                      size={20}
                      fill='gray'
                      color={resolvedTheme === 'light' ? 'white' : 'black'}
                    />
                    <span className='text-base font-normal leading-tight text-gray-500 ms-3'>
                      Relatórios com sugestões estratégicas
                    </span>
                  </li>
                  <li className='flex line-through decoration-gray-500'>
                    <BadgeCheck
                      size={20}
                      fill='gray'
                      color={resolvedTheme === 'light' ? 'white' : 'black'}
                    />
                    <span className='text-base font-normal leading-tight text-gray-500 ms-3'>
                      Gestão de portfólio
                    </span>
                  </li>
                  <li className='flex line-through decoration-gray-500'>
                    <BadgeCheck
                      size={20}
                      fill='gray'
                      color={resolvedTheme === 'light' ? 'white' : 'black'}
                    />
                    <span className='text-base font-normal leading-tight text-gray-500 ms-3'>
                      Comunidade no Discord/Telegram
                    </span>
                  </li>
                </ul>

                <button
                  type='button'
                  onClick={() => {
                    if (session.user.plan !== 'free') {
                      handleAssignPremium('free')
                    }
                  }}
                  className={`text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center
                      ${
                        session.user.plan !== 'free'
                          ? 'bg-blue-600 hover:bg-blue-700 '
                          : ' bg-gray-500 hover:bg-gray-600  cursor-not-allowed'
                      }
                    `}
                >
                  {session.user.plan !== 'free'
                    ? 'Escolher plano'
                    : 'Meu plano'}
                </button>
              </div>

              <div
                className={`w-full max-w-sm p-4 border-2 rounded-lg shadow-sm sm:p-8 
              
              ${
                resolvedTheme === 'light'
                  ? 'bg-gray-50 border-gray-200'
                  : 'bg-gray-800 border-gray-700'
              }
              `}
              >
                <h5
                  className={`mb-4 text-xl font-medium 
                  ${
                    resolvedTheme === 'light'
                      ? 'text-blue-800'
                      : 'text-blue-400'
                  }`}
                >
                  Standard
                </h5>
                <div
                  className={`flex items-baseline 
                  ${
                    resolvedTheme === 'light'
                      ? 'text-blue-800'
                      : 'text-blue-400'
                  }
                  `}
                >
                  <span className='text-3xl font-semibold'>R$</span>
                  <span className='text-5xl font-extrabold tracking-tight'>
                    10
                  </span>
                  <span
                    className={`ms-1 text-xl font-normal 
                    ${
                      resolvedTheme === 'light'
                        ? 'text-gray-800'
                        : 'text-gray-400'
                    }
                    `}
                  >
                    /mês
                  </span>
                </div>
                <ul role='list' className='space-y-5 my-7'>
                  <li className='flex decoration-gray-500'>
                    <BadgeCheck size={20} fill='blue' color='white' />
                    <span
                      className={`text-base font-normal leading-tight ms-3
                      ${
                        resolvedTheme === 'light'
                          ? 'text-gray-800'
                          : 'text-gray-200'
                      }
                       `}
                    >
                      Notícias e análises do mercado
                    </span>
                  </li>
                  <li className='flex items-center'>
                    <BadgeCheck size={20} fill='blue' color='white' />
                    <span
                      className={`text-base font-normal leading-tight ms-3
                      ${
                        resolvedTheme === 'light'
                          ? 'text-gray-800'
                          : 'text-gray-200'
                      }
                       `}
                    >
                      Acompanhamento das criptomoedas
                    </span>
                  </li>
                  <li className='flex items-center'>
                    <BadgeCheck size={20} fill='blue' color='white' />
                    <span
                      className={`text-base font-normal leading-tight ms-3
                      ${
                        resolvedTheme === 'light'
                          ? 'text-gray-800'
                          : 'text-gray-200'
                      }
                       `}
                    >
                      Conteúdos educativos
                    </span>
                  </li>

                  <li className='flex decoration-gray-500'>
                    <BadgeCheck size={20} fill='blue' color='white' />
                    <span
                      className={`text-base font-normal leading-tight ms-3
                      ${
                        resolvedTheme === 'light'
                          ? 'text-gray-800'
                          : 'text-gray-200'
                      }
                       `}
                    >
                      Gráficos com indicadores
                    </span>
                  </li>
                  <li className='flex decoration-gray-500'>
                    <BadgeCheck size={20} fill='blue' color='white' />
                    <span
                      className={`text-base font-normal leading-tight ms-3
                      ${
                        resolvedTheme === 'light'
                          ? 'text-gray-800'
                          : 'text-gray-200'
                      }
                       `}
                    >
                      Relatórios com sugestões estratégicas
                    </span>
                  </li>
                  <li className='flex line-through decoration-gray-500'>
                    <BadgeCheck
                      size={20}
                      fill='gray'
                      color={resolvedTheme === 'light' ? 'white' : 'black'}
                    />
                    <span className='text-base font-normal leading-tight text-gray-500 ms-3'>
                      Gestão de portfólio
                    </span>
                  </li>
                  <li className='flex line-through decoration-gray-500'>
                    <BadgeCheck
                      size={20}
                      fill='gray'
                      color={resolvedTheme === 'light' ? 'white' : 'black'}
                    />
                    <span className='text-base font-normal leading-tight text-gray-500 ms-3'>
                      Comunidade no Discord/Telegram
                    </span>
                  </li>
                </ul>
                {session.user.plan !== 'standard' && (
                  <button
                    type='button'
                    onClick={() => {
                      if (session.user.plan !== 'standard') {
                        handleAssignPremium('standard')
                      }
                    }}
                    className={`text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center
                      ${
                        session.user.plan !== 'standard'
                          ? 'bg-blue-600 hover:bg-blue-700 '
                          : ' bg-gray-500 hover:bg-gray-600  cursor-not-allowed'
                      }
                    `}
                  >
                    {session.user.plan !== 'standard'
                      ? 'Escolher plano'
                      : 'Meu plano'}
                  </button>
                )}
              </div>

              <div
                className={`w-full max-w-sm p-4 border-2 rounded-lg shadow-sm sm:p-8 
              
              ${
                resolvedTheme === 'light'
                  ? 'bg-gray-50 border-gray-200'
                  : 'bg-gray-800 border-gray-700'
              }
              `}
              >
                <h5
                  className={`mb-4 text-xl font-medium 
                  ${
                    resolvedTheme === 'light'
                      ? 'text-blue-800'
                      : 'text-blue-400'
                  }`}
                >
                  Premium
                </h5>
                <div
                  className={`flex items-baseline 
                  ${
                    resolvedTheme === 'light'
                      ? 'text-blue-800'
                      : 'text-blue-400'
                  }
                  `}
                >
                  <span className='text-3xl font-semibold'>R$</span>
                  <span className='text-5xl font-extrabold tracking-tight'>
                    100
                  </span>
                  <span
                    className={`ms-1 text-xl font-normal 
                    ${
                      resolvedTheme === 'light'
                        ? 'text-gray-800'
                        : 'text-gray-400'
                    }
                    `}
                  >
                    /mês
                  </span>
                </div>
                <ul role='list' className='space-y-5 my-7'>
                  <li className='flex decoration-gray-500'>
                    <BadgeCheck size={20} fill='blue' color='white' />
                    <span
                      className={`text-base font-normal leading-tight ms-3
                      ${
                        resolvedTheme === 'light'
                          ? 'text-gray-800'
                          : 'text-gray-200'
                      }
                       `}
                    >
                      Notícias e análises do mercado
                    </span>
                  </li>
                  <li className='flex items-center'>
                    <BadgeCheck size={20} fill='blue' color='white' />
                    <span
                      className={`text-base font-normal leading-tight ms-3
                      ${
                        resolvedTheme === 'light'
                          ? 'text-gray-800'
                          : 'text-gray-200'
                      }
                       `}
                    >
                      Acompanhamento das criptomoedas
                    </span>
                  </li>
                  <li className='flex items-center'>
                    <BadgeCheck size={20} fill='blue' color='white' />
                    <span
                      className={`text-base font-normal leading-tight ms-3
                      ${
                        resolvedTheme === 'light'
                          ? 'text-gray-800'
                          : 'text-gray-200'
                      }
                       `}
                    >
                      Conteúdos educativos
                    </span>
                  </li>

                  <li className='flex decoration-gray-500'>
                    <BadgeCheck size={20} fill='blue' color='white' />
                    <span
                      className={`text-base font-normal leading-tight ms-3
                      ${
                        resolvedTheme === 'light'
                          ? 'text-gray-800'
                          : 'text-gray-200'
                      }
                       `}
                    >
                      Gráficos com indicadores
                    </span>
                  </li>
                  <li className='flex decoration-gray-500'>
                    <BadgeCheck size={20} fill='blue' color='white' />
                    <span
                      className={`text-base font-normal leading-tight ms-3
                      ${
                        resolvedTheme === 'light'
                          ? 'text-gray-800'
                          : 'text-gray-200'
                      }
                       `}
                    >
                      Relatórios com sugestões estratégicas
                    </span>
                  </li>
                  <li className='flex decoration-gray-500'>
                    <BadgeCheck size={20} fill='blue' color='white' />
                    <span
                      className={`text-base font-normal leading-tight ms-3
                      ${
                        resolvedTheme === 'light'
                          ? 'text-gray-800'
                          : 'text-gray-200'
                      }
                       `}
                    >
                      Gestão de portfólio
                    </span>
                  </li>
                  <li className='flex decoration-gray-500'>
                    <BadgeCheck size={20} fill='blue' color='white' />
                    <span
                      className={`text-base font-normal leading-tight ms-3
                      ${
                        resolvedTheme === 'light'
                          ? 'text-gray-800'
                          : 'text-gray-200'
                      }
                       `}
                    >
                      Comunidade no Discord/Telegram
                    </span>
                  </li>
                </ul>
                {session.user.plan !== 'premium' && (
                  <button
                    type='button'
                    onClick={() => {
                      if (session.user.plan !== 'premium') {
                        handleAssignPremium('premium')
                      }
                    }}
                    className={`text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center
                      ${
                        session.user.plan !== 'premium'
                          ? 'bg-blue-600 hover:bg-blue-700 '
                          : ' bg-gray-500 hover:bg-gray-600  cursor-not-allowed'
                      }
                    `}
                  >
                    {session.user.plan !== 'premium'
                      ? 'Escolher plano'
                      : 'Meu plano'}
                  </button>
                )}
              </div>
            </section>
          )}
        </section>
        {session?.user.role === 'admin' && (
          <section className='px-4 pt-4 md:px-6 md:pt-6 w-full overflow-x-auto'>
            <h2
              className={`font-semibold text-lg mt-2
                  ${
                    resolvedTheme === 'light'
                      ? 'text-blue-800'
                      : 'text-blue-400'
                  }
                `}
            >
              Usuários cadastrados
            </h2>

            <div className='w-full overflow-x-auto bg-white shadow-md rounded-lg mt-4'>
              <table className='w-full min-w-[800px] text-sm text-left text-gray-800'>
                <thead
                  className={`text-xs text-gray-700 uppercase
                    ${resolvedTheme === 'light' ? 'bg-gray-200' : 'bg-gray-600'}
                  `}
                >
                  <tr
                    className={`border-b *:px-4 *:py-3
                    ${
                      resolvedTheme === 'light'
                        ? 'text-gray-700 border-gray-100'
                        : 'text-gray-200 border-gray-800'
                    }
                    `}
                  >
                    <th scope='col'>#</th>
                    <th scope='col'>Nome</th>
                    <th scope='col'>Sobrenome</th>
                    <th scope='col'>E-mail</th>
                    <th scope='col'>Cargo</th>
                    <th scope='col'>Data de criação</th>
                    <th scope='col'>Data de atualização</th>
                    <th scope='col'>Plano</th>
                    <th scope='col'>Início do Premium</th>
                    <th scope='col'>Fim do Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className={`border-b h-16
                        ${
                          resolvedTheme === 'light'
                            ? 'border-gray-200 text-gray-700 bg-gray-50 hover:bg-gray-100'
                            : 'border-gray-800 text-gray-200 bg-gray-700 hover:bg-gray-600'
                        }
                      `}
                    >
                      <td className='px-4 py-3 whitespace-nowrap'>
                        {user.id === session.user.id ? (
                          <Link href='/dashboard/profile'>
                            <Pen />
                          </Link>
                        ) : (
                          <button onClick={() => handleModal(user.id)}>
                            <Eye />
                          </button>
                        )}
                      </td>
                      <td className='px-4 py-3 whitespace-nowrap'>
                        {user.firstName}
                      </td>
                      <td className='px-4 py-3 whitespace-nowrap'>
                        {user.lastName}
                      </td>
                      <td className='px-4 py-3 whitespace-nowrap'>
                        {user.email}
                      </td>
                      <td className='px-4 py-3 whitespace-nowrap'>
                        {formatUserRole(user.role)}
                      </td>
                      <td className='px-4 py-3 whitespace-nowrap'>
                        {formatDate(user.createdAt)}
                      </td>
                      <td className='px-4 py-3 whitespace-nowrap'>
                        {formatDate(user.updatedAt)}
                      </td>
                      <td className='px-4 py-3 whitespace-nowrap'>
                        {formatUserPlan(user.plan)}
                      </td>
                      <td className='px-4 py-3 whitespace-nowrap'>
                        {user.startPremium
                          ? formatDate(user.startPremium as Date)
                          : ''}
                      </td>
                      <td className='px-4 py-3 whitespace-nowrap'>
                        {user.endPremium
                          ? formatDate(user.endPremium as Date)
                          : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {openModal && (
              <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
                <div
                  className={`w-[30vw] shadow-lg py-2 rounded-md
                    ${resolvedTheme === 'light' ? 'bg-gray-100' : 'bg-gray-700'}
                  `}
                >
                  <div
                    className={`flex flex-row justify-between items-center border-b-2
                    ${
                      resolvedTheme === 'light'
                        ? 'border-gray-200'
                        : 'border-gray-800'
                    }
                  `}
                  >
                    <h2
                      className={`text-sm font-medium py-3 px-4
                      ${
                        resolvedTheme === 'light'
                          ? 'text-gray-900'
                          : 'text-gray-100'
                      }
                    `}
                    >
                      Perfil de {showUser.firstName}
                    </h2>
                    <button
                      type='button'
                      className='h-8 px-2 text-sm rounded-md text-gray-800'
                      onClick={() => handleModal(showUser.id)}
                    >
                      <X color={resolvedTheme === 'light' ? 'black' : 'gray'} />
                    </button>
                  </div>

                  <div className='flex flex-col gap-4 p-4'>
                    <div className='flex flex-row items-center justify-between'>
                      <h2
                        className={`font-bold
                      ${
                        resolvedTheme === 'light'
                          ? 'text-blue-900'
                          : 'text-blue-400'
                      }
                      `}
                      >
                        Nome
                      </h2>
                      <span
                        className={`font-thin text-sm
                        ${
                          resolvedTheme === 'light'
                            ? 'text-gray-800'
                            : 'text-gray-100'
                        }
                        `}
                      >
                        {showUser.firstName} {showUser.lastName}
                      </span>
                    </div>
                    <div className='flex flex-row items-center justify-between'>
                      <h2
                        className={`font-bold
                      ${
                        resolvedTheme === 'light'
                          ? 'text-blue-900'
                          : 'text-blue-400'
                      }
                      `}
                      >
                        E-mail
                      </h2>
                      <span
                        className={`font-thin text-sm
                        ${
                          resolvedTheme === 'light'
                            ? 'text-gray-800'
                            : 'text-gray-100'
                        }
                        `}
                      >
                        {showUser.email}
                      </span>
                    </div>
                    <div className='flex flex-row items-center justify-between'>
                      <h2
                        className={`font-bold
                      ${
                        resolvedTheme === 'light'
                          ? 'text-blue-800'
                          : 'text-blue-400'
                      }
                      `}
                      >
                        Cargo
                      </h2>
                      <span
                        className={`font-thin text-sm
                        ${
                          resolvedTheme === 'light'
                            ? 'text-gray-800'
                            : 'text-gray-100'
                        }
                        `}
                      >
                        {formatUserRole(showUser.role)}
                      </span>
                    </div>

                    <div className='flex flex-row items-center justify-between'>
                      <h2
                        className={`font-bold
                      ${
                        resolvedTheme === 'light'
                          ? 'text-blue-800'
                          : 'text-blue-400'
                      }
                      `}
                      >
                        Plano
                      </h2>
                      <span
                        className={`font-thin text-sm
                        ${
                          resolvedTheme === 'light'
                            ? 'text-gray-800'
                            : 'text-gray-100'
                        }
                        `}
                      >
                        {showUser.plan}
                      </span>
                    </div>

                    {showUser.plan === 'free' && (
                      <div className='grid grid-cols-2 gap-2'>
                        <div className='flex flex-row items-center justify-between'>
                          <h2
                            className={`font-bold
                      ${
                        resolvedTheme === 'light'
                          ? 'text-blue-900'
                          : 'text-blue-400'
                      }
                      `}
                          >
                            Início do plano
                          </h2>
                          <span
                            className={`font-thin text-sm
                            ${
                              resolvedTheme === 'light'
                                ? 'text-gray-800'
                                : 'text-gray-100'
                            }
                            `}
                          >
                            {showUser.startPremium
                              ? formatDate(showUser.startPremium as Date)
                              : ''}
                          </span>
                        </div>

                        <div className='flex flex-row items-center justify-between'>
                          <h2
                            className={`font-bold
                      ${
                        resolvedTheme === 'light'
                          ? 'text-blue-900'
                          : 'text-blue-400'
                      }
                      `}
                          >
                            Final do plano
                          </h2>
                          <span
                            className={`font-thin text-sm
                            ${
                              resolvedTheme === 'light'
                                ? 'text-gray-800'
                                : 'text-gray-100'
                            }
                            `}
                          >
                            {showUser.startPremium
                              ? formatDate(showUser.startPremium as Date)
                              : ''}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}
