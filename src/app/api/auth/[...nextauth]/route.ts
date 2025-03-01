import NextAuth from 'next-auth'
import { authConfig } from '../../../../../auth'
import { NextRequest, NextResponse } from 'next/server'

import { NextApiRequest, NextApiResponse } from 'next'

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const nextApiReq = req as unknown as NextApiRequest
    const nextApiRes = res as unknown as NextApiResponse
    return await NextAuth(nextApiReq, nextApiRes, authConfig)
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const nextApiReq = req as unknown as NextApiRequest
    const nextApiRes = res as unknown as NextApiResponse
    return await NextAuth(nextApiReq, nextApiRes, authConfig)
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
