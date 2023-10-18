import React, { useState } from 'react'
import styles from './EmployeeTable.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { MdOutlineMode } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiRightArrow } from 'react-icons/bi';
import CommonButton from '../../common/CommonButton/CommonButton';
import SearchBox from '../../common/searchBox/SearchBox';

export interface IEmployeeTable {
    heading?: string;
    tableTitle?: any;
    tableData?: any;
    handleLeaveAction?: any;
    handleEdit?: any;
    handleDelete?: any;
}

const EmployeeTable = ({ heading, tableTitle, tableData, handleLeaveAction, handleEdit, handleDelete }: IEmployeeTable) => {


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
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <CommonButton name={item.emp_id} onClick={(() => console.log("hi"))} />
                                    </TableCell>
                                    <TableCell>{item.employee}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.branch}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                                    <TableCell>{item.designation}</TableCell>
                                    <TableCell>{item.dateOfJoing}</TableCell>
                                    <TableCell className={styles.tableAction}>
                                        <BiRightArrow onClick={handleLeaveAction} fontSize={30} />

                                        <MdOutlineMode onClick={handleEdit} fontSize={30}
                                        />
                                        <RiDeleteBinLine onClick={handleDelete} fontSize={30} />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default EmployeeTable;