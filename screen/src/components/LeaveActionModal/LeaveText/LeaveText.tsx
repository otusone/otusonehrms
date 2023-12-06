import { Grid, Typography } from '@mui/material'
import React from 'react'
import styles from './LeaveText.module.scss'

export interface ILeaveText {
    name: string;
    lebel: string;
}
const LeaveText = ({ name, lebel }: ILeaveText) => {
    return (
        <Grid className={styles.leaveTestContainer} >
            <Typography variant='h6' fontSize={16} fontWeight={600}>{name}:<span style={{ fontWeight: 500, paddingInlineStart: 5 }}>{lebel}</span></Typography>
        </Grid>
    )
}

export default LeaveText