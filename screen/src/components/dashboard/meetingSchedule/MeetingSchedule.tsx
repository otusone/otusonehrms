import React from 'react'
import styles from './MeetingSchedule.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

export interface IMeetingSchedule {
    heading: string;
    data: any;
    title1st: string;
    title2nd: string;
    title3rd?: string;
    title4th?: string
    Is3rdCell: boolean;
    Is4thCell: boolean;
}

const MeetingSchedule = ({ heading, title1st, title2nd, title3rd, title4th, Is4thCell, Is3rdCell, data }: IMeetingSchedule) => {
    return (
        <Grid className={styles.meetingScheduleContainer}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell sx={{ fontSize: 20 }}>{heading}</TableCell>
                    </TableHead>
                    <TableHead style={{ backgroundColor: "#58024B" }}>
                        <TableRow >
                            <TableCell style={{ color: "white" }}>{title1st}</TableCell>
                            <TableCell style={{ color: "white" }}>{title2nd}</TableCell>
                            <TableCell style={{ color: "white" }}>{title3rd}</TableCell>
                            <TableCell style={{ color: "white" }}>{title4th}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item: any) => {
                            return (
                                <TableRow>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    {Is3rdCell ? <TableCell>{item.time}</TableCell> : ""}
                                    {Is4thCell ? <TableCell>{item.description}</TableCell> : ""}
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