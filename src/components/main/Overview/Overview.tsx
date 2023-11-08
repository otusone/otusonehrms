import React, { useState } from "react";
import styles from "./Overview.module.scss";
import { Grid, Button } from "@mui/material";
import RoutesPage from "../RoutesPage/RoutesPage";
import Demo from "../../demo/Demo";
import { useLocation } from "react-router-dom";

const Overview = () => {
  const location = useLocation();
  const path = location.pathname;
  const isLoginPage = path === "/login";
  const isSignupPage = path === "/Signup"; 
  const [isContainerVisible, setIsContainerVisible] = useState(false);

  const toggleContainer = () => {
    setIsContainerVisible(!isContainerVisible);
  };

  return (
    <Grid container className={styles.overviewContainer}>
      <Grid
        onClick={toggleContainer}
        className={isLoginPage ? styles.fullWidthSidebar : styles.overviewSidebar}
      >
        {isLoginPage ? null : (
          <>
            {window.innerWidth > 768 && <Button onClick={toggleContainer}>Toggle</Button>}
            {isContainerVisible && <Demo />}
          </>
        )}
      </Grid>

      <Grid
      //  className={styles.overviewRoutesPage}>
      className={isLoginPage ? styles.fullWidthoverviewSidebar : styles.overviewRoutesPage}>
        <RoutesPage />
      </Grid>
    </Grid>
  );
};

export default Overview;
