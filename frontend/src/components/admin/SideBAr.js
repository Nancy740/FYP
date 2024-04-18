import React, { useState, useEffect } from "react";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import UserOutlinedIcon from "@mui/icons-material/UserOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link } from "react-router-dom";
import { tokens } from "../../theme.js";


const isAdminPath = window.location.pathname.includes("/admin");

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      component={<Link to={to} />}
      sx={{
        color: colors.grey[100],
      }}
      active={selected === title}
      icon={icon}
      onClick={() => setSelected(title)}
    >
      <Typography variant="h4">{title}</Typography>
    </MenuItem>
  );
};

const UserItems = ({ selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box paddingLeft={isCollapsed ? undefined : "10%"} mt={6}>
      <Item
        title="Dashboard"
        to="/dashboard"
        icon={<HomeOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Divider />
      <Typography
        variant="h6"
        color={colors.grey[100]}
        sx={{ m: "15px 0 5px 20px" }}
      >
        Data
      </Typography>
      <Item
        title="User Details"
        to="/user-details"
        icon={<UserOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Profile"
        to="/profile"
        icon={<UserOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Feedback"
        to="/feedback"
        icon={<UserOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Analytics"
        to="/analytics"
        icon={<UserOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
    </Box>
  );
};

export default function SideBAr() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [name, setName] = useState("");
  
  useEffect(() => {
    // Extract token from cookies
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));

    // Check if token exists
    if (tokenCookie) {
      const token = tokenCookie.split("=")[1];
      const data = JSON.parse(atob(token.split(".")[1]));
      console.log(data.data.name);
      setName(data.data.name);
    }
  }, []);

  return (
    <Sidebar
      collapsed={isCollapsed}
      backgroundColor={
        theme.palette.mode === "dark"
          ? colors.primary[800]
          : colors.blueAccent[500]
      }
    >
      <Menu
        menuItemStyles={{
          button: {
            "&:hover": {
              backgroundColor: "transparent",
              color: colors.blueAccent[500],
              color:
                theme.palette.mode === "dark"
                  ? colors.blueAccent[500]
                  : colors.grey[800],
            },
            "&:active": {
              backgroundColor: colors.blueAccent[400],
              color: colors.greenAccent[500],
            },
            "::after": {
              color: "red",
              backgroundColor: "red",
            },
          },
        }}
      >
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          sx={{
            margin: "1px 0 20px 0",
            icon: {
              "&:hover": {
                backgroundColor: "red",
              },
            },
          }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Typography variant="h3"></Typography>
              <IconButton
                onClick={() => setIsCollapsed(!isCollapsed)}
                sx={{
                  "&:hover": {
                    backgroundColor: colors.redAccent[400],
                  },
                }}
              >
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>
        {!isCollapsed && (
          <Box textAlign="center" display="grid" gap={2}>
            <Typography variant="h2" fontWeight="bold" color={"white"}>
              Welcome back
            </Typography>
            <Typography variant="h4" fontWeight={"bold"} color={"white"}>
              {name}
            </Typography>
          </Box>
        )}
        {!isAdminPath && (
          <UserItems selected={selected} setSelected={setSelected} />
        )}
      </Menu>
    </Sidebar>
  );
}
