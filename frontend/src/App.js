import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage'; 
import LoginPage from './components/LoginPage'; 
import Register from './components/Register'; 
import Dashboard from './components/Dashboard'; 
import SentimentPage from './components/SentimentPage';

import "./css/main.css";
import "./css/login.css";
import "./css/resgister.css";
import "./css/dashboard.css";
import "./css/sentiment.css";




function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/sentiment" element={<SentimentPage />} />

        
      </Routes>
    </Router>
  );
}

export default App;
