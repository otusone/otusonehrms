import React, { useState, useEffect } from 'react'
import styles from './EmpAttendancePage.module.scss'
import { Box, Grid } from '@mui/material'
import Sidebar from '../../components/sidebar/Sidebar'
import { menuData } from './menuData'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import Attendance from './Attendance/Attendance'
import Heading from './Heading/Heading'

const EmpAttendancePage = () => {
    const [checkIn, setCheckIn] = useState<any>(new Date())
    // const formattedTime = checkIn.toLocaleTimeString();
    const formattedTime = checkIn instanceof Date ? checkIn.toLocaleTimeString() : '';

    const handleCheckIn = () => {
        setCheckIn(formattedTime)
        console.log(formattedTime, "checkIn")
    }
    const handleCheckOut = () => { }

    return (
        <Grid container className={styles.empAttendancePageContainer}>
            <Grid className={styles.empAttendanceSidebar}>
                <Sidebar
                    menuData={menuData}
                />
            </Grid>
            <Grid className={styles.empAttendanceScreen}>
                <Heading
                    IsAction={true}
                    handleCheckIn={handleCheckIn}
                    handleCheckOut={handleCheckOut}
                />
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/attendance' element={<Attendance />} />
                </Routes>
            </Grid>
        </Grid>
    )
}

export default EmpAttendancePage    