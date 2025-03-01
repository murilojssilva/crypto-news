import { NextResponse } from 'next/server'
import { sign } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { firstName, lastName, email, password, updatedAt } = data

    if (!email || !lastName || !firstName || !password || !updatedAt) {
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
      },
    })

    const token = sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    )

    const response = NextResponse.json({
      message: 'Usuário criado com sucesso!',
      user,
    })

    response.headers.append(
      'Set-Cookie',
      `next-auth.session-token=${token}; Path=/; Max-Age=${
        60 * 60 * 24 * 7
      }; HttpOnly; Secure=${
        process.env.NODE_ENV === 'production'
      }; SameSite=Lax`
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
