import React, { useState } from 'react';
import '../../css/verify.css'

export const Verification = () => {
  const [code, setCode] = useState(''); 
  // const [errorMessage, setErrorMessage] = useState('');
      const verify = async (e) => {
        e.preventDefault();
        const success=true
        if (success) {
          window.location.href = "/reset";
        }
            } 
     

  return (
    <>
      <div className='login-container'>
        <form>
          <div className="Forgot">
            <img id='logo' src="../assets/landinglogo.png"/>
            <h1>Verify Code</h1>
            <p>Enter the code sent to your provided email.If you didn't <br/> get the code please check your spam folder.</p>
            <div className='input-form'>
            <input type="text" name="code" placeholder="Enter OTP Code" value={code} onChange={(e) => setCode(e.target.value)} />
            </div>
            <button className='send-button' onClick={verify}>Send</button>
           <a href ="/reset" ></a>
            </div>       
        </form>
         
      </div>
    </>
  );
}

export default Verification;
