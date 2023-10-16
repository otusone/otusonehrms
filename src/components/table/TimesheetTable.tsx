import React, { useState } from 'react'
import styles from './TimesheetTable.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { MdOutlineMode } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import AttandanceModal from '../attandanceModal/AttandanceModal';
import DeleteModal from '../deleteModal/DeleteModal';

export interface ITimesheetTable {
    tableHeading: any;
    tableData: any;
    IsAction: boolean;
    deleteTable?: any;
    deleteHandler?: any;
}

const TimesheetTable = ({ tableHeading, tableData, IsAction, deleteHandler }: ITimesheetTable) => {
    const [open, setOpen] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const openModal = () => setOpen(!open)
    const handleClose = () => setOpen(false)
    const editHandler = (itemID: any) => { }
    const deleteModal = () => setOpenDeleteModal(!openDeleteModal)

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
                        {tableData.map((item: any, idx:any) => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell>{item.employee}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.hours}</TableCell>
                                    <TableCell>{item.remark}</TableCell>
                                    {IsAction ?
                                        <TableCell className={styles.tableAction}>
                                            <MdOutlineMode onClick={() => { openModal(); editHandler(item.id) }} fontSize={30}
                                            />
                                            <RiDeleteBinLine onClick={() => deleteHandler(item.id)} fontSize={30} />
                                        </TableCell>
                                        : ""}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <AttandanceModal
                heading={'Edit Timesheet'}
                open={open}
                handleClose={handleClose}
            />
            {/* <DeleteModal
                heading={'Are you sure?'}
                subHeading={'This action can not be undone. Do you want to continue?'}
                open={openDeleteModal}
                clossModal={undefined}
                noHandler={cancelDelete}
                yesHandler={deleteTable}
            /> */}
        </Grid>
    )
}

export default TimesheetTable;