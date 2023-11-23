import React from "react";
import styles from "./ViewDetailsComponent.module.scss";
import { Grid, Typography } from "@mui/material";

export interface IViewDetailsComponent{
    label:string;
    name:string
}
const ViewDetailsComponent = ({label, name}:IViewDetailsComponent) => {
  return (
    <Grid className={styles.viewDetailsComponent}>
      <Typography variant="h5" fontSize={18} fontWeight={600}>{label}</Typography>
      <Typography variant="h6" fontSize={16} fontWeight={500}>{name}</Typography>
    </Grid>
  );
};

export default ViewDetailsComponent;
