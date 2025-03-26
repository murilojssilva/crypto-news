/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    return NextResponse.json({ error: 'Erro ao buscar posts' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { title, subtitle, content, published, userId, categories } =
      await req.json()

    if (!title || !content || !userId) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes' },
        { status: 400 }
      )
    }

    const categoryObjects = await Promise.all(
      categories.map(async (categoryName: string) => {
        const category = await prisma.category.findMany({
          where: { name: categoryName },
          take: 1,
        })

        if (category.length === 0) {
          const newCategory = await prisma.category.create({
            data: { name: categoryName },
          })
          return { categoryId: newCategory.id }
        }

        const firstCategory = category[0]

        return { categoryId: firstCategory.id }
      })
    )

    const newPost = await prisma.post.create({
      data: {
        title,
        subtitle,
        content,
        published,
        userId: userId,
        categories: {
          create: categoryObjects.map((cat) => ({
            category: {
              connect: { id: cat.categoryId },
            },
          })),
        },
      },
      include: { categories: { include: { category: true } } },
    })

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar o post:', error)
    return NextResponse.json({ error: 'Erro ao criar o post' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: any }) {
  try {
    const deletedPost = await prisma.post.delete({
      where: { id: params.id },
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
