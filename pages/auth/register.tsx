import React from 'react'
import { type NextPage } from 'next'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { Container, Paper, Typography } from '@mui/material'

const RegisterPage: NextPage = () => {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <RegisterForm />
      </Paper>
    </Container>
  )
}

export default RegisterPage