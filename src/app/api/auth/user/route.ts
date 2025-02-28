import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Buscar o usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, passwordHash: true }, // Certifique-se de ter o campo de senha no banco
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Senha inválida' }, { status: 401 })
    }

    return NextResponse.json({ userId: user.id })
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    return NextResponse.json(
      { message: 'Erro ao buscar usuário' },
      { status: 500 }
    )
  }
}
