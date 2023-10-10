import React from 'react'
import styles from './Dashboard.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import CommonCard from '../common/CommonCard/CommonCard'
import { AiOutlineTeam } from 'react-icons/ai';
import { TbTicket } from 'react-icons/tb';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { RiHotspotLine } from 'react-icons/ri';
import MeetingSchedule from './meetingSchedule/MeetingSchedule';
import tableData from './data.json'
import Calender from './calender/Calender';


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
            <Typography variant='h2' fontWeight={500} fontSize={20}>Dashboard</Typography>
            <Grid spacing={2} container>
                {data.map((item) => {
                    return (
                        <Grid item sm={4}>
                            <CommonCard
                                icon={item.icon}
                                heading={item.heading}
                                number={item.number}
                                color={item.color}
                                backgroundColor={item.color}
                            />
                        </Grid>
                    )
                })}
            </Grid>
            <Grid container spacing={2} className={styles.dashboard2ndSection}>
                <Grid item sm={5}>
                    <MeetingSchedule
                        heading={'Meeting schedule'}
                        title1st={'TITLE'}
                        title2nd={'DATE'}
                        title3rd={"TIME"}
                        data={tableData.meetingSchedule}
                        Is3rdCell={true}
                        Is4thCell={false}
                    />
                    <MeetingSchedule
                        heading={"Today's Not Clock In"}
                        title1st={'NAME'}
                        title2nd={'STATUS'}
                        data={tableData.clockIn}
                        Is3rdCell={false}
                        Is4thCell={false} />
                </Grid>
                <Grid item sm={7}>
                    <Calender />
                </Grid>
            </Grid>
            <MeetingSchedule
                heading={"Announcement List"}
                title1st={'TITLE'}
                title2nd={'START DATE'}
                title3rd={'END DATE'}
                title4th={'DESCRIPTION'}
                data={tableData.announcementList}
                Is3rdCell={true}
                Is4thCell={true}
            />
        </Grid>
    )
}

export default Dashboard;