import { type NextPage } from 'next'
import { Container, Paper, Typography } from '@mui/material'
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'

const ForgotPasswordPage: NextPage = () => {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reset Password
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Enter your email address and we'll send you a link to reset your password.
        </Typography>
        <ForgotPasswordForm />
      </Paper>
    </Container>
  )
}

export default ForgotPasswordPage