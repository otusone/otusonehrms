import React from 'react'
import styles from './EmpAttendancePage.module.scss'
import { Box, Grid } from '@mui/material'
import EmpAttendance from '../../components/empAttendance/EmpAttendance'
import img from '../../asserst/images/logo.png'
import HeadingProfile from '../../components/heading/headingProfile/HeadingProfile'
import Sidebar from '../../components/sidebar/Sidebar'
import { menuData } from './menuData'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import Attendance from './Attendance/Attendance'
import Heading from './Heading/Heading'

const EmpAttendancePage = () => {
    return (
        <Grid container className={styles.empAttendancePageContainer}>
            <Grid className={styles.empAttendanceSidebar}>
                <Sidebar
                    menuData={menuData}
                />
            </Grid>
            <Grid className={styles.empAttendanceScreen}>
                <Heading />
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/attendance' element={<Attendance />} />
                </Routes>
            </Grid>
        </Grid>
    )
}

export default EmpAttendancePage    