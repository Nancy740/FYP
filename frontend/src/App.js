import {React,useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./components/User/LoginPage";
import Register from "./components/User/Register";
import SentimentPage from "./components/User/SentimentPage";
import ForgetPassword from "./components/User/ForgotPassword";
import Verification from "./components/User/Verification";
import Reset from "./components/User/Reset";
import Footer from "./components/User/Footer";
import Navbar from "./components/User/Navbar";
import LandingPage from "./components/User/LandingPage";
import Medical from "./components/User/Medical";
import Blog from "./components/User/Blog";
import Dashboard from "./components/admin/Dashboard";
import { Sidebar } from "react-pro-sidebar";
import Topbar from "./components/admin/TopBar";
import UserProfile from "./components/User/UserProfile";
import EditProfile from "./components/User/EditProfile";

function App() {
  const [openMenu,setOpenMenu] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const handleUserProfile = () => {
    setShowUserProfile(!showUserProfile);
  };

  return (
  
    <Router>
      <Navbar handleUserProfile={handleUserProfile} showUserProfile={showUserProfile} />
      {showUserProfile && <UserProfile />}
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/sentiment" element={<SentimentPage />} />
        <Route exact path="/forgot" element={<ForgetPassword />} />
        <Route exact path="/verify" element={<Verification />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/navbar" element={<Navbar />} />
        <Route exact path="/landing" element={<LandingPage />} />
        <Route exact path="/footer" element={<Footer />} />
        <Route exact path="/medical" element={<Medical />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/sidebar" element={<Sidebar />} />
        <Route exact path="/topbar" element={<Topbar />} />
        <Route exact path="/userprofile" element={<UserProfile />} />
        <Route exact path="/editprofile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
