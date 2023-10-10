import React, { useState } from 'react'
import styles from './CommonTable.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CommonButton from '../CommonButton/CommonButton';
import { MdOutlineMode } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import SearchBox from '../searchBox/SerachBox'

export interface ICommonTable {
    heading: string;
    tableData: any;
    IsEmployeeID: boolean;
    IsAction: boolean;
    tableTitle: any
    IsStatus: boolean;
    IsProperty: boolean;
    IsCol_7: boolean
}

const CommonTable = ({ heading, tableTitle, tableData, IsEmployeeID, IsAction, IsStatus, IsProperty, IsCol_7 }: ICommonTable) => {
    const [edit, setEdit] = useState({})
    const editHandler = (itemId: number) => {
        return (
            console.log(itemId, "itemId")
        )
    }
    const deleteHandler = (itemId: number) => {
        console.log("delete")
    }
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
                                    {IsEmployeeID ? <TableCell> <CommonButton name={item.col_1} onClick={function (): void {
                                        throw new Error('Function not implemented.');
                                    } } /> </TableCell>
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
                                    {IsAction ?
                                        <TableCell className={styles.tableAction}>
                                            <MdOutlineMode onClick={() => { console.log(item.id); editHandler(item.id) }} fontSize={30}
                                            />
                                            <RiDeleteBinLine onClick={() => { console.log(item.id); deleteHandler(item.id) }} fontSize={30} />
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

export default CommonTable;