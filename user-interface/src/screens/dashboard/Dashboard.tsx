import React from 'react'
import DataTable from '../../components/DataTable';
import { useAuth } from '../../hooks/useAuth';
import './dashboard.css';

const Dashboard = () => {
  const { isAuthenticated, token } = useAuth()

    return (
      <div className='dashboard'>
        {isAuthenticated && token && <DataTable token={token} />}
      </div>
    )
}

export default Dashboard