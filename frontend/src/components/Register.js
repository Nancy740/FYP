import React from 'react';
import "../css/resgister.css";
import { useState } from 'react';
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmpassword }),
      });

      const data = await response.json(); // Assuming the response is JSON
      console.log(data); // Handle the response from the backend
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <>
     <div className='login-container'>
      <form>
        <div className="Register">
          <img id='logo' src="../assets/logo.png"/>
          <h1>Sign Up</h1>
  
        <div className='inputform'>
          <CiUser className='icon' /> 
          <input type="email" name="email" placeholder="Enter the email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)} className="inputicon" />
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
  
        <div className='inputform'>
          <CiLock className='icon' />
          <input type="password" name="password" placeholder="Enter the password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)} className="input-with-icon"/>
        </div>

        <div className='inputform'>
          <CiLock className='icon' />
          <input type="password" name="confirmpassword" placeholder="Re-enter the password" id='confirmpassword' value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="input-with-icon"/>
        </div>
       
        
        <button className='button' onClick={register}>Register</button>
        <hr /> {/* Horizontal line */}
        <button className='social-button'>
        <FcGoogle  className='social-icon'/>Login with Google</button>

        <button className="social-button">
        <BiLogoFacebookCircle /> Login with Facebook</button>
        <hr/> 
        
        <div className='login-link'>
          <a href="/login" >Already have an account?</a>
        </div>
      </div>
    </form>
  </div>
  
  </>
  )}
export default Register;
