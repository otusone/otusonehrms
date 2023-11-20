import React, { useState, useEffect } from 'react'
import styles from './EmpAttendancePage.module.scss'
import { Box, Button, Grid } from '@mui/material'
import Sidebar from '../../components/sidebar/Sidebar'
import { menuData } from './menuData'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import Attendance from './Attendance/Attendance'
import Heading from './Heading/Heading'
import axios from 'axios'

const EmpAttendancePage = () => {
    const [checkIn, setCheckIn] = useState<any>('')
    const [checkOut, setCheckOut] = useState<any>()
    const [email, setEmail] = useState<any>()

    const date = new Date();
    const time = date.getTime();
    const clock_in = new Date(time).toLocaleTimeString();
    const clock_out = new Date(time).toLocaleTimeString();
    const emp_id = "EMP000001";
    const name = "Anuj";
    // const email = "anuj@gmail.com";
    useEffect(() => {
        const userEmail = localStorage.getItem('email')
        setEmail(userEmail)


    }, [])
    console.log(email, "userEmail")


    const handleCheckIn = () => {

        axios.post('https://hrms-server-ygpa.onrender.com/empAttendance/clock-in', { emp_id, name, email })
            .then(result => {
                setCheckIn(clock_in)
            })
    };

    useEffect(() => {
        const empDataString: any = localStorage.getItem("loginedUser")
        const empData = JSON.parse(empDataString);
        const empName = empData.username;
        console.log(empName, "empName....")
    },);

    useEffect(() => {
        const checkInData = localStorage.getItem("AttendanceID")
        setCheckOut(checkInData)
    }, []);

    const handleCheckOut = () => {

        axios.put(`https://hrms-server-ygpa.onrender.com/empAttendance/${checkOut}`, { emp_id, name, email })
            .then(response => {
                console.log('Update successful:', response);
            })
            .catch(error => {
                console.error('Error updating data:', error);
            });
    };

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