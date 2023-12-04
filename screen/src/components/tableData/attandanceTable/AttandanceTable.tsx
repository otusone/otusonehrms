import React from 'react'
import styles from './AttandanceTable.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CommonButton from '../../common/CommonButton/CommonButton';
import CustomLoader from '../../CustomLoader/CustomLoader';

export interface IAttandanceTable {
    tableHeading: any;
    tableData: any;
    loading: boolean;
}
const AttandanceTable = ({ tableHeading, tableData, loading }: IAttandanceTable) => {

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
                </Table>
            </TableContainer>
            <TableContainer>
                {loading ? <CustomLoader /> : <Table><TableBody>
                    {tableData.map((item: any) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <CommonButton name={item.emp_id} onClick={(() => console.log("hi"))} />
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.clock_in}</TableCell>
                                <TableCell>{item.clock_out}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody></Table>}

            </TableContainer>
        </Grid>
    )
}

export default AttandanceTable