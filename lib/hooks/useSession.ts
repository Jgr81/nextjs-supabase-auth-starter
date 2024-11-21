import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export const useSession = () => {
  const router = useRouter()
  
  const getSessionFromCookie = () => {
    try {
      const value = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth-token='))
        ?.split('=')[1]
      
      if (value) {
        const session = JSON.parse(decodeURIComponent(value))
        return session.user || null
      }
      return null
    } catch (err) {
      return null
    }
  }

  const signOut = async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    await supabase.auth.signOut()
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/auth/login')
  }

  return {
    user: getSessionFromCookie(),
    signOut
  }
} 