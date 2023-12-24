import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const LoginPage = () => {
 return(
  <>
    <div className="card">
    <img id='logo' src="assests\logo.png"/>
      <h2 className="logintxt">Log In</h2>
      <div className='inputform'>
      <i className="fas fa-user"></i>
      <input type="email" name="email" placeholder="   Enter the email" id="email" className="inputicon" />
      </div>
      <div className='inputform'>
      <i className="fas fa-lock"></i>
      <input type="password" name="password" placeholder="   Enter the password" id="password" className="input-with-icon"/>
     </div>
    <button >Log In</button>
  </div>
  {/* <Link to="/forgetpassword">Forgot Password?</Link> */}


</>
)}
export default LoginPage;


// const LoginPage = () => {
//   return(
//    <>
//      <form>
//   <div className="input-group">
//     <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
//     <input id="email" type="email" className="form-control" name="email" placeholder="Email"></input>
//   </div>
//   <div className="input-group">
//     <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
//     <input id="password" type="password" className="form-control" name="password" placeholder="Password"></input>
//   </div>
//   <div className="input-group">
//     <span className="input-group-addon">Text</span>
//     <input id="msg" type="text" className="form-control" name="msg" placeholder="Additional Info"></input>
//   </div>
// </form>
 
//  </>
//  )}
//  export default LoginPage;