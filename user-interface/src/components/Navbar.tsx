import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import './navbar.css';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { handleLogout, isAuthenticated } = useAuth()

  return (
    <div className='container'>
      <AppBar position="static">
        <Toolbar className='toolbar'>
          <Typography variant="h6" className='title'>
            Animal Recognition System
          </Typography>
           {
           isAuthenticated && 
                <Button
                    color="inherit"
                    className='button'
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            }
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;