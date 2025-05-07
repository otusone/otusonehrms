import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CommonCard from '../../../components/common/CommonCard/CommonCard'
import { MdAccountBalanceWallet } from "react-icons/md";
import { AiOutlineTeam } from 'react-icons/ai';
import { RiHotspotLine } from 'react-icons/ri';
import { TbTicket } from 'react-icons/tb';
import axios from 'axios';
import CommonButton from '../../../components/common/CommonButton/CommonButton';
import MeetingScheduleTable from '../../../components/tableData/meetingScheduleTable/MeetingScheduleTable';
import tabelData from '../../../data/mettingSchedule.json'
import Calender from '../../../components/dashboard/calender/Calender';
import MeetingSchedule from '../../../components/dashboard/meetingSchedule/MeetingSchedule';

const Dashboard = () => {
  const [anouncementData, setAnouncementData] = useState<any>()

  const data = [
    {
      "id": 1,
      "icon": <AiOutlineTeam />,
      "heading": "Leave",
      "number": 0,
      "color": "#58024B"
    },
    {
      "id": 2,
      "icon": <TbTicket />,
      "heading": "Casual Leave",
      "number": 0,
      "color": "#3EC9D6"
    },
    {
      "id": 3,
      "icon": <MdAccountBalanceWallet />,
      "heading": "Sick Leave",
      "number": 0,
      "color": "#6FD943"
    }
  ]
  const getData = async () => {
    try {
      const response = await axios.get(`https://hrms-server-ygpa.onrender.com/anouncement`)
      const data = response.data.anouncementData;
      setAnouncementData(data)
      console.log(data, "data...")
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getData();
  }, [])

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
        <Grid item sm={6}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#58024B' }}>
                <TableRow >
                  <TableCell sx={{ color: "#ffffff" }}>TITLE</TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>START DATE</TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>START TIME</TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>DESCRIPTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {anouncementData && anouncementData.map((item: any) => {
                  return (
                    <TableRow>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.start_date}</TableCell>
                      <TableCell>{item.start_time}</TableCell>
                      <TableCell>{item.description}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item sm={6}>
          <Calender />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Dashboard;