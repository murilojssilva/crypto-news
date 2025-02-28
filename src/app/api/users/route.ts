import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const { firstName, lastName, email, password } = data

    if (!email || !lastName || !firstName || !password) {
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'E-mail já cadastrado' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        updatedAt: new Date(),
      },
    })

    const response = NextResponse.json({
      message: 'Usuário criado com sucesso!',
      user,
    })

    response.headers.set(
      'Set-Cookie',
      `@cryptonews:userId=${user.id}; Path=/; Max-Age=${
        60 * 60 * 24 * 7 // 7 days
      }; HttpOnly; Secure; SameSite=Strict`
    )

    return response
  } catch (error) {
    console.error('Erro ao criar o usuário:', error)
    return NextResponse.json(
      { message: 'Erro ao criar o usuário' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    console.error('Erro ao listar os usuários:', error)
    return NextResponse.json(
      { message: 'Erro ao listar os usuários' },
      { status: 500 }
    )
  }
}
