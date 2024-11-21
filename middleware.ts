import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if it exists
  const { data: { session } } = await supabase.auth.getSession()

  // Log for debugging
  console.log('Middleware check:', {
    path: req.nextUrl.pathname,
    hasSession: !!session
  })

  // Protect dashboard and api routes
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    const redirectUrl = new URL('/auth/login', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect logged-in users away from auth pages
  if (session && req.nextUrl.pathname.startsWith('/auth/')) {
    const redirectUrl = new URL('/dashboard', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*'
  ]
} 