import React, { useState, useEffect } from 'react'
import styles from './LeaveTable.module.scss'
import { Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CommonButton from '../../common/CommonButton/CommonButton'
import { MdEdit, MdDelete } from "react-icons/md";
import CustomLoader from '../../CustomLoader/CustomLoader';

export interface ILeaveTable {
    loading: boolean;
    data: any;
    handleEdit: (idx: string) => void;
    handleDelete: (idx: string) => void;
}

const LeaveTable = ({ loading, data, handleEdit, handleDelete }: ILeaveTable) => {
    const [name, setName] = useState()
    const [empId, setEmpId] = useState()
    useEffect(() => {
        const dataString: any = localStorage.getItem("loginedUser")
        const data = JSON.parse(dataString)
        const { name, emp_id } = data;
        setName(name)
        setEmpId(emp_id)
    }, [])
    return (
        <>
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
                </Table>
            </TableContainer>
            <TableContainer className={styles.leaveTableContainer}>
                {loading ? <CustomLoader /> : <Table>
                    <TableBody>
                        {data && data.filter((leave: any) => leave.emp_id === empId).map((item: any, idx: number) => {
                            return (
                                <TableRow key={idx}>
                                    <TableCell>
                                        <CommonButton name={empId} />
                                    </TableCell>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{item.leave_type}</TableCell>
                                    <TableCell>{item.start_date}</TableCell>
                                    <TableCell>{item.end_date}</TableCell>
                                    <TableCell>{item.total_days}</TableCell>
                                    <TableCell>{item.leave_reason}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell className={styles.leaveAction}>
                                        <MdEdit fontSize={30} onClick={(() => handleEdit(item._id))} />
                                        <MdDelete fontSize={30} onClick={(() => handleDelete(item._id))} />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>}
            </TableContainer>
        </>
    )
}

export default LeaveTable