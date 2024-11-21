import { type NextPage } from 'next'
import { Container, Paper, Typography } from '@mui/material'
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm'

const ResetPasswordPage: NextPage = () => {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Set New Password
        </Typography>
        <ResetPasswordForm />
      </Paper>
    </Container>
  )
}

export default ResetPasswordPage