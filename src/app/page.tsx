'use client'

import Image from 'next/image'
import Footer from './components/Footer'
import { Header } from './components/Header'
import LatestNews from './components/LatestNews'
import blockchainImage from '@/assets/images/blockchain.png'
import 'react-loading-skeleton/dist/skeleton.css'
import Link from 'next/link'
import { Coin } from '@phosphor-icons/react'
import { BadgeCheck, Blocks, Newspaper } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { getSession, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { Title } from './components/Dashboard/Title'

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession()
  const { resolvedTheme } = useTheme()

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
    <div className='flex flex-col min-h-screen bg-white'>
      <title>HomePage | CryptoNews</title>
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

      <section
        className={`flex flex-col items-center py-8
        ${resolvedTheme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}
        `}
      >
        <Title title='Nossos planos' />
        <div className='md:grid md:grid-cols-3 flex flex-col gap-4 md:gap-16 p-8'>
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
              <span className='text-5xl font-extrabold tracking-tight'>0</span>
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
                if (session?.user.plan !== 'free') {
                  handleAssignPremium('free')
                }
              }}
              className={`text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center
                      ${
                        session?.user.plan !== 'free'
                          ? 'bg-blue-600 hover:bg-blue-700 '
                          : ' bg-gray-500 hover:bg-gray-600  cursor-not-allowed'
                      }
                    `}
            >
              {session?.user.plan !== 'free' ? 'Escolher plano' : 'Meu plano'}
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
              <span className='text-5xl font-extrabold tracking-tight'>49</span>
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
            {session?.user.plan !== 'standard' && (
              <button
                type='button'
                onClick={() => {
                  if (session?.user.plan !== 'standard') {
                    handleAssignPremium('standard')
                  }
                }}
                className={`text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center
                      ${
                        session?.user.plan !== 'standard'
                          ? 'bg-blue-600 hover:bg-blue-700 '
                          : ' bg-gray-500 hover:bg-gray-600  cursor-not-allowed'
                      }
                    `}
              >
                {session?.user.plan !== 'standard'
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
                249
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
            {session?.user.plan !== 'premium' && (
              <button
                type='button'
                onClick={() => {
                  if (session?.user.plan !== 'premium') {
                    handleAssignPremium('premium')
                  }
                }}
                className={`text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center
                      ${
                        session?.user.plan !== 'premium'
                          ? 'bg-blue-600 hover:bg-blue-700 '
                          : ' bg-gray-500 hover:bg-gray-600  cursor-not-allowed'
                      }
                    `}
              >
                {session?.user.plan !== 'premium'
                  ? 'Escolher plano'
                  : 'Meu plano'}
              </button>
            )}
          </div>
        </div>
      </section>

      <section className='flex flex-col md:flex-row bg-gray-200 justify-between p-8 gap-16'>
        <div className='flex flex-col items-center gap-4'>
          <Blocks size={64} color='#1565C0' />
          <h2 className='font-bold text-blue-800'>Análise de projetos</h2>
          <p className='text-gray-800 text-justify'>
            Análises e insights sobre novos projetos no mercado de criptomoedas,
            com foco em tendências e potenciais oportunidades de investimento.
          </p>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <Coin size={64} color='#1565C0' />
          <h2 className='font-bold text-blue-800'>
            Criptomoedas preferidas das baleias
          </h2>
          <p className='text-gray-800 text-justify'>
            Descubra quais criptomoedas estão sendo adquiridas pelas baleias do
            mercado e como isso pode influenciar o mercado financeiro.
          </p>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <Newspaper size={64} color='#1565C0' />
          <h2 className='font-bold text-blue-800'>Notícias do mercado</h2>
          <p className='text-gray-800 text-justify'>
            Fique por dentro das últimas notícias e atualizações sobre o mercado
            financeiro, incluindo eventos e tendências no setor de criptomoedas.
          </p>
        </div>
      </section>
      <Footer />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}
