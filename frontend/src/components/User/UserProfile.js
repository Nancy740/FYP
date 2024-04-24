import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../css/user.css";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  Switch,
} from "@mui/material";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import LibraryBooksSharpIcon from "@mui/icons-material/LibraryBooksSharp";
import LiveHelpSharpIcon from "@mui/icons-material/LiveHelpSharp";
import { useMode } from "../../theme"; // Import the useMode hook


const UserProfile = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // State variable for dark mode
  const [language, setLanguage] = useState("en"); // State variable for language preference
  const [theme, colorMode] = useMode(); // Use the useMode hook to get theme and color mode

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    colorMode.toggleColorMode(); // Toggle color mode
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    // Add logic to handle language change
  };

  return (
    <>
    
        <div className="outercontainer">
        <div className="user-container">
          <div className="profile-container">
            <img src="../assets/Profile.png" alt="Profile"></img>
            <h2>Nancy Bhujel</h2>
            <div className="setting">
              <h3>Profile</h3>
              <List sx={{ padding: 0, margin: 0 }}>
                <ListItem sx={{ padding: 0, margin: 0  }} component={Link} to="/editprofile">
                  <ListItemButton>
                    <ListItemIcon>
                      <EditNoteSharpIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="body2">Edit Profile</Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ padding: 0, margin: 0 }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <LibraryBooksSharpIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="body2">Medical History </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ padding: 0, margin: 0 }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <LiveHelpSharpIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="body2">FAQs </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
              <hr />
              <h3>Settings</h3>
              <List sx={{ padding: 0, margin: 0 }}>
                <ListItem sx={{ padding: 0, margin: 0 }}>
                  <Switch checked={isDarkMode} onChange={toggleDarkMode} />
                  <ListItemText>
                    <Typography variant="body2" sx={{ margin: "12px" }}>
                      Dark Mode
                    </Typography>
                  </ListItemText>
                </ListItem>

                <ListItem sx={{ padding: 0, margin: 0 }}>
                  <select
                    value={language}
                    onChange={handleLanguageChange}
                    sx={{ minWidth: "50px" }}
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                  </select>
                  <ListItemText>
                    <Typography variant="body2" sx={{ margin: "8px" }}>
                      Language
                    </Typography>
                    {/* Language select dropdown */}
                  </ListItemText>
                </ListItem>
              </List>
            </div>
          </div>
        </div>
        </div>
    </>
  );
};

export default UserProfile;
