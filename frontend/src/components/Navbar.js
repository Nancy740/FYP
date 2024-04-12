import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { HiOutlineBars3 } from "react-icons/hi2";

import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import Button from "@mui/material/Button";

import "../css/navbar.css";
const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  // const history = useHistory(); // Initialize useHistory hook

  // const login = () => {
  //   history.push('/login');
  // };
  const menuOptions = [
    {
      text: "Home",
      path: "/landing",
    },
    {
      text: "Blogs",
      path: "/landing",
    },
    {
      text: "Services",
      path: "/services",
    },
    {
      text: "Sentiment",
      path: "/sentiment",
    },
    {
      text: "Contact",

      path: "/landing",
    },
  
    {
      text: "Log in",

      path: "/login",
    },
  ];
  return (
    <nav>
      <div className="nav-logo-container">
        <img src="../assets/landinglogo.png" id="nav-image" />
      </div>
      <div className="navbar-links-container">
        <a href="/landing">Home</a>
        <a href="/landing">Blogs</a>
        <a href="/sentiment">Sentiment</a>
        <a href="/landing">Contact</a>
        <a href="/login">
        <Button variant="contained">Log in</Button>
        </a>
              {/* <button className="primary-button" >Log in</button> */}
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
