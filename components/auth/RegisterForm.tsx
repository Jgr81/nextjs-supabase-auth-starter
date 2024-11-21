import { useState } from 'react'
import { 
  Box, 
  Button, 
  TextField, 
  CircularProgress, 
  Alert, 
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Check, Close } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import NextLink from 'next/link'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/context/auth'
import { usePasswordValidation } from '@/lib/hooks/usePasswordValidation'

export const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const { validations, isValid } = usePasswordValidation(password)

  // Redirect if already logged in
  if (user) {
    router.push('/dashboard')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!isValid) {
      setError('Please ensure your password meets all requirements')
      return
    }

    setIsLoading(true)

    try {
        // Only handle signup, profile creation will be automatic
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
  
        if (signUpError) throw signUpError
  
        router.push('/auth/verify-email')
      } catch (err) {
        console.error('Registration error:', err)
        setError(err instanceof Error ? err.message : 'An error occurred during registration')
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
        id="fullName"
        label="Full Name"
        name="fullName"
        autoComplete="name"
        autoFocus
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        disabled={isLoading}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
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
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      
      <List dense sx={{ mt: 1, bgcolor: 'background.paper' }}>
        {Object.entries(validations).map(([key, valid]) => (
          <ListItem key={key}>
            <ListItemIcon>
              {valid ? (
                <Check color="success" />
              ) : (
                <Close color="error" />
              )}
            </ListItemIcon>
            <ListItemText
              primary={
                key === 'minLength'
                  ? 'At least 8 characters'
                  : key === 'hasNumber'
                  ? 'Contains a number'
                  : key === 'hasUppercase'
                  ? 'Contains uppercase letter'
                  : key === 'hasLowercase'
                  ? 'Contains lowercase letter'
                  : 'Contains special character'
              }
            />
          </ListItem>
        ))}
      </List>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading || !isValid}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Register'}
      </Button>
      <Box sx={{ textAlign: 'center' }}>
        Already have an account?{' '}
        <Link component={NextLink} href="/auth/login">
          Sign in
        </Link>
      </Box>
    </Box>
  )
}