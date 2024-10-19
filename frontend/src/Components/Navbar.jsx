import React from 'react'
import './Styles/Navbar.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login')
  }

  return (
    <nav>
        <h1 className='title'>Bank Information <span>Management System</span></h1>
        <div onClick={logout} className='btn-1 rounded-border'>Logout</div>
    </nav>
  )
}

export default Navbar