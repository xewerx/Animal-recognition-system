import React, { useState } from 'react'
import { Button, TextField,Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../services/authenticate';

const Login = () => {
  const Navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const formInputChange = (formField: string, value: React.SetStateAction<string>) => {
    if (formField === "email") {
      setEmail(value);
    }
    if (formField === "password") {
      setPassword(value);
    }
  };

  const validation = () => {
      setError('')

      if (email === '') {
        setError("Email is Required")
      }
      else if (password === '') {
        setError("Password is required")
      }
      else if (password.length < 6) {
        setError("Must be 6 character")
      }
  };

  const handleClick = () => {
    validation()

    if (!error && email && password) {
      
      authenticate(email,password)
        .then(()=>{
          setError('');
          Navigate('/dashboard');
        },(err)=>{
          console.log(err);
          setError(err.message)
        })
        .catch(err=>console.log(err))
    }
  }

  return (
    <div className="login">

      <div className='form'>
        <div className="formfield">
          <TextField
            value={email}
            onChange={(e) => formInputChange("email", e.target.value)}
            label="Email"
          />
        </div>
        <div className='formfield'>
          <TextField
            value={password}
            onChange={(e) => { formInputChange("password", e.target.value) }}
            type="password"
            label="Password"
          />
        </div>
        <div className='formfield'>
          <Button type='submit' variant='contained' onClick={handleClick}>Login</Button>
        </div>
        <Typography variant="body1">{error}</Typography>
      </div>

    </div>
  )
}

export default Login
