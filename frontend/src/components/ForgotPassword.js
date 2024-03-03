import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ForgetPassword = () => {
    const [email, setEmail] = useState(''); 


    const forgot = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
       
            const response = await fetch("http://127.0.0.1:8000/forgot/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }), // Send the email in the request body
            });

         
            const data = await response.json();

            
            if (data.success) {
                sessionStorage.setItem("email", email); // Store the email in session storage
                window.location.href = "/reset"; 
            }
        } catch (err) {
            console.log(err); 
        }
    };

 
    return (
        <>
            <div className='login-container'>
                <form>
                    <div className="Forgot">
                        <img id='logo' src="../assets/logo.png" alt="Logo" />
                        <h1>Forgot Password</h1>
                        <p>Please enter the valid email to get the verification code for password reset.</p>

                        <div className='forgot-inputform'>
                            <input type="email" name="email" placeholder="Enter the email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <button className='button' onClick={forgot}>Send</button>
                        <div className="verify-link">
                            <a href="/login">Back to login</a> 
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ForgetPassword;
