/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { Prisma } from '@prisma/client'

export async function GET(req: Request, { params }: { params: any }) {
  try {
    const { id } = await params

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

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: 'Erro de requisição do Prisma: ' + error.message },
        { status: 500 }
      )
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        { error: 'Erro de requisição do Prisma: ' + error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Erro ao buscar o usuário' },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request, { params }: { params: any }) {
  try {
    const { id } = await params
    const { firstName, lastName, updatedAt, password, role, plan } =
      await req.json()

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'Nome e sobrenome são obrigatórios' },
        { status: 400 }
      )
    }

    const updateData: Record<string, any> = {
      firstName,
      lastName,
      updatedAt,
      role,
      plan,
    }

    if (plan === 'premium') {
      updateData.startPremium = new Date()
      updateData.endPremium = new Date(
        new Date().setDate(new Date().getDate() + 30)
      )
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    const updatedProfile = await prisma.user.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      message: 'Perfil atualizado com sucesso',
      updatedProfile,
    })
  } catch (error) {
    console.error('Erro ao editar o perfil:', error)
    return NextResponse.json(
      { error: 'Erro ao editar o perfil' },
      { status: 500 }
    )
  }
}
