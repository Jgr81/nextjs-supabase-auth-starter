import { type NextPage } from 'next'
import { Container, Paper, Typography, Box } from '@mui/material'

const VerifyEmailPage: NextPage = () => {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 8 }}>
        <Box textAlign="center">
          <Typography variant="h4" component="h1" gutterBottom>
            Verify Your Email
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            We've sent you an email with a verification link. Please check your inbox and click the link to verify your email address.
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default VerifyEmailPage