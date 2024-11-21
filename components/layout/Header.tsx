'use client'

import { useState } from 'react'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Menu, 
  MenuItem, 
  Avatar,
  IconButton
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js'

export const Header = () => {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<User | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  // Get initial session and subscribe to changes
  supabase.auth.onAuthStateChange((event, session) => {
    setUser(session?.user ?? null)
  })

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Your App
        </Typography>

        {user ? (
          <Box>
            <IconButton
              onClick={handleMenu}
              sx={{ padding: 0.5 }}
              aria-label="account menu"
            >
              <Avatar sx={{ bgcolor: 'secondary.main' }}>
                {user.email?.[0].toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem disabled>
                {user.email}
              </MenuItem>
              <MenuItem onClick={() => {
                handleClose()
                router.push('/account')
              }}>
                Account Settings
              </MenuItem>
              <MenuItem onClick={() => {
                handleClose()
                handleSignOut()
              }}>
                Sign Out
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button 
              color="inherit" 
              onClick={() => router.push('/auth/login')}
              sx={{ mr: 1 }}
            >
              Sign In
            </Button>
            <Button 
              variant="contained" 
              color="secondary"
              onClick={() => router.push('/auth/register')}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
} 