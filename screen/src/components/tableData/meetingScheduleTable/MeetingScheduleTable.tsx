import React from 'react'
import styles from './MeetingScheduleTable.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import HeadingText from '../../HeadingText/HeadingText';

export interface TableDataTYpe {
    title: string;
    date: string;
    time: string;
}
const MeetingScheduleTable = ({ data }: any) => {
    return (
        <Grid className={styles.meetingScheduleTableContainer}>
            <HeadingText
                heading={"Meeting Schedule"}
            />
            <TableContainer>
                <Table>
                    <TableHead sx={{ backgroundColor: "#58024B" }}>
                        <TableRow>
                            <TableCell sx={{ color: "#ffffff" }}>TITLE</TableCell>
                            <TableCell sx={{ color: "#ffffff" }}>DATE</TableCell>
                            <TableCell sx={{ color: "#ffffff" }}>TIME</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((item: TableDataTYpe, idx: number) => {
                            return (
                                <TableRow key={idx}>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.time}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default MeetingScheduleTable