/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(req: Request, { params }: { params: any }) {
  try {
    const { id } = await params

    const post = await prisma.post.findUnique({
      where: { id: id },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
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

export async function PUT(request: Request, { params }: { params: any }) {
  try {
    const { id } = params

    if (!id) throw new Error('ID não fornecido')

    const body = await request.json()
    console.log('BODY RECEBIDO:', body)

    const { title, subtitle, content, published, categories } = body

    await prisma.post.update({
      where: { id },
      data: {
        title,
        subtitle,
        content,
        published,
        updatedAt: new Date(),
      },
    })

    await prisma.postCategory.deleteMany({
      where: { postId: id },
    })

    const categoryNames = categories
      .map((cat: any) => (typeof cat === 'string' ? cat : cat?.id))
      .filter((name: string) => typeof name === 'string' && name.trim() !== '')

    const categoryObjects = await Promise.all(
      categoryNames.map(async (name: string) => {
        const existing = await prisma.category.findUnique({ where: { name } })
        if (existing) return { categoryId: existing.id }

        const created = await prisma.category.create({ data: { name } })
        return { categoryId: created.id }
      })
    )

    if (categoryObjects.length > 0) {
      await prisma.postCategory.createMany({
        data: categoryObjects.map((cat) => ({
          postId: id,
          categoryId: cat.categoryId,
        })),
        skipDuplicates: true,
      })
    } else {
      console.warn('Nenhuma categoria válida para adicionar.')
    }

    const postWithCategories = await prisma.post.findUnique({
      where: { id },
      include: {
        categories: {
          include: { category: true },
        },
      },
    })

    return new Response(JSON.stringify(postWithCategories), { status: 200 })
  } catch (error) {
    console.error('Erro ao editar o post:', error)
    return new Response('Erro ao atualizar post', { status: 500 })
  }
}
