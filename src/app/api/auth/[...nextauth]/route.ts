// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth'
import { authConfig } from '../../../../../auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Aqui, usamos NextAuth para lidar com a autenticação
    return await NextAuth(req, res, authConfig)
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // O mesmo vale para o GET, que pode ser usado para obter informações de sessão, por exemplo.
    return await NextAuth(req, res, authConfig)
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
