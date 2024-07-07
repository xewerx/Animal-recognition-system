import React, { useEffect } from 'react';
import { BrowserRouter,Routes, Route,Navigate  } from 'react-router-dom'
import userpool from './config/userpool';
import Home from './screens/home/Home';
import Login from './screens/login/Login';
import Frame from './screens/frame/Frame';
import Dashboard from './screens/dashboard/dashboard';
import Navbar from './components/Navbar';

function App() {
  useEffect(()=>{
    let user = userpool.getCurrentUser()

    if(user){
      <Navigate to="/dashboard" replace />
    }
  }, [])

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/frame/:id" element={<Frame />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;