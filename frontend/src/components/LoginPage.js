import React, { useState } from "react";
import "../css/login.css";
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import 'reactjs-popup/dist/index.css';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        setIsLoggedIn(true); 
        console.log("isLoggedIn:", isLoggedIn); 
        return (window.location.href = "/landing");
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
            {isLoggedIn && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Login successful.
        </Alert>
      )}
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
