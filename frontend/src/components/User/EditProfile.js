import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../../css/edit.css";

const EditProfile = () => {
  const [fullName, setFullName] = useState(""); // State variable for full name
  const [age, setAge] = useState(""); // State variable for age
  const [email, setEmail] = useState(""); // State variable for full name
  const [contact, setContact] = useState(""); // State variable for full name
  const [gender, setGender] = useState(""); // State variable for full name


  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to submit form data
  };

  return (
    <>
      <div className="outer-container">
        <Navbar />
        <div className="edit-container">
          <form onSubmit={handleSubmit}>
            <div className="edit-sections">
              <div className="e-heading">
                <img src="../assets/Profile.png" alt="Profile" />
                <button type="submit" className="changephoto">
                  Change Photo
                </button>
              </div>
              <div className="sections">
                <div className="inputs">
                  <label htmlFor="fullName">Full Name:</label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="inputs">
                  <label htmlFor="age">Age:</label>
                  <input
                    type="text"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="inputs">
                  <label htmlFor="gender">Gender:</label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="inputs">
                  <label htmlFor="email">Email Address:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="inputs">
                  <label htmlFor="contact">Contact number</label>
                  <input
                    type="contact"
                    id="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                <button type="submit" className="edit-button">
                  Edit
                </button>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default EditProfile;
