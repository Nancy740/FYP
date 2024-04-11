import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../css/medical.css";

const Medical = () => {
  return (
    <>
     <Navbar />
        
      <div className="medical-container">
     
  <div className="form-container">
    <form>
      <div className="form-sections">
        <div className="m-heading">
          <h2>Medical Health History</h2>
        </div>
        <div className="section">
          <h2>Profile</h2>
          <div className="input-group">
            <label>Full Name:</label>
            <input type="text" />
          </div>
          <div className="input-group">
            <label>Age:</label>
            <input type="text" />
          </div>
        </div>

        <div className="section">
          <h2>Previous Diagnosis</h2>
          <div className="input-group">
            <label>Diagnosis 1:</label>
            <input type="text" />
          </div>
          <div className="input-group">
            <label>Diagnosis 2:</label>
            <input type="text" />
          </div>
          <button>Add more</button>
        </div>

        <div className="section">
          <h2>Medications</h2>
          <div className="input-group">
            <label>Medication 1:</label>
            <input type="text" />
            <div className="input-group">
              <label>Dosage:</label>
              <input type="text" />
            </div>
          </div>
          <div className="input-group">
            <label>Medication 2:</label>
            <input type="text" />
            <div className="input-group">
              <label>Dosage:</label>
              <input type="text" />
            </div>
          </div>

          <button>Add more</button>
        </div>
        <button className='submit-button-medical'>Submit</button>
      </div>
    </form>
  </div>
  <Footer />
</div>


 
    </>
  );
};

export default Medical;
