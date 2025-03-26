/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(req: Request, { params }: { params: any }) {
  try {
    const { id } = await params

    const post = await prisma.post.findUnique({
      where: { id },
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Erro ao buscar o post:', error)

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
      { error: 'Erro ao buscar o post' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request, { params }: { params: any }) {
  try {
    const { id } = await params

    const deletedPost = await prisma.post.delete({
      where: { id },
    })

    return NextResponse.json({
      message: 'Post deletado com sucesso',
      deletedPost,
    })
  } catch (error) {
    console.error('Erro ao deletar o post:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar o post' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Ler o corpo da requisição uma única vez
    const { id, title, subtitle, content, published, categories } =
      await req.json()

    if (!id || !title || !subtitle || !content) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes' },
        { status: 400 }
      )
    }

    // Verificar se o post existe antes de atualizar
    const existingPost = await prisma.post.findUnique({ where: { id } })

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      )
    }

    // Atualização do post no Prisma
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        subtitle,
        content,
        published,
        categories: {
          connect:
            categories?.map((categoryId: string) => ({ id: categoryId })) || [],
        },
      },
    })

    return NextResponse.json(updatedPost, { status: 200 })
  } catch (error) {
    console.error('Erro ao editar o post:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
