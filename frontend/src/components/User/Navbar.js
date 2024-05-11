import React, { useEffect, useState } from "react";
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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import Userprofile from "./UserProfile";

import "../../css/navbar.css";
import UserProfile from "./UserProfile";
const Navbar = ({ handleUserProfile, showUserProfile }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openuserprofile, setOpenUserProfile] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
      const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));

      let headers = {};
      if (tokenCookie) {
        headers = {
          Authorization: `Bearer ${tokenCookie.split("=")[1]}`, // Include token in the 'Authorization' header
        };
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/checkuser/", {
          method: "POST",
          headers: headers,
        });

        if (response.ok) {
          const data = await response.json(); // Parse JSON response
          console.log("Response:", data);
          if (data.success) {
            console.log("Success");
            setIsLogged(true);
          } else {
            console.log("Not success");
            setIsLogged(false);
          }
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleuserprofile = () => {
    setOpenUserProfile(!openuserprofile);
  };
  let menuOptions = [
    {
      text: "Home",
      path: "/landing",
    },
    {
      text: "Blogs",
      path: "/blog",
    },
  ];

  if (false) {
    console.log("from inside");
    console.log(isLogged);
    menuOptions = [
      ...menuOptions,
      {
        text: "Services",
        path: "/services",
      },
      {
        text: "Sentiment",
        path: "/sentiment",
      },
      {
        text: "Medical History",
        path: "/medical",
      },
    ];
  }
  return (
    <nav>
      <div className="nav-logo-container">
        <img src="../assets/landinglogo.png" id="nav-image" />
      </div>
      <div className="navbar-links-container">
        <a href="/landing">Home</a>
        {/* <a href="/blog">Blogs</a> */}
        <a href="/sentiment">Sentiment</a>
        <a href="/medical">Medical History</a>

        <Button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          startIcon={<AccountCircleSharpIcon />}
        ></Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {!showUserProfile && (
            <MenuItem onClick={handleUserProfile}>My account</MenuItem>
          )}
          {showUserProfile && (
            <MenuItem onClick={handleUserProfile}>Close profile</MenuItem>
          )}
          <MenuItem onClick={handleuserprofile}> Log in</MenuItem>
          <MenuItem onClick={handleuserprofile}> Log out</MenuItem>
        </Menu>
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
      {openuserprofile && <UserProfile />}
    </nav>
  );
};

export default Navbar;
