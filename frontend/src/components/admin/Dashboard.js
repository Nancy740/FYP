// import Navbar from "../User/Navbar";
// import "../../css/dashboard.css";
// import Topbar from "./TopBar";

// const Dashboard = () => {
 
//   return (
//     <>
//       <Topbar />
//       <div className="home-container">
//       <div className="homebody">
//         <div className="stats">
//           <div className="stat">
//             <h3>Total Users</h3>
//             {/* <p>{TotalOfficers}</p> */}
//           </div>
//           <div className="stat">
//             <h3>Total Messages</h3>
//             {/* <p>{TotalVoilation}</p> */}
//           </div>
//           <div className="stat">
//             <h3>Sentiment</h3>
//             {/* <p>{TotalAccident}</p> */}
//           </div>
//           <div className="dashboard">
//             {/* <LineGraph /> */}
//           </div>
//         </div>

//         {/* <div className="news-container">
//           <div className="paragraph">
//             <p>News and Notices</p>
//           </div>
//           <div className="notice">
//             <select id="type" name="type" >
//               <option value="a">Latest News</option>
//               <option value="b">Officers updated post and positions</option>
//               <option value="c">Accidents Details Of the Month</option>
//               <option value="d">Ticket Informations Of the Month.</option>
//             </select>
//           </div>
//           {/* <div className="news">
//           <div className="paragraph">
//           <p>Top Headlines</p>
//           </div>
            
//             {/* <ul>
//               {newsData.map((article, index) => (
//                 <li key={index}>
//                   <h2>{article.title}</h2>
//                   <p>{article.description}</p>
//                 </li>
//               ))}
//             </ul> 
//           </div> 
//         </div> */}
//       </div>
//       </div>
//     </>
//   );
// };
// export default Dashboard;

import { Box, Typography, useTheme } from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PeopleIcon from "@mui/icons-material/People";
import { tokens } from "../../theme.js";
import Topbar from "./TopBar.js";
import React from "react";


const Data = ({ title, value, icon: IconComponent }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
   
    <Box
      display="flex"
      sx={{
        border: theme.palette.mode === "dark" ? `1px solid` : undefined,
        borderColor: colors.primary[600],
        borderLeft: "5px solid",
        borderLeftColor: colors.redAccent[500],
        boxShadow:
          theme.palette.mode === "dark"
            ? `2px 2px 5px ${colors.primary[300]}`
            : undefined,
        borderRadius: 2,
        backgroundColor:
          theme.palette.mode === "dark" ? colors.primary[400] : "white",
      }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box mr={5} p={2}>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="h1">{value}</Typography>
      </Box>
      <IconComponent sx={{ fontSize: 50, color: colors.grey[100], mr: 2 }} />
    </Box>
    
  );
};
const Dashboard = () => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (

    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.default",
        ml: 3,
      }}
    >
      <Box>
        <Typography variant="h2" >
          Dashboard
        </Typography>
      </Box>
      <Box
        display="flex"
        textAlign={"center"}
        justifyContent={"center"}
        alignItems={"center"}
        pt={5}
        gap={10}
      >
        <Data
          title={"Total Users"}
          value={"10"}
          icon={PeopleIcon}
        />
        <Data title={"Total Feedbacks"} value={"100"} icon={MessageIcon} />
        <Data title={"Mental health Issues"} value={"100"} icon={ReportProblemIcon} />
      </Box>
    </Box>
   
  );
};

export default Dashboard;