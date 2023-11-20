import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CommonCard from '../../../components/common/CommonCard/CommonCard'
import { MdAccountBalanceWallet } from "react-icons/md";
import { AiOutlineTeam } from 'react-icons/ai';
import { RiHotspotLine } from 'react-icons/ri';
import { TbTicket } from 'react-icons/tb';
import axios from 'axios';

const Dashboard = () => {
  const [attendanceData, setAttendanceData] = useState<any>([])
  const [currentUser, setCurrentUser] = useState<any>('')
  const [email, setEmail] = useState<any>('')
  const data = [
    {
      "id": 1,
      "icon": <AiOutlineTeam />,
      "heading": "Staff",
      "number": 24,
      "color": "#58024B"
    },
    {
      "id": 2,
      "icon": <TbTicket />,
      "heading": "Ticket",
      "number": 9,
      "color": "#3EC9D6"
    },
    {
      "id": 3,
      "icon": <MdAccountBalanceWallet />,
      "heading": "Account Balance",
      "number": "$2,089,000.00",
      "color": "#6FD943"
    },
    {
      "id": 4,
      "icon": <RiHotspotLine />,
      "heading": "Jobs",
      "number": 4,
      "color": "#3EC9D6"
    },
    {
      "id": 5,
      "icon": <RiHotspotLine />,
      "heading": "Active Jobs",
      "number": 4,
      "color": "#6FD943"
    },
    {
      "id": 6,
      "icon": <RiHotspotLine />,
      "heading": "Inactive Jobs",
      "number": 0,
      "color": "#58024B"
    }
  ]
  useEffect(() => {
    axios.get('https://hrms-server-ygpa.onrender.com/empAttendance')
      .then(result => {
        const data = result.data.EmpAttendanceData;
        if (Array.isArray(data) && data.length > 0) {
          const lastIndex = data.length - 1;
          const lastItem = data[lastIndex];
          const attendance_id = lastItem._id;
          localStorage.setItem("AttendanceID", attendance_id);
          console.log(attendance_id, "last item");
        } else {
          console.log("Data is not an array or is empty");
        }
        setAttendanceData(data)
        console.log(data, "result...")
      })
    const empDataString: any = localStorage.getItem("loginedUser")
    const empData = JSON.parse(empDataString);
    const empName = empData.username;
    const empEmail = empData.email;
    setEmail(empEmail)
    setCurrentUser([empName])
  }, []);
  console.log(email, "email...")


  return (
    <Grid className={styles.dashboardContainer}>
      <Grid container spacing={2}>
        {data.map((item) => {
          return (
            <Grid item sm={4}>
              <CommonCard
                icon={item.icon}
                heading={item.heading}
                number={item.number}
                color={item.color}
                backgroundColor={''}
              />
            </Grid>
          )
        })}
      </Grid>
      <Grid container className={styles.dashboard}>
        <Grid item sm={7}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#58024B" }}>
                  {/* <TableCell sx={{ color: "#ffffff" }}>EMPLOYEE ID</TableCell> */}
                  <TableCell sx={{ color: "#ffffff" }}>EMPLOYEE</TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>DATE</TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>STATUS</TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>CHECK IN</TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>CHECK OUT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {attendanceData.map((item: any, idx: number) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell>EMP000001</TableCell>
                      <TableCell>{currentUser}</TableCell>
                      <TableCell>Present</TableCell>
                      <TableCell>{item.clock_in}</TableCell>
                      <TableCell>{item.clock_out}</TableCell>
                    </TableRow>
                  )
                })} */}

                {
                  attendanceData?.filter((emp: {
                    [x: string]: any; employee: any;
                  }) => emp.email === email).map((item: any, idx: number) => {
                    return (
                      <TableRow key={idx}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>Present</TableCell>
                        <TableCell>{item.clock_in}</TableCell>
                        <TableCell>{item.clock_out}</TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item sm={5}>

        </Grid>
      </Grid>
    </Grid>
  )
}

export default Dashboard;