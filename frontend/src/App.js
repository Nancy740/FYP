import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import LoginPage from './components/LoginPage'; 
import Register from './components/Register'; 
import Dashboard from './components/Dashboard'; 
import SentimentPage from './components/SentimentPage';
import ForgetPassword from './components/ForgotPassword';
import Verification from './components/Verification';
import Reset from './components/Reset';


import "./css/main.css";
import "./css/login.css";
import "./css/resgister.css";
import "./css/dashboard.css";
import "./css/sentiment.css";
import "./css/forgot.css";







function App() {
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<LandingPage />} /> */}
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/sentiment" element={<SentimentPage />} />
        <Route exact path="/forgot" element={<ForgetPassword />} />
        <Route exact path="/verify" element={<Verification />} />
        <Route exact path="/reset" element={<Reset/>} />
        <Route exact path="/sentiment" element={<SentimentPage />} />


        
      </Routes>
    </Router>
  );
}

export default App;
