import {React, useEffect} from 'react';
import "../../css/resgister.css";
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
  const [errorpassword, setErrorPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');


  const register = async (e) => {
    e.preventDefault();
    try {
      if(password==confirmpassword){
        const response = await fetch('http://127.0.0.1:8000/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, gender, name, address, phone }),
        });
        const data = await response.json(); 
      
        if (data["success"] === true) {
          window.location.href = "/login?message=register_success";
      } else {
        setErrorMessage("Registration unsuccessful");
      }
      }
      else{
      setErrorPassword("Password Mismatch");
      }
     
     } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred, please try again later");
    }
  };

  return(
    <>
     <div className='login-container'>
    
      <form>
        <div className="Register">
        
          <img id='logo' src="../assets/landinglogo.png"/>
          <h1>Sign Up</h1>
          
        <div className='inputform'>
        <CiUser className='icon' /> 
        <input type="text" name="name" placeholder="Enter your name" id='name' value={name} onChange={(e)=>setName(e.target.value)} className="inputicon" />
        </div>

        <div className='inputform'>
        <CiUser className='icon' /> 
        <input type="text" name="address" placeholder="Enter your address" id='address' value={address} onChange={(e)=>setAddress(e.target.value)} className="inputicon" />
        </div>

        <div className='inputform'>
        <CiUser className='icon' /> 
        <input type="text" name="phone" placeholder="Enter your phone" id='phone' value={phone} onChange={(e)=>setPhone(e.target.value)} className="inputicon" />
        </div>

        <div className='inputform'>
        <label htmlFor="gender">Gender:</label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
        </div>
        
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
          {errorpassword && <p className="error">{errorpassword}</p>}
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
