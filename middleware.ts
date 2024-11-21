import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        storageKey: 'auth-token',
        storage: {
          getItem: (key: string): string | null => {
            return req.cookies.get(key)?.value || null
          },
          setItem: (key: string, value: string) => {
            res.cookies.set({
              name: key,
              value,
              maxAge: 3600,
              path: '/'
            })
          },
          removeItem: (key: string) => {
            res.cookies.delete(key)
          }
        }
      }
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  console.log('🔍 Middleware Check:', {
    timestamp: new Date().toISOString(),
    path: req.nextUrl.pathname,
    hasSession: !!session,
    sessionUser: session?.user?.email,
    cookies: req.cookies.getAll().map(c => c.name)
  })

  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  if (session && req.nextUrl.pathname.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*']
} 