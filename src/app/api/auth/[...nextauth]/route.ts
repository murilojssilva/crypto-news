import { NextApiRequest, NextApiResponse } from 'next'
import { authConfig } from '../../../../../auth'
import NextAuth from 'next-auth'

export const GET = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authConfig)
}

export const POST = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authConfig)
}
