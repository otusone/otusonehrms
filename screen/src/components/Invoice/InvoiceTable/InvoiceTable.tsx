import React from 'react'
import styles from './InvoiceTable.module.scss'
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { MdEdit, MdDelete } from "react-icons/md";
import CommonButton from '../../common/CommonButton/CommonButton';
import { MdAdd } from "react-icons/md";


export interface IInvoiceTable {
    handleClick: any;
    data: any;
    handleEdit: any;
    handleDelete: any;
}
const InvoiceTable = ({ data, handleClick, handleEdit, handleDelete }: IInvoiceTable) => {
    return (
        <Grid className={styles.invoiceTableContainer}>
            <TableContainer>
                <Table>
                    <TableHead sx={{ backgroundColor: "#58024B" }}>
                        <TableRow >
                            <TableCell sx={{ color: "#ffffff" }}>Item</TableCell>
                            <TableCell sx={{ color: "#ffffff" }}>Quantity</TableCell>
                            <TableCell sx={{ color: "#ffffff" }}>GST</TableCell>
                            <TableCell sx={{ color: "#ffffff" }}>Amount</TableCell>
                            <TableCell sx={{ color: "#ffffff" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((item: any) => {
                            return (
                                <TableRow key={item._id}>
                                    <TableCell>{item.item}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.gst}%</TableCell>
                                    <TableCell>Rs.{item.amount}/-</TableCell>
                                    <TableCell>
                                        <MdEdit fontSize={20} cursor={"pointer"} onClick={(() => handleEdit(item._id))} />
                                        <MdDelete fontSize={20} cursor={"pointer"} onClick={(() => handleDelete(item._id))} />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid onClick={handleClick} sx={{ cursor: "pointer" }}>
                <Box>
                    <MdAdd fontSize={22} />
                    <Typography textAlign={"center"} sx={{ paddingBlock: 1, }}> Add</Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default InvoiceTable