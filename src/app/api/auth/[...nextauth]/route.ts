import NextAuth from 'next-auth'
import { authConfig } from '../../../../../auth'
import { NextApiRequest, NextApiResponse } from 'next'

const authHandler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authConfig)

export default authHandler
