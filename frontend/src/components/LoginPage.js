import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/login.css";
import { useState } from 'react';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const login = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data['success'] === true) {
        return (window.location.href = '/register');
      } 
      else {
        setErrorMessage('Please enter valid format.eg:abc@gmail.com');
      }
    } catch (error) {
      console.log(error);
    }
  };


 return(
  <>
   <div className='login-container'>
    <form>
      <div className="Login">
        <img id='logo' src="../assets/logo.png"/>
        <h1>Log In</h1>

      <div className='inputform'>
        <i className="fas fa-user"></i>
        <input type="email" name="email" placeholder="Enter the email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)} className="inputicon" />
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>

      <div className='inputform'>
        <i className="fas fa-lock"></i>
        <input type="password" name="password" placeholder="Enter the password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)} className="input-with-icon"/>
      </div>
     
      <div className="remember-forgot">
        <label><input type="checkbox" id="checkbox"/>Remember me</label>
        <a href="/forgetpassword"id='forgot-link'>Forgot password?</a>
      </div>
   
      <button onClick={login}>Login</button>
      <hr /> {/* Horizontal line */}
      <button><i className="fab fa-google" ></i> Login with Google</button>
      <button><i className="fab fa-facebook"></i> Login with Facebook</button>
      <hr /> 

      <div className='register-link'>
        <a href="/register">Create an Account</a>
      </div>
    </div>
  </form>
</div>

</>
)}

export default LoginPage;