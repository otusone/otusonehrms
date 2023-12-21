import React from 'react'
import styles from './MeetingSchedule.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import HeadingText from '../../HeadingText/HeadingText';



export interface IMeetingSchedule {
    data: any;
    handleClick: any;
    handleEdit: any
}

const MeetingSchedule = ({ data, handleClick, handleEdit }: IMeetingSchedule) => {
    return (
        <Grid className={styles.meetingScheduleContainer}>
            <HeadingText heading={'Announcement List'} IsAction={true} name='Create' handleClick={handleClick} />
            <TableContainer>
                <Table>
                    <TableHead style={{ backgroundColor: "#58024B" }}>
                        <TableRow >
                            <TableCell style={{ color: "white" }}>TITLE</TableCell>
                            <TableCell style={{ color: "white" }}>START DATE</TableCell>
                            <TableCell style={{ color: "white" }}>START TIME</TableCell>
                            <TableCell style={{ color: "white" }}>DESCRIPTION</TableCell>
                            <TableCell style={{ color: "white" }}>ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item: any) => {
                            return (
                                <TableRow>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.time}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>
                                        <MdEdit fontSize={22} cursor={"pointer"} style={{ color: "#3EC8D5" }} onClick={handleEdit} />
                                        <MdDelete fontSize={22} cursor={"pointer"} style={{ color: "#FF3A6E" }} />
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

export default MeetingSchedule