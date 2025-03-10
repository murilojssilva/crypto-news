'use client'

import 'react-toastify/dist/ReactToastify.css'
import Skeleton from 'react-loading-skeleton'

import { Home, DollarSign, Newspaper, Check } from 'lucide-react'
import HeaderDashboard from '@/app/components/Dashboard/Header'
import Sidebar from '@/app/components/Sidebar'
import { getSession, useSession } from 'next-auth/react'
import { useFormattedDate } from '@/hooks/useFormatted'
import { usePosts } from '@/context/PostContext'
import { Title } from '@/app/components/Dashboard/Title'
import { useUsers } from '@/context/UserContext'
import { Card } from '@/app/components/Dashboard/Card'
import { Button } from '@/app/components/Dashboard/Button'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { formatDate } from '@/hooks/formatDate'
import { formatUserRole } from '@/hooks/useUserRole'
import { formatUserPlan } from '@/hooks/useUserPlan'

export default function Dashboard() {
  const { data: session } = useSession()
  const currentDate = useFormattedDate()
  const skeletons = Array(8).fill('')

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
      <Sidebar />

      <div className='flex-1 overflow-auto'>
        <HeaderDashboard
          firstName={session?.user?.firstName as string}
          IconComponent={Home}
          currentDate={currentDate}
          title='Dashboard'
        />
        <section className='p-6  flex flex-col gap-4 overflow-y-auto'>
          <section className=''>
            <Title title='Dashboard' />
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
              <div className='py-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 md:grid-cols-3 gap-x-4 gap-y-8'>
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
                  <Card
                    text='Total de posts'
                    value={posts.length}
                    icon={<Newspaper color='black' />}
                  />
                )}

                {session?.user.role !== 'costumer' && (
                  <Card
                    text='Meus posts'
                    value={
                      posts.filter((item) => item.userId === session?.user.id)
                        .length
                    }
                    icon={<Newspaper color='black' />}
                  />
                )}
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
                        {formatDate(user.startPremium as Date)}
                      </td>
                      <td className='px-4 py-3 whitespace-nowrap'>
                        {formatDate(user.endPremium as Date)}
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
