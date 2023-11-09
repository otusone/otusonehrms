import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Grid } from '@mui/material'
import styles from './Calender.module.scss'

const Calender = () => {
    return (
        <Grid className={styles.calenderContainer}>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
            />
        </Grid>
    )
}

export default Calender