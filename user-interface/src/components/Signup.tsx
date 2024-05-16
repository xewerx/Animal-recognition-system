import { Button, TextField} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {CognitoUserAttribute } from 'amazon-cognito-identity-js';


import userpool from '../userpool';



const Signup = () => {
  const attributes: CognitoUserAttribute[] = [];  // An empty array instead of null
  const Navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const formInputChange = (formField: string, value: React.SetStateAction<string>) => {
    if (formField === "email") {
      setEmail(value);
    }
    if (formField === "password") {
      setPassword(value);
    }
  };
  
  interface ValidationResult {
    email: string;
    password: string;
  }

  const validation = (): Promise<ValidationResult> => {
    if (email === '' && password === '') {
      setEmailErr("Email is Required");
      setPasswordErr("Password is required")
      resolve({email:"Email is Required",password:"Password is required"});
    }
    else if (email === '') {
      setEmailErr("Email is Required")
      resolve({email:"Email is Required",password:""});
    }
    else if (password === '') {
      setPasswordErr("Password is required")
      resolve({email:"",password:"Password is required"});
    }
    else if (password.length < 6) {
      setPasswordErr("must be 6 character")
      resolve({email:"",password:"must be 6 character"});
    }
    else{
      resolve({email:"",password:""});
    }
    reject('')
    return Promise.resolve({ email: '', password: '' });
  };
  
  // const validation = () => {
  //   return new Promise((resolve,reject)=>{
  //     if (email === '' && password === '') {
  //       setEmailErr("Email is Required");
  //       setPasswordErr("Password is required")
  //       resolve({email:"Email is Required",password:"Password is required"});
  //     }
  //     else if (email === '') {
  //       setEmailErr("Email is Required")
  //       resolve({email:"Email is Required",password:""});
  //     }
  //     else if (password === '') {
  //       setPasswordErr("Password is required")
  //       resolve({email:"",password:"Password is required"});
  //     }
  //     else if (password.length < 6) {
  //       setPasswordErr("must be 6 character")
  //       resolve({email:"",password:"must be 6 character"});
  //     }
  //     else{
  //       resolve({email:"",password:""});
  //     }
  //     reject('')
  //   });
  // };

  const handleClick = () => {
    setEmailErr("");
    setPasswordErr("");
    validation()
    .then((res: ValidationResult) => {
        if (res.email === '' && res.password === '') {
          const attributeList: CognitoUserAttribute[] = [];
          attributeList.push(
            new CognitoUserAttribute({
              Name: 'email',
              Value: email,
            })
          );
          let username=email;
          // userpool.signUp(username, password, attributeList, null, (err: any, data: any) => {
          userpool.signUp(username, password, attributeList, attributes, (err: any, data: any) => {
            if (err) {
              console.log(err);
              alert("Couldn't sign up");
            } else {
              console.log(data);
              alert('User Added Successfully');
              Navigate('/dashboard');
            }
          });
        }
      }, err => console.log(err))
      .catch(err => console.log(err));
  }

  return (
    <div className="signup">

      <div className='form'>
        <div className="formfield">
          <TextField
            value={email}
            onChange={(e) => formInputChange("email", e.target.value)}
            label="Email"
            helperText={emailErr}
          />
        </div>
        <div className='formfield'>
          <TextField
            value={password}
            onChange={(e) => { formInputChange("password", e.target.value) }}
            type="password"
            label="Password"
            helperText={passwordErr}
          />
        </div>
        <div className='formfield'>
          <Button type='submit' variant='contained' onClick={handleClick}>Signup</Button>
        </div>
      </div>

    </div>
  )
}

export default Signup

function reject(arg0: string) {
  throw new Error('Function not implemented.');
}
function resolve(arg0: { email: string; password: string; }) {
  throw new Error('Function not implemented.');
}

