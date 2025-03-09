import { NextResponse } from 'next/server'
import { sign } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { UserCreateProps } from '@/app/interfaces/UserInterface'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(users)
  } catch (error) {
    console.error('Erro ao buscar users:', error)
    return NextResponse.json({ error: 'Erro ao buscar users' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { firstName, lastName, email, password, updatedAt, role, plan } = data

    console.log(data)

    if (
      !email ||
      !lastName ||
      !firstName ||
      !password ||
      !updatedAt ||
      !role ||
      !plan
    ) {
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
        role,
        plan: 'free',
        ...(plan === 'premium' && {
          startPremium: new Date() as string | Date,
          endPremium: new Date(
            new Date().setDate(new Date().getDate() + 30)
          ) as string | Date,
        }),
      } as UserCreateProps,
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
