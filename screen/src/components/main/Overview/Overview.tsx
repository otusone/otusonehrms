import React from 'react'
import styles from './Overview.module.scss'
import { Grid } from '@mui/material'
import RoutesPage from '../RoutesPage/RoutesPage'
import Sidebar from '../../sidebar/Sidebar'

const Overview = ({ handleLogout }: any) => {
    return (
        <Grid container className={styles.overviewContainer}>
            <Grid className={styles.overviewSidebar}>
                <Sidebar />
            </Grid>
            <Grid className={styles.overviewRoutesPage}>
                <RoutesPage handleLogout={handleLogout} />
            </Grid>
        </Grid>
    )
}

//   return (
//     <Grid container className={styles.overviewContainer}>
//       <Grid
//         onClick={!isLoginPage ? toggleContainer : undefined} 
//         className={isLoginPage ? styles.fullWidthSidebar : styles.overviewSidebar}
//       >
//         {isLoginPage ? null : (
//           <>
//             {window.innerWidth > 768 && !isLoginPage && (
//               <Button onClick={toggleContainer}>Toggle</Button>
//             )}
//             {isContainerVisible && <Demo />}
//           </>
//         )}
//       </Grid>

//       <Grid
//         className={isLoginPage ? styles.fullWidthoverviewSidebar : styles.overviewRoutesPage}
//       >
//         <RoutesPage />
//       </Grid>
//     </Grid>
//   );
// };

export default Overview;



// Overview.jsx
// import React, { useState, useEffect } from "react";
// import styles from "./Overview.module.scss";
// import { Grid, Button } from "@mui/material";
// import RoutesPage from "../RoutesPage/RoutesPage";
// import Demo from "../../demo/Demo";
// import { useLocation, useNavigate } from "react-router-dom";

// const Overview = () => {
//   const location = useLocation();
//   const path = location.pathname;
//   const isLoginPage = path === "/login" || path === "/signup";
//   const [isContainerVisible, setIsContainerVisible] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isLoginPage) {
//       navigate('/login');
//     }
//   }, [isLoginPage, navigate]);

//   const toggleContainer = () => {
//     setIsContainerVisible(!isContainerVisible);
//   };

//   return (
//     <Grid container className={styles.overviewContainer}>
//       <Grid
//         onClick={!isLoginPage ? toggleContainer : undefined}
//         className={isLoginPage ? styles.fullWidthSidebar : styles.overviewSidebar}
//       >
//         {isLoginPage ? null : (
//           <>
//             {window.innerWidth > 768 && !isLoginPage && (
//               <Button onClick={toggleContainer}>Toggle</Button>
//             )}
//             {isContainerVisible && <Demo />}
//           </>
//         )}
//       </Grid>

//       <Grid
//         className={
//           isLoginPage
//             ? styles.fullWidthoverviewSidebar
//             : styles.overviewRoutesPage
//         }
//       >
//         <RoutesPage />
//       </Grid>
//     </Grid>
//   );
// };

// export default Overview;
