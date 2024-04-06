import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import LoginPage from './components/LoginPage'; 
import Register from './components/Register'; 
import Dashboard from './components/Dashboard'; 
import SentimentPage from './components/SentimentPage';
import ForgetPassword from './components/ForgotPassword';
import Verification from './components/Verification';
import Reset from './components/Reset';

import Navbar from './components/Navbar';
// import Popup from './components/Popup';

import LandingPage from './components/LandingPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/sentiment" element={<SentimentPage />} />
        <Route exact path="/forgot" element={<ForgetPassword />} />
        <Route exact path="/verify" element={<Verification />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/navbar" element={<Navbar />} />
        <Route exact path="/landing" element={<LandingPage />} />
       
        {/* <Route exact path="/popup" element={<Popup />} /> */}
        
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
