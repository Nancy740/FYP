import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Button from '@mui/material/Button'; // Unused import, can be removed
import "../../css/medical.css";

const Medical = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    diagnosis: [{ name: "", value: "" }], // Array to store dynamic diagnosis fields
    medications: [{ name: "", dosage: "" }] // Array to store dynamic medication fields
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch('http://127.0.0.1:8000/medical/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Data submitted successfully');
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  

  const handleInputChange = (e, index, type) => {
    const { name, value } = e.target;
    if (type === "diagnosis") {
      const updatedDiagnosis = [...formData.diagnosis]; // Create a copy of the diagnosis array
      updatedDiagnosis[index] = { ...updatedDiagnosis[index], [name]: value }; // Update the specific diagnosis item
      setFormData({ ...formData, diagnosis: updatedDiagnosis }); // Update the formData state with the new diagnosis array
    } else if (type === "medications") {
      const updatedMedications = [...formData.medications]; // Create a copy of the medications array
      updatedMedications[index] = { ...updatedMedications[index], [name]: value }; // Update the specific medication item
      setFormData({ ...formData, medications: updatedMedications }); // Update the formData state with the new medications array
    }
  };

  const handleAddMore = (type) => {
    if (type === "diagnosis") {
      setFormData({ ...formData, diagnosis: [...formData.diagnosis, { name: "", value: "" }] });
    } else if (type === "medications") {
      setFormData({ ...formData, medications: [...formData.medications, { name: "", dosage: "" }] });
    }
  };
  
  return (
    <>
      <div className="medical-container">
        {/* <Navbar /> */}
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-sections">
              <div className="m-heading">
                <h2>Medical Health History</h2>
              </div>
              <div className="section">
                <h2>Profile</h2>
                <div className="input-group">
                  <label>Full Name:</label>
                  {/* Add value and onChange handler */}
                  <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                </div>
                <div className="input-group">
                  <label>Age:</label>
                  {/* Add value and onChange handler */}
                  <input type="text" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
                </div>
              </div>

              <div className="section">
                <h2>Previous Diagnosis</h2>
                {formData.diagnosis.map((item, index) => (
                  <div key={index} className="input-group">
                    <label>{`Diagnosis ${index + 1}:`}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange(e, index, "diagnosis")}
                    />
                  </div>
                ))}
                <button className='add-more' onClick={() => handleAddMore("diagnosis")}>Add more...</button>
              </div>

              <div className="section">
                <h2>Medications</h2>
               
                {formData.medications.map((item, index) => (
                  <div key={index} className="input-group">
                    <label>{`Medication ${index + 1}:`}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange(e, index, "medications")}
                    />
                    <div className="input-group">
                      <label>Dosage:</label>
                      <input
                        type="text"
                        value={formData.dosage}
                        onChange={(e) => handleInputChange(e, index, "medications")}
                      />
                    </div>
                  </div>
                ))}
                <button className='add-more' onClick={() => handleAddMore("medications")}>Add more...</button>
              </div>
              <button type="submit" className='submit-button-medical'>Submit</button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Medical;
