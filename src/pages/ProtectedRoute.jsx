import React, { useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const {isAuthenticated} = useAuthContext()
    const navigate = useNavigate()

    useEffect(()=>{
        if (!isAuthenticated) {
            navigate('/');
            alert("please login to use the app")
        }
    },[isAuthenticated, navigate])
  return isAuthenticated ? children : null
}

export default ProtectedRoute