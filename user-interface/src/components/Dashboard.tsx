import { Button } from '@mui/material'
import React,{useEffect, useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import userpool from '../userpool'
import { logout } from '../services/authenticate';

import axios from 'axios';
import { CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';
import DataTable from './DataTable';

// const Dashboard = () => {

//   const Navigate = useNavigate();

//   useEffect(()=>{
//     let user=userpool.getCurrentUser();
//     console.log(user);
//     if(!user){
//       Navigate('/login');
//     }
//   },[Navigate]);

const userPoolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID!,
  ClientId: process.env.REACT_APP_CLIENT_ID!
};

const userPool = new CognitoUserPool(userPoolData);


const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const user = userPool.getCurrentUser();

    if (user) {
      user.getSession((err: Error | null, session: CognitoUserSession | null) => {
        if (err || !session) {
          navigate('/login');
        } else {
          setToken(session.getIdToken().getJwtToken());
          setIsAuthenticated(true);
        }
      });
    } else {
      navigate('/login');
    }
  }, [navigator]);
    const handleLogout = () => {
      const user = userPool.getCurrentUser();
      if (user) {
        user.signOut();
      }
      navigate('/login');
    };

    return (
      <div className='Dashboard'>
        <Button
          style={{margin:"10px"}}
          variant='contained'
          onClick={handleLogout}
        >
          Logout
        </Button>

        {isAuthenticated && token && <DataTable token={token} />}


      </div>
    )
}

export default Dashboard