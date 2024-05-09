// import React from 'react';
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
    
      width="100%%"
    
      display="flex"
      justifyContent="space-between"
      flexWrap="wrap"
      columnGap="10px"
     
    
      sx={{ backgroundColor: "#fff"}} // Apply white background and padding using sx prop
    >
      <Box width="30%" ml='8rem'>
        <Typography variant="h5" fontWeight="bold" mb="20px" mt="4rem">
          Mental Health Sentiment Analysis
        </Typography>
        <div ml='4rem'>
          Disclaimer: User-generated content; we bear no legal responsibility
          for service <br />
quality or accuracy. Use at your own discretion.
        </div>
        <Typography variant="h6" mt="2rem" ml="3rem">
          1166 National Helpline for Suicide Prevention
          <br />
          ©2024 All rights reserved.
        </Typography>
      </Box>

      <Box width="15%">
        <Typography variant="h5" fontWeight="bold" mb="20px" mt="3rem" textAlign= "center">
          Quick Links
        </Typography>
        <Typography textAlign= "center" mb="10px">
          About Us
        </Typography>
        <Typography textAlign= "center" mb="10px">
          Services
        </Typography>
        <Typography textAlign= "center" mb="10px">
          Terms & Conditions
        </Typography>
        <Typography textAlign= "center" mb="10px">
          Privacy Policy
        </Typography>
      </Box>

      <Box width="30%">
        <Typography variant="h5" fontWeight="bold" mb="10px" mt="3rem">
          Email Us:
        </Typography>
        <Box sx={{ width: 300, maxWidth: "100%" }}>
          <TextField fullWidth label="Enter your email" id="fullWidth" />
        </Box>

        <Typography variant="h5" fontWeight="bold" mb="10px" mt="2rem">
          Connect with us:
        </Typography>

        <Box display="flex" alignItems="center" mb="2rem">
        <IconButton style={{ color: "blue", fontSize: '20px' }}>

            <FacebookIcon />
          </IconButton>
          <IconButton style={{ color: "inherit" }}>
            <WhatsAppIcon />
          </IconButton>
          <IconButton style={{ color: "inherit" }}>
            <InstagramIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

