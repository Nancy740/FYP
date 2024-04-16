import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import LoginPage from './components/LoginPage'; 
import Register from './components/Register'; 
import Dashboard from './admin/Dashboard'; 
import SentimentPage from './components/SentimentPage';
import ForgetPassword from './components/ForgotPassword';
import Verification from './components/Verification';
import Reset from './components/Reset';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import LandingPage from './components/LandingPage';
import Medical from './components/Medical';
import Blog from './components/Blog';


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
        <Route exact path="/footer" element={<Footer />} />
        <Route exact path="/medical" element={<Medical />} />
        <Route exact path="/blog" element={<Blog />} />
       


      </Routes>
     
    </Router>
  );
}

export default App;
