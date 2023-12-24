import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
// import './stylecss/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingPage = () => {
  return (
    <>
   
     {/* <img id='mainimage' src='assests\image.png'></img> */}
      <div className="containerlog">
        <div className="contentlog">
        <img id='mainlogo' src="assests\logo.png"/>
          <h1 style={{ marginTop: '5rem' }}>MENTAL HEALTH <br />
              <span>SENTIMENTAL ANALYSIS</span> <br />
              </h1>
          <p className="par">
          The project analyze data with the help of machine learning and algorithms  <br/>for the early detection of mental health diseases in social media users.
          </p>
          <a href="/login"> <button>Get Started</button></a>
        </div>
      <div className="formlog">
        <img id='sideimage' src="assests\sideimage.jpg" alt="picture" />
      
      </div>
    </div>
     
    </>
  );
};

export default LandingPage;


     