import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import { authConfig } from '../../../../../auth'
import { NextRequest, NextResponse } from 'next/server'

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authConfig)
}

export async function POST(req: NextRequest, res: NextResponse) {
  const nextApiReq = req as unknown as NextApiRequest
  const nextApiRes = res as unknown as NextApiResponse
  return handler(nextApiReq, nextApiRes)
}
