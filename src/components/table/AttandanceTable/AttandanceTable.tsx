import React from 'react'
import styles from './AttandanceTable.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { MdOutlineMode } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';

export interface IAttandanceTable {
    tableHeading: any;
    tableData: any;
    IsAction: boolean;
}
const AttandanceTable = ({ tableHeading, tableData, IsAction }: IAttandanceTable) => {
    const editHandler = (itemID: any) => { }
    const deleteHandler = (itemID: any) => { }

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
                                    <TableCell>{item.row_1}</TableCell>
                                    <TableCell>{item.row_2}</TableCell>
                                    <TableCell>{item.row_3}</TableCell>
                                    <TableCell>{item.row_4}</TableCell>
                                    <TableCell>{item.row_5}</TableCell>
                                    <TableCell>{item.row_6}</TableCell>
                                    <TableCell>{item.row_7}</TableCell>
                                    <TableCell>{item.row_8}</TableCell>
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

export default AttandanceTable