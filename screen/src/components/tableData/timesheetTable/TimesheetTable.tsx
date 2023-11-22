import React, { useState } from 'react'
import styles from './TimesheetTable.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { MdOutlineMode } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';

export interface ITimesheetTable {
    tableHeading: any;
    tableData: any;
    IsAction: boolean;
    editHandler: any;
    deleteHandler?: any;
}

const TimesheetTable = ({ tableHeading, tableData, IsAction, editHandler, deleteHandler }: ITimesheetTable) => {

    return (
        <Grid className={styles.meetingScheduleContainer}>
            <TableContainer>
                <Table>
                    <TableHead style={{ backgroundColor: "#58024B" }}>
                        <TableRow >
                            {tableHeading.map((item: any) => {
                                return (
                                    <TableCell key={item.id} style={{ color: "white" }}>{item.title}</TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((item: any,) => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell>{item.emp_id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.hours}</TableCell>
                                    <TableCell>{item.remark}</TableCell>
                                    {IsAction ?
                                        <TableCell className={styles.tableAction}>
                                            <MdOutlineMode onClick={(() => editHandler(item.id))} fontSize={30}
                                            />
                                            <RiDeleteBinLine onClick={(() => deleteHandler(item.id))} fontSize={30} />
                                        </TableCell>
                                        : ""}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default TimesheetTable;