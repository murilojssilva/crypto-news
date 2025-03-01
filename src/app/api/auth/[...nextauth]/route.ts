/* eslint-disable @typescript-eslint/no-explicit-any */

import NextAuth from 'next-auth'
import { authConfig } from '../../../../../auth'

export const GET = (req: any, res: any) => NextAuth(req, res, authConfig)
export const POST = (req: any, res: any) => NextAuth(req, res, authConfig)
