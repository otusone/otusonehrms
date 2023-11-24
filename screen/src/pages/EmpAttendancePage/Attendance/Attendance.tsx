import React, { useEffect, useState } from 'react'
import styles from './Attendance.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios';
import CommonButton from '../../../components/common/CommonButton/CommonButton';
import HeadingText from '../../../components/HeadingText/HeadingText';

const Attendance = ({ attendanceData }: any) => {
    const [email, setEmail] = useState<any>('')

    useEffect(() => {
        const empDataString: any = localStorage.getItem("loginedUser")
        const empData = JSON.parse(empDataString);
        const empEmail = empData.email;
        setEmail(empEmail)
    }, []);

    return (
        <Grid className={styles.attendanceContainer}>
            <HeadingText heading={'Attendance List'} />
            <Grid container className={styles.attendance}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#58024B" }}>
                                <TableCell sx={{ color: "#ffffff" }}>EMPLOYEE ID</TableCell>
                                <TableCell sx={{ color: "#ffffff" }}>EMPLOYEE</TableCell>
                                <TableCell sx={{ color: "#ffffff" }}>DATE</TableCell>
                                <TableCell sx={{ color: "#ffffff" }}>STATUS</TableCell>
                                <TableCell sx={{ color: "#ffffff" }}>CHECK IN</TableCell>
                                <TableCell sx={{ color: "#ffffff" }}>CHECK OUT</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                attendanceData?.filter((emp: {
                                    [x: string]: any; employee: any;
                                }) => emp.email === email).map((item: any, idx: number) => {
                                    return (
                                        <TableRow key={idx}>
                                            <TableCell>
                                                <CommonButton name={item.emp_id} />
                                            </TableCell>
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
        </Grid>
    )
}

export default Attendance;