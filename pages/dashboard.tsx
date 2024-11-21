import { type NextPage } from 'next'
import { Container, Typography, Box } from '@mui/material'

const DashboardPage: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to your Dashboard
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Your dashboard content goes here
        </Typography>
      </Box>
    </Container>
  )
}

export default DashboardPage