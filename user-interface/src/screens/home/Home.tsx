import React from 'react'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './home.css';
import Navbar from '../../components/Navbar';

const Home = () => {
    const Navigate=useNavigate();

    return (
        <>
            <div className='home'>
                <Navbar/>
                <Typography variant='h3'>Animal Recognition System</Typography>
                <div className='homeButtons'>
                    <Button style={{margin:'10px'}} variant='contained' onClick={()=>Navigate('/login')}>
                        Login
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Home