import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import './navbar.css';

interface Props {
    handleLogout?: () => void
}

const Navbar = ({ handleLogout }: Props) => {

  return (
    <div className='container'>
      <AppBar position="static">
        <Toolbar className='toolbar'>
          <Typography variant="h6" className='title'>
            Animal Recognition System
          </Typography>
           {
           handleLogout && 
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
