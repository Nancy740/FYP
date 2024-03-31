// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Sidebar } from './Sidebar'; // You need to import Sidebar component or data structure containing sidebar items
// import '../css/navbar.css';
// import * as FaIcons from 'react-icons/fa';
// import { IconContext } from 'react-icons';

// function Navbar() {
//   const [sidebar, setSidebar] = useState(false);

//   const showSidebar = () => setSidebar(!sidebar);

//   return (
//     <>
//       <IconContext.Provider value={{ color: 'fff#' }}>
//         <div className='topbar'>
//           <div className='navbar'>
//             <Link to='#' className='menu-bars'>
//               <FaIcons.FaBars onClick={showSidebar} />
//             </Link>
//           </div>
//         </div>

//         <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
//           <img id='logos' src="../assets/logo.png" />
//           <ul className='nav-menu-items' onClick={showSidebar}>
//             {sidebar && Sidebar.map((item, index) => (
//               <li key={index} className={item.cName}>
//                 <Link to={item.path}>
//                   {item.icon}
//                   <span>{item.title}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </IconContext.Provider>
//     </>
//   );
// }

// export default Navbar;
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

import '../css/navbar.css'; 

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app">
    <div className="navbar">
      <div className="breadcrumb-icon" onClick={toggleSidebar}>
        <FaBars color="black"/>
      </div>
        
      </div>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>

        <div className="close-icon" onClick={closeSidebar}>
        <IoMdClose size={24} color="black" />
      </div>
      
          {/* <ul>
          <li>Menu Item 1</li>
          <li>Menu Item 2</li>
          <li>Menu Item 3</li>
        </ul> */}
      </div>
    </div>
  );
}

export default Navbar;
