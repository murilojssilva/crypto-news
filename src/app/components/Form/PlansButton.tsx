'use client'

import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

interface PlansButtonProps {
  myPlan: string
  plan: string
}

export default function PlansButton({ myPlan, plan }: PlansButtonProps) {
  const { data: session } = useSession()
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
    <button
      type='button'
      onClick={() => {
        if (myPlan !== plan) {
          handleAssignPremium(plan)
        }
      }}
      className={`text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center
                      ${
                        myPlan !== plan
                          ? 'bg-blue-600 hover:bg-blue-700 '
                          : ' bg-gray-500 hover:bg-gray-600  cursor-not-allowed'
                      }
                    `}
    >
      {myPlan !== plan ? 'Escolher plano' : 'Meu plano'}
    </button>
  )
}
