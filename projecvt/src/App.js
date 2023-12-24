import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Mainpage from './components/Mainpage'; 
import LoginPage from './components/LoginPage'; 

import  './stylecss/main.css';
import  './stylecss/login.css';
 


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Mainpage />} />
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
