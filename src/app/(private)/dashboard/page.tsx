'use client'

import 'react-toastify/dist/ReactToastify.css'
import Skeleton from 'react-loading-skeleton'

import { Home, DollarSign, Newspaper, Check, Pen } from 'lucide-react'
import HeaderDashboard from '@/app/components/Dashboard/Header'
import Sidebar from '@/app/components/Sidebar'
import { getSession, useSession } from 'next-auth/react'
import { useFormattedDate } from '@/hooks/useFormatted'
import { usePosts } from '@/context/PostContext'

import { useUsers } from '@/context/UserContext'
import { Card } from '@/app/components/Dashboard/Card'
import { Button } from '@/app/components/Dashboard/Button'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { formatDate } from '@/hooks/formatDate'
import { formatUserRole } from '@/hooks/useUserRole'
import { formatUserPlan } from '@/hooks/useUserPlan'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Loading } from '@/app/components/Form/Loading'

interface ItemProps {
  name: string
  symbol: string
  price: string
}

export default function Dashboard() {
  const { data: session } = useSession()
  const currentDate = useFormattedDate()
  const skeletons = Array(8).fill('')

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

  const router = useRouter()

  async function handleAssignPremium() {
    try {
      await fetch(`/api/users/${session?.user.id}/plan`, {
        method: 'PUT',
        body: JSON.stringify({ plan: 'premium' }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      toast.success('Obrigado por assinar o plano Premium!')

      await getSession()

      router.push('/dashboard')
    } catch (error) {
      console.error('Erro ao atualizar o plano:', error)
      toast.error('Erro ao atualizar seu plano. Tente novamente mais tarde.')
    }
  }

  return (
    <div className='bg-gray-50 pb-4 h-screen flex'>
      <title>CryptoNews | Dashboard</title>
      <Sidebar />

      <div className='flex-1 overflow-auto'>
        <HeaderDashboard
          firstName={session?.user?.firstName as string}
          IconComponent={Home}
          currentDate={currentDate}
          title='Dashboard'
        />
        <section className='p-6  flex flex-col gap-4 overflow-y-auto'>
          <section>
            {loading ? (
              <div className='py-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 md:grid-cols-3 gap-4'>
                {skeletons.map((_, index) => (
                  <div
                    key={index}
                    className='border border-gray-300 bg-gray-100 p-4 rounded-md flex flex-col gap-3 justify-around h-[12vh]'
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
              <div className='flex flex-col border border-gray-300 rounded-xl p-4'>
                <h2 className='text-blue-800 font-semibold text-lg mt-2'>
                  Mercado
                </h2>
                {loadingCoins ? (
                  <div className='flex justify-center'>
                    <Loading />
                  </div>
                ) : (
                  <div className='w-full max-w-2xl mx-auto  rounded-lg p-6'>
                    <div className='flex border-b'>
                      <button
                        className={`w-1/2 py-2 text-center ${
                          activeTab === 'crypto'
                            ? 'border-b-2 border-blue-800 text-blue-800 font-semibold'
                            : 'text-gray-500'
                        }`}
                        onClick={() => setActiveTab('crypto')}
                      >
                        Criptomoedas
                      </button>
                      <button
                        className={`w-1/2 py-2 text-center ${
                          activeTab === 'fiat'
                            ? 'border-b-2 border-blue-800 text-blue-800 font-semibold'
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
                          <tr className='bg-gray-200'>
                            <th className='p-2 text-left text-blue-800'>
                              Nome
                            </th>
                            <th className='p-2 text-left text-blue-800'>
                              Símbolo
                            </th>
                            <th className='p-2 text-right text-blue-800'>
                              Preço
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(activeTab === 'crypto' ? cryptoData : fiatData).map(
                            (item: ItemProps, index) => (
                              <tr
                                key={index}
                                className='border-t hover:bg-gray-100 transition-colors'
                              >
                                <td className='p-2 text-gray-800'>
                                  {item.name}
                                </td>
                                <td className='p-2 text-gray-800'>
                                  {item.symbol}
                                </td>
                                <td className='p-2 text-gray-800 text-right'>
                                  {item.price}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
          <section>
            {loading ? (
              <div className='py-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 md:grid-cols-3 gap-4'>
                {skeletons.map((_, index) => (
                  <div
                    key={index}
                    className='border border-gray-300 bg-gray-100 p-4 rounded-md flex flex-col gap-3 justify-around h-[12vh]'
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
              <div className='flex flex-col border border-gray-300 rounded-xl p-4'>
                <h2 className='text-blue-800 font-semibold text-lg mt-2'>
                  Informações
                </h2>

                <div className='py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8'>
                  {session?.user.role === 'admin' && (
                    <Card
                      text='Total de clientes'
                      value={
                        users.filter((item) => item.role === 'costumer').length
                      }
                      icon={<DollarSign color='black' />}
                    />
                  )}

                  {session?.user.role !== 'costumer' && (
                    <>
                      <Card
                        text='Total de posts'
                        value={posts.length}
                        icon={<Newspaper color='black' />}
                      />
                      <Card
                        text='Meus posts'
                        value={
                          posts.filter(
                            (item) => item.userId === session?.user.id
                          ).length
                        }
                        icon={<Newspaper color='black' />}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
          </section>
          {session?.user.role === 'costumer' && (
            <section
              className={`grid ${
                session?.user.plan === 'free'
                  ? 'md:grid-cols-2'
                  : 'md:grid-cols-1'
              } grid-cols-1 gap-4`}
            >
              <div className='flex p-8 flex-col justify-between items-center border border-gray-300 bg-gray-100 rounded-xl'>
                <div className='flex flex-col items-center'>
                  <h1 className='text-blue-800 font-bold text-3xl'>
                    Meu plano
                  </h1>
                  <span className='text-blue-800 text-md'>
                    {session?.user.plan === 'free' ? 'Gratuito' : 'Premium'}
                  </span>
                </div>
                <div className='flex flex-col items-center gap-4'>
                  <h2 className='text-blue-800 font-semibold text-lg mt-2'>
                    Meus benefícios
                  </h2>
                  <ul className='text-blue-800 list-disc list-inside'>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Exercitationem repellendus sequi reiciendis iste
                      perspiciatis asperiores animi atque perferendis. Quaerat
                      aperiam et exercitationem iure nihil fuga culpa nostrum
                      accusamus, excepturi libero.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Exercitationem repellendus sequi reiciendis iste
                      perspiciatis asperiores animi atque perferendis. Quaerat
                      aperiam et exercitationem iure nihil fuga culpa nostrum
                      accusamus, excepturi libero.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Exercitationem repellendus sequi reiciendis iste
                      perspiciatis asperiores animi atque perferendis. Quaerat
                      aperiam et exercitationem iure nihil fuga culpa nostrum
                      accusamus, excepturi libero.
                    </li>
                  </ul>
                </div>
              </div>
              {session?.user.plan === 'free' && (
                <div className='flex p-8 flex-col justify-between items-center border border-gray-300 bg-gray-100 rounded-xl'>
                  <div className='flex flex-col items-center'>
                    <h1 className='text-blue-800 font-bold text-3xl'>
                      Premium
                    </h1>
                  </div>
                  <div className='flex flex-col items-center gap-4'>
                    <h2 className='text-blue-800 font-semibold text-lg mt-2'>
                      Vantagens
                    </h2>
                    <ul className='text-blue-800 list-disc list-inside'>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Exercitationem repellendus sequi reiciendis iste
                        perspiciatis asperiores animi atque perferendis. Quaerat
                        aperiam et exercitationem iure nihil fuga culpa nostrum
                        accusamus, excepturi libero.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Exercitationem repellendus sequi reiciendis iste
                        perspiciatis asperiores animi atque perferendis. Quaerat
                        aperiam et exercitationem iure nihil fuga culpa nostrum
                        accusamus, excepturi libero.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Exercitationem repellendus sequi reiciendis iste
                        perspiciatis asperiores animi atque perferendis. Quaerat
                        aperiam et exercitationem iure nihil fuga culpa nostrum
                        accusamus, excepturi libero.
                      </li>
                    </ul>
                    <Button
                      onClick={handleAssignPremium}
                      text='Assinar plano'
                      IconComponent={Check}
                    />
                  </div>
                </div>
              )}
            </section>
          )}
        </section>
        {session?.user.role === 'admin' && (
          <section className='px-4 pt-4 md:px-6 md:pt-6 w-full overflow-x-auto'>
            <h2 className='text-blue-800 font-semibold text-lg mt-2'>
              Usuários cadastrados
            </h2>

            <div className='w-full overflow-x-auto bg-white shadow-md rounded-lg mt-4'>
              <table className='w-full min-w-[800px] text-sm text-left text-gray-800'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-300'>
                  <tr className='*:px-4 *:py-3'>
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
                      className='bg-gray-200 border-b border-gray-300 text-gray-700'
                    >
                      <td className='px-4 py-3 whitespace-nowrap'>
                        {user.id === session.user.id && (
                          <Link href='/dashboard/profile'>
                            <Pen />
                          </Link>
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
          </section>
        )}
      </div>
    </div>
  )
}
