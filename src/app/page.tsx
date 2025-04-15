'use client'

import Footer from './components/Footer'
import { Header } from './components/Header'
import LatestNews from './components/Landing Page/LatestNews'
import 'react-loading-skeleton/dist/skeleton.css'
import { Coin } from '@phosphor-icons/react'
import { Blocks, Newspaper } from 'lucide-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSession } from 'next-auth/react'
import { Title } from './components/Dashboard/Title'
import Welcome from './components/Landing Page/Welcome'
import InformationCardItem from './components/Landing Page/InformationCardItem'
import PlansCard from './components/Landing Page/PlansCard'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className='flex flex-col min-h-screen bg-white'>
      <title>HomePage | CryptoNews</title>

      <Header />
      <Welcome />

      <LatestNews />

      <section className='flex flex-col items-center py-8 bg-gray-100'>
        <Title title='Nossos planos' />
        <div className='md:grid md:grid-cols-3 flex flex-col gap-4 md:gap-16 p-8'>
          <PlansCard
            title='Gratuito'
            value='0'
            myPlan={String(session?.user.plan)}
            plan='free'
          />

          <PlansCard
            title='Standard'
            value='49'
            myPlan={String(session?.user.plan)}
            plan='standard'
          />

          <PlansCard
            title='Premium'
            value='249'
            myPlan={String(session?.user.plan)}
            plan='premium'
          />
        </div>
      </section>

      <section className='flex flex-col md:flex-row bg-gray-200 justify-between p-8 gap-16'>
        <InformationCardItem
          text='Análises e insights sobre novos projetos no mercado de criptomoedas,
            com foco em tendências e potenciais oportunidades de investimento.'
          title='Análise de projetos'
          icon={Blocks}
        />
        <InformationCardItem
          text='Descubra quais criptomoedas estão sendo adquiridas pelas baleias do
            mercado e como isso pode influenciar o mercado financeiro.'
          title='Criptomoedas preferidas das baleias'
          icon={Coin}
        />
        <InformationCardItem
          text='Fique por dentro das últimas notícias e atualizações sobre o mercado
            financeiro, incluindo eventos e tendências no setor de criptomoedas.'
          title='Notícias do mercado'
          icon={Newspaper}
        />
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
