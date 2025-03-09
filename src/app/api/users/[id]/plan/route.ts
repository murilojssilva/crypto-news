/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { plan } = await req.json()

    if (!plan) {
      return NextResponse.json(
        { error: 'O plano é obrigatório' },
        { status: 400 }
      )
    }

    const updateData: Record<string, any> = { plan }

    if (plan === 'premium') {
      updateData.startPremium = new Date()
      updateData.endPremium = new Date(
        new Date().setDate(new Date().getDate() + 30)
      )
    } else {
      updateData.startPremium = null
      updateData.endPremium = null
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      message: 'Plano atualizado com sucesso',
      updatedUser,
    })
  } catch (error) {
    console.error('Erro ao atualizar o plano:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar o plano' },
      { status: 500 }
    )
  }
}
