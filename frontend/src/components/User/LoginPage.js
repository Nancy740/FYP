import React, { useState } from "react";
import "../../css/login.css";
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import 'reactjs-popup/dist/index.css';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const message = searchParams.get("message");
    if (message === "register_success") {
      setSuccessMessage("Registration successful!"); // Set the success message state
      // Clear the success message after 5 seconds
      const timerId = setTimeout(() => {
        setSuccessMessage("");
      }, 100000);
      // Clear the timer when the component unmounts or the success message changes
      return () => clearTimeout(timerId);
    }
  }, [location.search]);
  const setCookies = (name, value, days) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };
  const login = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data["success"] === true) {
      
        setCookies("token", data.message, 1);
        window.location.href = "/landing?message=login_success";

      } else {
        setErrorMessage("Please enter valid format.eg:abc@gmail.com");
      }
    } catch (error) {
      console.log(error);
    }
   
  };

  return (
    <>
      <div className="login-container">
        <form>
          <div className="Login">
          {successMessage && (
          <div className="register-message">{successMessage}</div>
        )}
            <img id="logo" src="../assets/landinglogo.png" alt="Logo" />
            <h1>Log In</h1>

            <div className="inputform">
              <CiUser className="icon" />
              <input type="email" name="email" placeholder="Enter the email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            
            </div>
            {errorMessage && <p className="error">{errorMessage}</p>}

            <div className="inputform">
              <CiLock className="icon" />
              <input type="password" name="password" placeholder="Enter the password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" id="checkbox" />
                Remember me{" "}
              </label>
              <a href="/forgot" id="forgot-link" >
                Forgot password?
              </a>
              
            </div>

            <button className="button" onClick={login}>Login</button>
        
            <hr />
            <button className="social-button" >
              <FcGoogle className="social-icon" />
              Login with Google
            </button>

            <button className="social-button">
              <BiLogoFacebookCircle /> Login with Facebook
            </button>
            <hr />

            <div className="register-link">
              <a href="/register">Create an Account</a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
