/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

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
    return NextResponse.json(
      { error: 'Erro ao buscar o usuário' },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request, { params }: { params: any }) {
  try {
    const { id } = await params
    const { firstName, lastName, updatedAt, password } = await req.json()

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'Nome e sobrenome são obrigatórios' },
        { status: 400 }
      )
    }

    const updateData: Record<string, any> = { firstName, lastName, updatedAt }

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
