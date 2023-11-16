import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";

function Gridcardattandance() {
  return (
    <>
      <h3 style={{ paddingBottom: '2rem' }}>Projects</h3>
      <Card sx={{ minWidth: 275 }} className="cardattandance" style={{ marginRight: "2rem" }}>
        <CardContent>
          <Grid container>
            <Grid item xs>
              <h2>71</h2>
              <p>Total Task</p>
            </Grid>
            <Divider orientation="vertical" />

            <Grid item xs>
              <h2>45</h2>
              <p>Pending Task</p>
            </Grid>
          </Grid>

          <Grid container justifyContent="center" alignItems="center" style={{ paddingTop: '2rem' }}>
            <Grid item container direction="column" alignItems="center" justifyContent="center">
              <h2>2</h2>
              <p>Total Project</p>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <h3 style={{ paddingBottom: '2rem', paddingTop: '1rem' }}>Your Leave</h3>
      <Card sx={{ minWidth: 275 }} className="cardattandance" style={{ marginRight: "2rem" }}>
        <CardContent>
          <Grid container>
            <Grid item xs>
              <h2>71</h2>
              <p>Total Task</p>
            </Grid>
            <Divider orientation="vertical" />

            <Grid item xs>
              <h2>45</h2>
              <p>Pending Task</p>
            </Grid>
          </Grid>

          <Grid container justifyContent="center" alignItems="center" style={{ paddingTop: '2rem' }}>
            <Grid item container direction="column" alignItems="center" justifyContent="center">
              <h2>2</h2>
              <p>Total Project</p>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Gridcardattandance;

