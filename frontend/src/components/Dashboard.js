import React, { useState } from 'react';

import "../css/dashboard.css";
import Navbar from './Navbar';


const Dashboard = () => {
  return (
    <>
    <Navbar/>
      <div className= 'container '>
        <h1>Welcome to Dashboard</h1>
        <div className='stats'>
          <div className="stat">
            <h3>Anxiety Ratio</h3>
            {/* <p>{TotalOfficers}</p> */}
          </div>
          <div className="stat">
            <h3>Depression Ratio</h3>
            {/* <p>{TotalVoilation}</p> */}
          </div>
          <div className="stat">
            <h3>Stress Ratio</h3>
            {/* <p>{TotalAccident}</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;


     