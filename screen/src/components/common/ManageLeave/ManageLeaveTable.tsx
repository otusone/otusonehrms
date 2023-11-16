import React, { useState } from 'react'
import styles from './ManageLeaveTable.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CommonButton from '../CommonButton/CommonButton';
import { MdOutlineMode } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiRightArrow } from 'react-icons/bi';
import SearchBox from '../searchBox/SearchBox'

export interface IManageLeaveTable {
    heading: string;
    tableData: any;
    tableTitle: any
    IsManageLeaveAction: boolean;
    leaveActionHandler?: any
    editHandler?: any;
    deleteHandler: any
}

const ManageLeaveTable = ({ heading, tableTitle, tableData,  IsManageLeaveAction, leaveActionHandler, editHandler,deleteHandler }: IManageLeaveTable) => {
    return (
        <Grid className={styles.commonTableContainer}>
            <TableHead className={styles.tableHead}>
                <TableCell sx={{ fontSize: 20 }}>{heading}</TableCell>
                <TableCell sx={{ fontSize: 20 }}><SearchBox /></TableCell>
            </TableHead>
            <TableContainer>
                <Table>
                    <TableHead style={{ backgroundColor: "#58024B" }}>
                        <TableRow>
                            {tableTitle.map((item: any) => {
                                return (
                                    <TableCell style={{ color: "white" }}>{item.title}</TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((item: any) => {
                            return (
                                <>
                                    <TableRow key={item.id}>
                                        <TableCell>{item.emp_id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.leave_type}</TableCell>
                                        <TableCell>{item.start_date}</TableCell>
                                        <TableCell>{item.end_date}</TableCell>
                                        <TableCell>{item.total_day}</TableCell>
                                        <TableCell>{item.leave_reason}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell className={styles.tableAction}>
                                            {IsManageLeaveAction ? <BiRightArrow onClick={() => { leaveActionHandler(); }} fontSize={30} /> : ""}

                                            <MdOutlineMode onClick={() => { console.log(item.id); editHandler(item.id) }} fontSize={30}
                                            />
                                            <RiDeleteBinLine onClick={() => { console.log(item.id); deleteHandler(item.id) }} fontSize={30} />
                                        </TableCell>
                                    </TableRow>
                                    {/* <TableRow key={item.id}>
                                    {IsEmployeeID ? <TableCell> <CommonButton name={item.col_1} onClick={function (): void {
                                        throw new Error('Function not implemented.');
                                    }} /> </TableCell>
                                        :
                                        <TableCell> {item.col_1} </TableCell>}
                                    <TableCell>{item.col_2}</TableCell>
                                    <TableCell>{item.col_3}</TableCell>
                                    {IsStatus ? <TableCell>{item.property}</TableCell> : ""}
                                    <TableCell>{item.col_4}</TableCell>
                                    <TableCell>{item.col_5}</TableCell>
                                    {IsProperty ? <TableCell>{item.status}</TableCell> : ""}
                                    <TableCell>{item.col_6}</TableCell>
                                    {IsCol_7 ? <TableCell>{item.col_7}</TableCell> : ""}
                                    {IsManageLeaveStatus ? <TableCell>{item.col_8}</TableCell> : ""}
                                    {IsAction ?
                                        <TableCell className={styles.tableAction}>
                                            {IsManageLeaveAction ? <BiRightArrow onClick={() => { LeaveActionHandler(); }} fontSize={30} /> : ""}

                                            <MdOutlineMode onClick={() => { console.log(item.id); editHandler(item.id) }} fontSize={30}
                                            />
                                            <RiDeleteBinLine onClick={() => { console.log(item.id); deleteHandler(item.id) }} fontSize={30} />
                                        </TableCell>
                                        : ""}
                                </TableRow> */}
                                </>

                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default ManageLeaveTable;