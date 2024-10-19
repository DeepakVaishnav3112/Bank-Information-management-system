import React from 'react'
import './Styles/Navbar.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    navigate("/user/login");
  }

  // List of routes where the Logout button should not be displayed
  const hideLogoutRoutes = ["/user/login", "/user/signup", "/admin/login"];

  return (
    <nav>
      <h1 className='title'>Bank Information <span>Management System</span></h1>
      {/* Conditionally render the Logout button */}
      {!hideLogoutRoutes.includes(location.pathname) && (
        <div onClick={logout} className='btn-1 rounded-border'>Logout</div>
      )}
    </nav>
  )
}

export default Navbar;
