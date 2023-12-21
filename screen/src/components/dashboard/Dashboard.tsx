import React, { useState } from 'react'
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
import AnnouncementModal from '../modal/AnnouncementModal/AnnouncementModal';


const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const handleModal = () => setOpen(!open)
    const handleEdit = () => setEditModal(!editModal)
    const handleClose = () => { setOpen(false); setEditModal(false) }
    const [inputData, setInputData] = useState({ title: "", start_date: '', start_time: "", description: "" })

    const data = [
        {
            "id": 1,
            "icon": <AiOutlineTeam />,
            "heading": "Staff",
            "number": 0,
            "color": "#58024B"
        },
        {
            "id": 2,
            "icon": <TbTicket />,
            "heading": "Ticket",
            "number": 0,
            "color": "#3EC9D6"
        },
        {
            "id": 3,
            "icon": <MdAccountBalanceWallet />,
            "heading": "Account Balance",
            "number": "0",
            "color": "#6FD943"
        },
        {
            "id": 4,
            "icon": <RiHotspotLine />,
            "heading": "Jobs",
            "number": 0,
            "color": "#3EC9D6"
        },
        {
            "id": 5,
            "icon": <RiHotspotLine />,
            "heading": "Active Jobs",
            "number": 0,
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
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
    }
    console.log(inputData, "inputData..")
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
                <Grid item sm={7}>
                    <MeetingSchedule
                        handleClick={handleModal}
                        handleEdit={handleEdit}
                        data={tableData.announcementList}


                    />
                </Grid>
                <Grid item sm={5}>
                    <Calender />
                </Grid>
            </Grid>
            <AnnouncementModal
                open={open}
                heading={"Create New Announcement"}
                handleClose={handleClose}
                inputData={inputData}
                handleChange={handleChange}
            />
            <AnnouncementModal
                open={editModal}
                heading={"Edit Announcement"}
                handleClose={handleClose}
                inputData={inputData}
                handleChange={handleChange}
            />
        </Grid>
    )
}

export default Dashboard;