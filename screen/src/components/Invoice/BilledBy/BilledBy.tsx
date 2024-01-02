import React from 'react'
import styles from './BilledBy.module.scss'
import { Grid, Typography } from '@mui/material'
import BilledCard from '../BilledCard/BilledCard'

const BilledBy = () => {
    return (
        <Grid className={styles.billedByContainer}>
            <Typography variant='h5' fontSize={20} fontWeight={500}>Billed By
                <span style={{ fontSize: 15, color: "#617183", paddingInline: 5 }}>(Your Details)</span>
            </Typography>
            <BilledCard />
        </Grid>
    )
}

export default BilledBy;