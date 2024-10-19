import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Title from "../Components/Title";
import { toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: username,
      email: email,
      password: password,
    };

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Signup successful", response.data);

        toast.success("Signup succesfully", {
          position: "bottom-right"
        });

        // Store the token in local storage
        localStorage.setItem("token", response.data.token);

        // Set the Authorization header for future requests
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        navigate("/");
      } else {
        console.error("Signup failed");
        toast.error("Signup failed", {
          position: "bottom-right"
        });
        setIsLoading(false);
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
      toast.error("Signup failed", {
        position: "bottom-right"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="component-container">
      <Title title={"User Signup"} />
      <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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

          <div className="switch-page-btns">
            <NavLink className={`switch-page`} to="/user/login">
              <span className="switch-login-signup">Already have an account?</span>
            </NavLink>
            <NavLink className={`switch-page`} to="/admin/login">
              <span className="switch-login-signup">Login as an admin</span>
            </NavLink>
          </div>

          <button className="btn-1" type="submit">
            { isLoading ? 'Signing Up' : 'Sign Up' }
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
