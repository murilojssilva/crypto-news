import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  context: { params: Record<string, string> }
) {
  try {
    const { id } = context.params

    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Erro ao buscar o usuário:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar o usuário' },
      { status: 500 }
    )
  }
}
