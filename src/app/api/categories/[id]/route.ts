/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(req: Request, { params }: { params: any }) {
  try {
    const { id } = await params

    const category = await prisma.category.findUnique({
      where: { id },
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('Erro ao buscar a categoria:', error)

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
      { error: 'Erro ao buscar a categoria' },
      { status: 500 }
    )
  }
}
