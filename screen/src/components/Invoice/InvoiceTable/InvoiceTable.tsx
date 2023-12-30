import React from 'react'
import styles from './InvoiceTable.module.scss'
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { MdEdit, MdDelete } from "react-icons/md";
import CommonButton from '../../common/CommonButton/CommonButton';
import { MdAdd } from "react-icons/md";



const InvoiceTable = () => {
    return (
        <Grid className={styles.invoiceTableContainer}>
            <TableContainer>
                <Table>
                    <TableHead sx={{ backgroundColor: "#58024B" }}>
                        <TableRow >
                            <TableCell sx={{ color: "#ffffff" }}>Item</TableCell>
                            <TableCell sx={{ color: "#ffffff" }}>Quantity</TableCell>
                            <TableCell sx={{ color: "#ffffff" }}>Rate</TableCell>
                            <TableCell sx={{ color: "#ffffff" }}>Amount</TableCell>
                            <TableCell sx={{ color: "#ffffff" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Rate</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>
                                <MdEdit fontSize={20} cursor={"pointer"} />
                                <MdDelete fontSize={20} cursor={"pointer"} />
                            </TableCell>
                        </TableRow>
                        {/* <TableRow className={styles.add}>
                            <TableCell sx={{textAlign:"center"}}>Add</TableCell>
                        </TableRow> */}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid>
                <Typography textAlign={"center"} sx={{ paddingBlock: 1, }}> <MdAdd fontSize={22} />Add</Typography>
            </Grid>
        </Grid>
    )
}

export default InvoiceTable