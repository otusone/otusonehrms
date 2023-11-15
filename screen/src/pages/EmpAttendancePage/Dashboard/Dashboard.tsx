import React from 'react'
import styles from './Dashboard.module.scss'
import { Grid } from '@mui/material'
import CommonCard from '../../../components/common/CommonCard/CommonCard'
import { MdAccountBalanceWallet, MdOutlineStickyNote2 } from "react-icons/md";
import { AiOutlineTeam } from 'react-icons/ai';
import { RiHotspotLine } from 'react-icons/ri';
import { TbTicket } from 'react-icons/tb';


const Dashboard = () => {
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
    </Grid>
  )
}

export default Dashboard