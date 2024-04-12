import React, { useState } from "react";
import Navbar from "./Navbar";
import "../css/main.css";
import Footer from "./Footer";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";


const LandingPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};


  const submit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://127.0.0.1:8000/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Form submitted successfully");
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };
// 
  return (
    <>
      <Navbar />

      <div className="main">
        <div className="landing">
          <div className="grid1">
            <h1>“Discover Your Well-being”</h1>
            <p>
              Embark on a journey towards better mental health. Our
              comprehensive questionnaire is designed to offer insights into
              your emotional well-being, providing personalized recommendations
              to support your mental wellness.
            </p>
            <a href="/login">
              <button className="land-button">Get Started</button>
            </a>
          </div>
          <div className="grid2">
            <img src="../assets/image.png" alt="Well-being illustration" />
          </div>
        </div>
        <div className="about">
          <div className="heading">
            <h1>About Us</h1>
          </div>
          <p>
            We are passionately dedicated to promoting mental health awareness
            and fostering well-being within our community. Our mission is simple
            yet profound:<br></br>
            we strive to empower individuals with the tools, resources, and
            insights necessary to enhance their emotional resilience and lead
            fulfilling lives. Our team consists<br></br> of dedicated
            professionals, including mental health counselors, educators, and
            advocates, who are passionate about making a positive impact on the
            lives of others.<br></br> We leverage evidence-based practices and
            innovative approaches to provide comprehensive support and guidance
            to individuals of all ages and backgrounds.
          </p>
        </div>
        <div className="provide">
          <div className="heading">
            <h1>What We Provide?</h1>
          </div>
          <div className="grid-container">
            <div className="grid-1">
              <img
                src="../assets/second.png"
                alt="Comprehensive questions icon"
              />
              <p>Comprehensive Questions</p>
            </div>
            <div className="grid-2">
              <img
                src="../assets/first.png"
                alt="Personalized recommendations icon"
              />
              <p>Personalized Recommendations</p>
            </div>
            <div className="grid-3">
              <img src="../assets/third.png" alt="Privacy and security icon" />
              <p>Privacy and Security</p>
            </div>
          </div>
        </div>

        <div className="instruction">
          <div className="heading">
            <h1>How It Works?</h1>
          </div>
          <div className="instruction-container">
            <div className="ins-grid-1">
              <h2>STEP 1</h2>
              <img src="../assets/image 3.png" alt="Step 1 icon" />
              <p>"Create an Account or Log In"</p>
            </div>
            <div className="ins-grid-2">
              <h2>STEP 2</h2>
              <img src="../assets/image 4.png" alt="Step 2 icon" />
              <p>"Answer Thoughtful Questions"</p>
            </div>
            <div className="ins-grid-3">
              <h2>STEP 3</h2>
              <img src="../assets/image 5.png" alt="Step 3 icon" />
              <p>"Receive Result and Recommendations"</p>
            </div>
          </div>
        </div>

        <div className="contact-container">
          <div className="contact">
            <div className="heading-1">
              <h1>Contact Us</h1>
            </div>

            <div className=" contact-form">
              <div className="con-grid-1">
                {/* <label>First Name</label>
                            <input type="text" name="name" id='name'  value={formData.firstName} onChange={handleChange}/> */}
                <Box width="80%">
                  <Typography variant="h6" fontWeight="bold" mb="10px">
                    First Name
                  </Typography>
                  <Box sx={{ width: 350, maxWidth: "100%" }}>
                    {/* <TextField
                      fullWidth
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    /> */}
                    <TextField
                        id="outlined-controlled" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                     />
                  </Box>
                </Box>
              </div>

              <div className="con-grid-2">
                {/* <label>Last Name</label>
                            <input type="text" name="name" id='name' value={formData.lastName} onChange={handleChange} /> */}
                <Box width="80%">
                  <Typography variant="h6" fontWeight="bold" mb="10px">
                    Last Name
                  </Typography>
                  <Box sx={{ width: 350, maxWidth: "100%" }}>
                    <TextField
                      fullWidth
                      id="fullWidth"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </Box>
                </Box>
              </div>
            </div>

            <div className="contact-email">
              {/* <label>Email</label><br/>
               */}
              {/* <input type="email" name="email" id='email' value={formData.email} onChange={handleChange} /> */}
              <Box width="100%">
                <Typography variant="h6" fontWeight="bold" mb="10px">
                  Email
                </Typography>
                <Box sx={{ width: 650, maxWidth: "100%" }}>
                  <TextField
                    fullWidth
                   
                    id="fullWidth"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                
                </Box>
              </Box>
            </div>
            <div className="message-box">
              {/* <label>Message</label>
                   <input type="text" name="message" id='message'  value={formData.message} onChange={handleChange}/> */}
              <Box width="100%">
                <Typography variant="h6" fontWeight="bold" mb="10px">
                  Message
                </Typography>
                <Box sx={{ width: 650, maxWidth: "100%" }}>
                  <TextField
                    fullWidth
                    id="fullWidth"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    variant="outlined"
                    // sx={{ height: "400px" }}
                  />
                </Box>
              </Box>
            </div>

            <button type="submit" className="contact-button" onClick={submit}>
              Submit
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
