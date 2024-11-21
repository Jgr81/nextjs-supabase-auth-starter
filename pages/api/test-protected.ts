import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the session from the request
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error || !session) {
    return res.status(401).json({ 
      error: 'Unauthorized',
      details: error?.message || 'No session found'
    })
  }

  res.status(200).json({ 
    message: 'If you see this, you are authenticated!',
    user: session.user.email 
  })
} 