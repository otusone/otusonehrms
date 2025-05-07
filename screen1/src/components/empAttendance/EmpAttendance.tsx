import React from 'react'
import Heading from '../heading/Heading'
import styles from './EmpAttendancePage.module.scss'
import { Grid, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import data from './data.json'
import Calender from '../../components/dashboard/calender/Calender';

const EmpAttendance = () => {
  return (
    <Grid className={styles.empAttendanceContainer}>
      <Grid className={styles.empAttendance}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#58024B' }}>
                <TableCell sx={{ color: "#ffffff" }}>EMPLOYEE ID</TableCell>
                <TableCell sx={{ color: "#ffffff" }}>EMPLOYEE</TableCell>
                <TableCell sx={{ color: "#ffffff" }}>DATE</TableCell>
                <TableCell sx={{ color: "#ffffff" }}>STATUS</TableCell>
                <TableCell sx={{ color: "#ffffff" }}>CLOCK IN</TableCell>
                <TableCell sx={{ color: "#ffffff" }}>CLOCK OUT</TableCell>
                <TableCell sx={{ color: "#ffffff" }}>LATE</TableCell>
                <TableCell sx={{ color: "#ffffff" }}>EARLY LEAVING</TableCell>
                <TableCell sx={{ color: "#ffffff" }}>OVERTIME</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.emp_id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.clock_in}</TableCell>
                    <TableCell>{item.clock_out}</TableCell>
                    <TableCell>{item.late}</TableCell>
                    <TableCell>{item.early_leaving}</TableCell>
                    <TableCell>{item.overtime}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default EmpAttendance