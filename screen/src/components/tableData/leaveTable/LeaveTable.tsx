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
                            <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>EMPLOYEE ID</TableCell>
                            <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>EMPLOYEE</TableCell>
                            <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>Leave Type</TableCell>
                            <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>START DATE</TableCell>
                            <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>END DATE</TableCell>
                            <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>TOTAL DAYS</TableCell>
                            <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>LEAVE REASON</TableCell>
                            <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>STATUS</TableCell>
                            <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>ACTION</TableCell>
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
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <CommonButton name={empId} />
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{name}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.leave_type}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.start_date}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.end_date}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.total_days}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.leave_reason}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.status}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }} className={styles.leaveAction}>
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