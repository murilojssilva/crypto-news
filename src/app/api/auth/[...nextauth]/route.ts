import { authConfig } from '../../../../../auth'
import NextAuth from 'next-auth'

export const GET = (req: any, res: any) => {
  return NextAuth(req, res, authConfig)
}

export const POST = (req: any, res: any) => {
  return NextAuth(req, res, authConfig)
}
