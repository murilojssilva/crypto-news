import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.category.findMany()
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar categorias' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json()

    if (!name) {
      return NextResponse.json(
        { error: 'Campo "name" é obrigatório' },
        { status: 400 }
      )
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    })

    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar a categoria:', error)
    return NextResponse.json(
      { error: 'Erro ao criar a categoria' },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name } = await req.json()

    if (!id || !name) {
      return NextResponse.json(
        { error: 'Campos "id" e "name" são obrigatórios' },
        { status: 400 }
      )
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name },
    })

    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error('Erro ao editar a categoria:', error)
    return NextResponse.json(
      { error: 'Erro ao editar a categoria' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Campo "id" é obrigatório' },
        { status: 400 }
      )
    }

    const deletedCategory = await prisma.category.delete({
      where: { id },
    })

    return NextResponse.json(deletedCategory)
  } catch (error) {
    console.error('Erro ao deletar a categoria:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar a categoria' },
      { status: 500 }
    )
  }
}
