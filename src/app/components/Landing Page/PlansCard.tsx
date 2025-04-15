import { BadgeCheck } from 'lucide-react'
import { useTheme } from 'next-themes'
import PlansButton from '../Form/PlansButton'

interface PlansCardProps {
  value: string
  title: string
  myPlan: string
  plan: string
}

const features = [
  'Notícias e análises do mercado',
  'Acompanhamento das criptomoedas',
  'Conteúdos educativos',
  'Gráficos com indicadores',
  'Relatórios e estratégias',
  'Gestão de portfólio',
  'Discord e Telegram',
]

export default function PlansCard({
  value,
  title,
  myPlan,
  plan,
}: PlansCardProps) {
  const { resolvedTheme } = useTheme()

  const activeFeatureCount =
    {
      free: 3,
      standard: 5,
      premium: 7,
    }[plan] || 0

  return (
    <div
      className={`w-full max-w-sm p-4 border-2 rounded-lg shadow-sm sm:p-8 transition-colors
        ${
          resolvedTheme === 'light'
            ? 'bg-gray-50 border-gray-200 hover:border-gray-300'
            : 'bg-gray-800 border-gray-700 hover:border-gray-800'
        }`}
    >
      <h5
        className={`mb-4 text-xl font-medium 
          ${resolvedTheme === 'light' ? 'text-blue-800' : 'text-blue-400'}`}
      >
        {title}
      </h5>
      <div
        className={`flex items-baseline 
          ${resolvedTheme === 'light' ? 'text-blue-800' : 'text-blue-400'}`}
      >
        <span className='text-3xl font-semibold'>R$</span>
        <span className='text-5xl font-extrabold tracking-tight'>{value}</span>
        <span
          className={`ms-1 text-xl font-normal 
            ${resolvedTheme === 'light' ? 'text-gray-800' : 'text-gray-400'}`}
        >
          /mês
        </span>
      </div>
      <ul role='list' className='space-y-5 my-7'>
        {features.map((feature, index) => {
          const isActive = index < activeFeatureCount
          return (
            <li
              key={index}
              className={`flex items-center ${
                !isActive ? 'line-through decoration-gray-500' : ''
              }`}
            >
              <BadgeCheck
                size={20}
                fill={isActive ? 'blue' : 'gray'}
                color='white'
              />
              <span
                className={`text-base font-normal leading-tight ms-3
                  ${
                    resolvedTheme === 'light'
                      ? isActive
                        ? 'text-gray-800'
                        : 'text-gray-400'
                      : isActive
                      ? 'text-gray-200'
                      : 'text-gray-500'
                  }`}
              >
                {feature}
              </span>
            </li>
          )
        })}
      </ul>
      {myPlan !== plan && <PlansButton myPlan={String(myPlan)} plan={plan} />}
    </div>
  )
}
