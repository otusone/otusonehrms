import React from 'react'
import styles from './AttandanceTable.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { MdOutlineMode } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';

export interface IAttandanceTable {
    tableHeading: any;
    tableData: any;
    IsAction: boolean;
    editAction: any;
    deleteHandler: any
}
const AttandanceTable = ({ tableHeading, tableData, IsAction, editAction, deleteHandler }: IAttandanceTable) => {
    // const deleteHandler = (itemID: any) => { }
    return (
        <Grid className={styles.attandanceTableContainer}>
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
                        {tableData.map((item: any) => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{item.clock_in}</TableCell>
                                    <TableCell>{item.clock_out}</TableCell>
                                    <TableCell>{item.late}</TableCell>
                                    <TableCell>{item.early_leaving}</TableCell>
                                    <TableCell>{item.overtime}</TableCell>
                                    {IsAction ?
                                        <TableCell className={styles.tableAction}>
                                            <MdOutlineMode onClick={() => { console.log(item.id); editAction(item.id) }} fontSize={30}
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

export default AttandanceTable