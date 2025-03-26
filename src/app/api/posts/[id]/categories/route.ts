/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: any }) {
  const { id } = await params

  try {
    const postWithCategories = await prisma.post.findUnique({
      where: { id },
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    })

    if (!postWithCategories) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      postWithCategories.categories.map((cat) => cat.category)
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Erro ao buscar categorias' },
      { status: 500 }
    )
  }
}
