import React, { useEffect, useState } from "react";
import styles from "./ViewDetailsModal.module.scss";
import { Divider, Grid, Modal, Typography } from "@mui/material";
import ViewDetailsComponent from "../ViewDetailsComponent/ViewDetailsComponent";
import axios from "axios";


export interface IViewDetailsModal {
  open: boolean;
}
const ViewDetailsModal = ({ open }: IViewDetailsModal) => {
    const [uData, setUData] = useState<any>()
    useEffect(() => {
        axios
          .get("https://hrms-server-ygpa.onrender.com/employee")
          .then((result) => {
            const data = result.data.employeeData;
            setUData(data)
            console.log(data, "dhbjn")

          });
      }, []);
  const data = [
    {
      id: 1,
      lebel: "Name",
      name: "Test",
    },
    {
      id: 2,
      lebel: "Name",
      name: "Test",
    },
  ];
  return (
    <Modal
      open={open}
      sx={{ width: 600, height: "fit-content", margin: "auto" }}
    >
      <Grid className={styles.viewDetailsModalContainer}>
        <Typography>ViewDetailsModal</Typography>
        <Divider />
        <Grid container>
          <Grid item sm={6}>
            {uData &&
              uData.map((item:any) => {
                return (
                  <Grid key={item.id}>
                    <ViewDetailsComponent label={item.lebel} name={item.name} />
                  </Grid>
                );
              })}
          </Grid>
          <Grid item sm={6}>
            {data &&
              data.map((item) => {
                return (
                  <Grid key={item.id}>
                    <ViewDetailsComponent label={item.lebel} name={item.name} />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ViewDetailsModal;
