import React from "react";
// import * as React from 'react';
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import "./Attandacetable.css";
import Gridcardattandance from "./Gridcardattandance";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
Emp_ID : number,
Name: string,
Date: number,
Clouck_In: number,
Clock_Out: number,
Status:string
) {
  return { Emp_ID, Name, Date, Clouck_In, Clock_Out,Status };
}

const rows = [
  createData(1465665, "John", 12 , 6, 8, "Present"),
  createData(1465665, "John", 12, 6, 8, "Present"),
  createData(1465665, "John", 12, 6, 8, "Present"),
  createData(1465665, "John", 12, 6, 8, "Present"),
  createData(1465665, "John", 12, 6, 8, "Present"),
  createData(1465665, "John", 12, 6, 8, "Present"),
  createData(1465665, "John", 12, 6, 8, "Present"),
  createData(1465665, "John", 12, 6, 8, "Present"),
  createData(1465665, "John", 12, 6, 8, "Present"),
  createData(1465665, "John", 12, 6, 8, "Present"),
  createData(1465665, "John", 12, 6, 8, "Present"),
  createData(1465665, "John", 12, 6, 8, "Present"),
  createData(1465665, "John", 12, 6, 8, "Present"),
  createData(1465665, "John", 12, 6, 8, "Present"),
  createData(1465665, "John", 12, 6, 8, "Present"),
];

function Attandancetable() {
  return (
    <>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 6 }} className="tableconatienr">
        <Grid item xs={12} sm={8} >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Emp_ID</StyledTableCell>
                  <StyledTableCell align="right">Name </StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">Clouck_In</StyledTableCell>
                  <StyledTableCell align="right">
                    Clock_Out
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Status
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.Emp_ID}>
                  <StyledTableCell component="th" scope="row">
                    {row.Emp_ID}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.Name} </StyledTableCell>
                  <StyledTableCell align="right">{row.Date}</StyledTableCell>
                  <StyledTableCell align="right">{row.Clouck_In}</StyledTableCell>
                  <StyledTableCell align="right">{row.Clock_Out}</StyledTableCell>
                  <StyledTableCell align="right">{row.Status}</StyledTableCell>
                </StyledTableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sm={4}>
           <Gridcardattandance/>
        </Grid>
      </Grid>
    </>
  );
}

export default Attandancetable;
