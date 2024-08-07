import React from 'react'
import Sidebar from '../components/Sidebar'
import styles from './AppLayout.module.css'
import Map from '../components/Map'
import User from '../components/User'
import { useAuthContext } from '../context/AuthContext'

function AppLayout() {
  const { isAuthenticated } = useAuthContext()
  return (
    <div className={styles.app}>
        <Sidebar />
        <Map></Map>
       {isAuthenticated && <User></User>}
    </div>
  )
}

export default AppLayout