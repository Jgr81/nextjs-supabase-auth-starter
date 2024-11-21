import { type NextPage } from 'next'
import { Container, Typography, Box, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const DashboardPage: NextPage = () => {
  const router = useRouter()

  const handleSignOut = async () => {
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
                try {
                  const value = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith(`${key}=`))
                    ?.split('=')[1]
                  
                  if (value) {
                    const session = JSON.parse(decodeURIComponent(value))
                    return session.access_token || null
                  }
                  return null
                } catch (err) {
                  return null
                }
              },
              setItem: (key: string, value: string) => {
                document.cookie = `${key}=${value}; path=/; max-age=3600`
              },
              removeItem: (key: string) => {
                document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`
              }
            }
          }
        }
      )

      await supabase.auth.signOut()
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
      router.push('/auth/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to your Dashboard
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </Box>
    </Container>
  )
}

export default DashboardPage