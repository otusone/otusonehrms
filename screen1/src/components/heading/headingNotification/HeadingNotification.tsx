import React from 'react'
import styles from './HeadingNotification.module.scss'
import { Grid, Typography } from '@mui/material'
import { BsChatDots } from 'react-icons/bs';


const HeadingNotification = () => {
    return (
        <Grid className={styles.headingNotification}>
            <BsChatDots fontSize={18} />
            <Grid className={styles.notificationBox}>
                <Typography>0</Typography>
            </Grid>
        </Grid>
    )
}

export default HeadingNotification