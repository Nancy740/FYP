import React, { useState } from 'react';



export const Reset = () => {
  const [newPassword, setNewPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  

  const reset = async (e) => {
    e.preventDefault();
    setEmail(localStorage.getItem('email'))
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return; 
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/reset/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          newPassword,
          email,
        }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.clear();
        window.location.href = "/login";
      } else {
        // Password reset failed, display error message
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to reset password. Please try again later.');
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
