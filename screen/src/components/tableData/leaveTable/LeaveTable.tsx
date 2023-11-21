import React from 'react'
import styles from './LeaveTable.module.scss'
import { Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CommonButton from '../../common/CommonButton/CommonButton'
import { MdEdit, MdDelete } from "react-icons/md";


const LeaveTable = ({ data }: any) => {
    return (
        <TableContainer className={styles.leaveTableContainer}>
            <Table>
                <TableHead style={{ backgroundColor: "#58024B" }}>
                    <TableRow>
                        <TableCell sx={{ color: "#ffffff" }}>EMPLOYEE ID</TableCell>
                        <TableCell sx={{ color: "#ffffff" }}>EMPLOYEE</TableCell>
                        <TableCell sx={{ color: "#ffffff" }}>Leave Type</TableCell>
                        <TableCell sx={{ color: "#ffffff" }}>START DATE</TableCell>
                        <TableCell sx={{ color: "#ffffff" }}>END DATE</TableCell>
                        <TableCell sx={{ color: "#ffffff" }}>TOTAL DAYS</TableCell>
                        <TableCell sx={{ color: "#ffffff" }}>LEAVE REASON</TableCell>
                        <TableCell sx={{ color: "#ffffff" }}>STATUS</TableCell>
                        <TableCell sx={{ color: "#ffffff" }}>ACTION</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.map((item: any) => {
                        return (
                            <TableRow>
                                <TableCell>
                                    <CommonButton name={item.emp_id} />
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.leave_type}</TableCell>
                                <TableCell>{item.start_date}</TableCell>
                                <TableCell>{item.end_date}</TableCell>
                                <TableCell>{item.total_days}</TableCell>
                                <TableCell>{item.leave_reason}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell className={styles.leaveAction}>
                                    <MdEdit fontSize={20} cursor={"pointer"} />
                                    <MdDelete fontSize={20} cursor={"pointer"} />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default LeaveTable