import React, { useState } from 'react';
import "../css/dashboard.css";
import MenuBar from './Menubar';
 







   
      const Dashboard = () => {   
  return (
    <>
    < MenuBar />
   
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

      <div className='accident-table'>

                    <table>
                        <thead>
                            <tr>
                               
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Medical Records</th>
                                <th>Sentiment Datar</th>
                                <th>Description</th>
                              
                            </tr>
                        </thead>
                    
                    </table>
                </div>
     
    </>
  );
};

export default Dashboard;



