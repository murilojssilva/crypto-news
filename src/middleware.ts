import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const cookies = request.cookies
  const sessionToken = cookies.get('next-auth.session-token')

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!sessionToken) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
