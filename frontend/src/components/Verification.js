// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// export const Verification = () => {
//   const [code, setCode] = useState(''); 
//   const [errorMessage, setErrorMessage] = useState('');
//       const verify = async (e) => {
//         e.preventDefault();
//         const success=true
//         if (success) {
//           window.location.href = "/reset";
//         }
//             } 
     

//   return (
//     <>
//       <div className='login-container'>
//         <form>
//           <div className="Forgot">
//             <img id='logo' src="../assets/logo.png"/>
//             <h1>Verify Code</h1>
//             <p>Enter the code sent to your provided <br/> email.If you didn't get the code<br/>please check your spam folder.</p>
//             <input type="text" name="code" placeholder="Enter OTP Code" value={code} onChange={(e) => setCode(e.target.value)} />
//             <button  onClick={verify}>Send</button>
//            <a href ="/reset" ></a>
//             </div>       
//         </form>
         
//       </div>
//     </>
//   );
// }

// export default Verification;
