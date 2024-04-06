import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { HiOutlineBars3 } from 'react-icons/hi2';
import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
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
      icon: <HomeIcon />,
      path: '/landing',
    },
    {
      text: "About",
      icon: <InfoIcon />,
      path: '/landing',

    },
    {
      text: "Sentiment",
      path: '/sentiment',
      // icon: <CommentRoundedIcon />,
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
      path: '/landing',
    },
    {
      text: "Log in",
      // icon: <ShoppingCartRoundedIcon />,
      path: '/login',
    },
  ];
  return (
    <nav>
      <div className="nav-logo-container">
        <img src='../assets/landinglogo.png' id='nav-image' />
      </div>
      <div className="navbar-links-container">
        <a href="/landing">Home</a>
        <a href="/landing">About</a>
        <a href="/sentiment">Sentiment</a>
        <a href="/sentiment">Contact</a>
        <button className="primary-button" >Log in</button>
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
// import React, { useState } from 'react';
// import { FaBars } from 'react-icons/fa';
// import { IoMdClose } from 'react-icons/io';

// import '../css/navbar.css'; 

// function Navbar() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const closeSidebar = () => {
//     setSidebarOpen(false);
//   };

//   return (
//     <div className="app">
//     <div className="navbar">
//       <div className="breadcrumb-icon" onClick={toggleSidebar}>
//         <FaBars color="black"/>
//       </div>
        
//       </div>

//       <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>

//         <div className="close-icon" onClick={closeSidebar}>
//         <IoMdClose size={24} color="black" />
//       </div>
      
          {/* <ul>
          <li>Menu Item 1</li>
          <li>Menu Item 2</li>
          <li>Menu Item 3</li>
        </ul> */}
      {/* </div>
    </div>
  );
}

export default Navbar; */}

