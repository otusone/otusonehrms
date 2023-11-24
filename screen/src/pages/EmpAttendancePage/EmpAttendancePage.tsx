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
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

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

    useEffect(() => {
        axios.get('https://hrms-server-ygpa.onrender.com/empAttendance')
            .then(result => {
                const data = result.data.EmpAttendanceData;
                if (Array.isArray(data) && data.length > 0) {
                    const lastIndex = data.length - 1;
                    const lastItem = data[lastIndex];
                    const attendance_id = lastItem._id;
                    setCheckedAttendance(attendance_id)
                } else {
                    console.log("Data is not an array or is empty");
                }
                setAttendanceData(data)
            })
        const empDataString: any = localStorage.getItem("loginedUser")
        const empData = JSON.parse(empDataString);
        const empEmail = empData.email;
        setEmail(empEmail)
    }, [attendanceData]);


    const handleCheckIn = () => {

        axios.post('https://hrms-server-ygpa.onrender.com/empAttendance/clock-in', { emp_id, name, email, date, clock_in })
            .then(result => {
                console.log(result, "result...")
            })
    };

    const handleCheckOut = () => {

        if (checkedAttendance) {
            axios.put(`https://hrms-server-ygpa.onrender.com/empAttendance/${checkedAttendance}`, { clock_out })
                .then(response => {
                    console.log('Update successful:', response);
                })
                .catch(error => {
                    console.error('Error updating data:', error);
                });
        } else { console.log("not Checked") }

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
            {/* <ToastContainer /> */}
        </Grid>
    )
}

export default EmpAttendancePage    