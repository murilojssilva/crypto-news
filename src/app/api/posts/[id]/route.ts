import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  context: { params: Record<string, string> }
) {
  try {
    const { id } = context.params

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

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params

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
