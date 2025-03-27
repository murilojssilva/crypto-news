/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CategoryProps } from '@/app/interfaces/CategoryInterface'

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
    const { id } = await params

    if (!id) {
      throw new Error('ID não fornecido')
    }

    const { title, subtitle, content, published, categories } =
      await request.json()

    const categoryNames = categories
      .map((cat: CategoryProps) => (typeof cat === 'string' ? cat : cat?.name))
      .filter((name: string) => typeof name === 'string' && name.trim() !== '')

    const categoryObjects = await Promise.all(
      categoryNames.map(async (categoryName: string) => {
        const category = await prisma.category.findUnique({
          where: { name: categoryName },
        })

        if (!category) {
          const newCategory = await prisma.category.create({
            data: { name: categoryName },
          })
          return { categoryId: newCategory.id }
        }

        return { categoryId: category.id }
      })
    )

    const updatePost = await prisma.post.update({
      where: { id },
      data: {
        title,
        subtitle,
        content,
        published,
        updatedAt: new Date(),
        categories: {
          connect: categoryObjects.map((cat) => ({
            postId_categoryId: {
              postId: id,
              categoryId: cat.categoryId,
            },
          })),
        },
      },
      include: { categories: { include: { category: true } } },
    })

    return new Response(JSON.stringify(updatePost), { status: 200 })
  } catch (error) {
    console.error('Erro ao editar o post:', error)
    return new Response('Erro ao atualizar post', { status: 500 })
  }
}
