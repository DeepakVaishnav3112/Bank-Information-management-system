import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AdminLogin from "./Pages/AdminLogin";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/user/login");
    }
  }, []);

  return (
    <div className="container">
      <Navbar />
      <ToastContainer />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
