import React from 'react'
import DataTable from '../../components/DataTable';
import { useAuth } from '../../hooks/useAuth';
import './dashboard.css';
import Navbar from '../../components/Navbar';

const Dashboard = () => {
  const { handleLogout, isAuthenticated, token } = useAuth()

    return (
      <div className='dashboard'>
        <Navbar handleLogout={handleLogout}/>
        {isAuthenticated && token && <DataTable token={token} />}
      </div>
    )
}

export default Dashboard