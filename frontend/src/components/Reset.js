import React, { useState } from 'react';


export const Reset = () => {
  const [newPassword, setNewPassword] = useState(''); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirming password
  const [errorMessage, setErrorMessage] = useState('');
  const reset = async (e) => {
    e.preventDefault();
 
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return; 
    }
    const success = true;
    if (success) {
      window.location.href = "/login";
    }
  };

  return (
    <>
      <div className='login-container'>
        <form>
          <div className="Forgot">
            <img id='logo' src="../assets/landinglogo.png"/>
            <h1>Reset Password</h1>
            <p>Create a new password that must contain 8 characters<br/> with a combination of letters,numbers, and <br/>special characters (@!#$.)<br/></p>
            
            <div className='input-form'>
            <input type="password" name="newPassword" placeholder="Enter the new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className='input-form'>
            <input type="password" name="confirmPassword" placeholder="Re-enter the new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button className='send-button' onClick={reset}>Reset</button> 
            {errorMessage && <p>{errorMessage}</p>} 
          </div>
        </form>
      </div>
    </>
  );
}

export default Reset;
