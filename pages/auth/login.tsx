import React from 'react'
import { type NextPage } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'
import { Container, Paper, Typography } from '@mui/material'

const LoginPage: NextPage = () => {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <LoginForm />
      </Paper>
    </Container>
  )
}

export default LoginPage 