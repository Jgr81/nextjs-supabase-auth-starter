import { useState } from 'react'
import { Box, Button, TextField, CircularProgress, Alert, Link } from '@mui/material'
import NextLink from 'next/link'
import { createClient } from '@supabase/supabase-js'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toISOString()} - ${message}`])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLogs([])
    addLog('🔵 Form submitted')
    setError(null)
    setIsLoading(true)

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          auth: {
            persistSession: true,
            storageKey: 'auth-token',
            storage: {
              getItem: (key: string): string | null => {
                addLog(`🔍 Getting cookie: ${key}`)
                const value = document.cookie
                  .split('; ')
                  .find((row) => row.startsWith(`${key}=`))
                  ?.split('=')[1]
                return value || null
              },
              setItem: (key: string, value: string) => {
                addLog(`📝 Setting cookie: ${key}`)
                document.cookie = `${key}=${value}; path=/; max-age=3600`
              },
              removeItem: (key: string) => {
                addLog(`🗑️ Removing cookie: ${key}`)
                document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`
              }
            }
          }
        }
      )

      addLog('🟡 Starting login process')
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) {
        addLog('🔴 Sign in error: ' + signInError.message)
        throw signInError
      }

      addLog('🟢 Sign in successful: ' + data.user?.email)

      const { data: { session } } = await supabase.auth.getSession()
      addLog('🟣 Current session: ' + (session ? 'exists' : 'null'))

      if (!session) {
        addLog('🔴 No session after login')
        throw new Error('No session established')
      }

      addLog('🍪 Current cookies: ' + document.cookie)

      addLog('⏳ Waiting 5 seconds before redirect...')
      await new Promise(resolve => setTimeout(resolve, 5000))

      addLog('🚀 Redirecting to dashboard...')
      window.location.href = '/dashboard'
    } catch (err) {
      addLog('🔴 Login error: ' + (err instanceof Error ? err.message : 'Unknown error'))
      setError(err instanceof Error ? err.message : 'An error occurred during sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
      </Button>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Link component={NextLink} href="/auth/forgot-password">
          Forgot password?
        </Link>
      </Box>
      
      {/* Display logs */}
      {logs.length > 0 && (
        <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {logs.join('\n')}
          </pre>
        </Box>
      )}
    </Box>
  )
}