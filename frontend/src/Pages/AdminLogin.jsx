import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Title from "../Components/Title";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Login successful", response.data);

        toast.success("Login successful", {
          position: "bottom-right"
        });

        // Store the token in local storage
        localStorage.setItem("token", response.data.token);

        // Set the Authorization header for future requests
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        navigate("/admin");
      } else {
        console.error("Login failed");
        toast.error("Login failed", {
          position: "bottom-right"
        });
      }
    } catch (error) {
      if (error.response) {
        console.error("Backend error response:", error.response.data);
        console.error("Status code:", error.response.status);
      } else if (error.request) {
        console.error("No response received", error.request);
      } else {
        console.error("Error", error.message);
      }
      toast.error("An error occurred", {
        position: "bottom-right"
      });
    }
  };

  return (
    <div className="component-container">
      <Title title={"Admin Login"} />
      <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div>
            <NavLink className={`switch-page`} to="/user/signup">
              <span className="switch-login-signup">
               Sign up as a user
              </span>
            </NavLink>
            <NavLink className={`switch-page`} to="/user/login">
              <span className="switch-login-signup">Login as a user</span>
            </NavLink>
          </div>

          <button className="btn-1" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
