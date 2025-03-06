/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    return NextResponse.json(
      { error: 'Erro ao buscar o post' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request, { params }: { params: any }) {
  try {
    const { id } = params

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

export async function PUT(req: Request, { params }: { params: any }) {
  try {
    const { id } = params
    const { title, subtitle, content, published } = await req.json()

    // Check if all required fields are provided
    if (!title || !subtitle || !content) {
      return NextResponse.json(
        { error: 'Título, subtítulo e conteúdo são obrigatórios' },
        { status: 400 }
      )
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, subtitle, content, published },
    })

    return NextResponse.json({
      message: 'Post atualizado com sucesso',
      updatedPost,
    })
  } catch (error) {
    console.error('Erro ao editar o post:', error)
    return NextResponse.json(
      { error: 'Erro ao editar o post' },
      { status: 500 }
    )
  }
}
