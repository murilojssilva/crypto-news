import NextAuth from 'next-auth'
import { authConfig } from '../../../../../auth'

export const GET = (req, res) => NextAuth(req, res, authConfig)
export const POST = (req, res) => NextAuth(req, res, authConfig)
