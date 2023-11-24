import React, { useState, useEffect } from 'react'
import styles from './EmpAttendancePage.module.scss'
import { Grid } from '@mui/material'
import Sidebar from '../../components/sidebar/Sidebar'
import { menuData } from './menuData'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import Attendance from './Attendance/Attendance'
import Heading from './Heading/Heading'
import axios from 'axios'
import Leave from './Leave/Leave'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmpAttendancePage = ({ handleLogout }: any) => {
    const [attendanceData, setAttendanceData] = useState<any>([])
    const [email, setEmail] = useState<any>()
    const [name, setName] = useState<any>()
    const [emp_id, setEmpId] = useState<any>()
    const [checkedAttendance, setCheckedAttendance] = useState()

    const formatedData = new Date();
    const date = formatedData.toLocaleDateString();
    const time = formatedData.getTime();
    const clock_in = new Date(time).toLocaleTimeString();
    const clock_out = new Date(time).toLocaleTimeString();

    useEffect(() => {
        const userEmail = localStorage.getItem('email')
        setEmail(userEmail)
        const loginedUserString = localStorage.getItem('loginedUser')
        if (loginedUserString) {
            const loginedUser = JSON.parse(loginedUserString);
            const username = loginedUser.name;
            const userId = loginedUser.emp_id
            setName(username)
            setEmpId(userId)
        } else {
            console.log('No logined user found');
        }

    }, [])
    const fetchData = async () => {
        try {
            const result = await axios.get('https://hrms-server-ygpa.onrender.com/empAttendance');
            const data = result.data.EmpAttendanceData;

            if (Array.isArray(data) && data.length > 0) {
                const lastIndex = data.length - 1;
                const lastItem = data[lastIndex];
                const attendance_id = lastItem._id;
                setCheckedAttendance(attendance_id);
            } else {
                console.log("Data is not an array or is empty");
            }

            setAttendanceData(data);

            const empDataString: any = localStorage.getItem("loginedUser");
            const empData = JSON.parse(empDataString);
            const empEmail = empData.email;
            setEmail(empEmail);
        } catch (error) {
            console.error("Error during GET request:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCheckIn = async () => {
        try {
            const response = await axios.post('https://hrms-server-ygpa.onrender.com/empAttendance/clock-in', { emp_id, name, email, date, clock_in });

            if (response.status === 200) {
                console.log("Clock-in successful");
                // Fetch updated data after successful clock-in
                await fetchData();
            } else {
                console.error("Clock-in request failed with status:", response.status);
            }
        } catch (error) {
            console.error("Error during clock-in request:", error);
        }
    };


    const handleCheckOut = async () => {
        if (checkedAttendance) {
            try {
                const response = await axios.put(`https://hrms-server-ygpa.onrender.com/empAttendance/${checkedAttendance}`, { clock_out })

                if (response.status === 200) {
                    console.log("Clock-in successful");
                    await fetchData();
                } else {
                    console.error("Clock-in request failed with status:", response.status);
                }
            } catch (error) {
                console.error("Error during clock-in request:", error);
            }
        } else {
            console.log("not clock_in Data")
        }
    };

    return (
        <Grid container className={styles.empAttendancePageContainer}>
            <Grid className={styles.empAttendanceSidebar}>
                <Sidebar
                    menuData={menuData}
                    handleLogout={handleLogout}
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
                    <Route path='/attendance' element={<Attendance attendanceData={attendanceData} />} />
                    <Route path='/leaves' element={<Leave />} />
                </Routes>
            </Grid>
            <ToastContainer />
        </Grid>
    )
}

export default EmpAttendancePage    