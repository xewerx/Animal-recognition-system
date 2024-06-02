import React, { useEffect } from 'react';
import { BrowserRouter,Routes, Route,Navigate  } from 'react-router-dom'
import Dashboard from './screens/dashboard/Dashboard';
import userpool from './config/userpool';
import Home from './screens/home/Home';
import Login from './screens/login/Login';

function App() {

  useEffect(()=>{
    let user=userpool.getCurrentUser();
      if(user){
        <Navigate to="/dashboard" replace />
      }
  },[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;