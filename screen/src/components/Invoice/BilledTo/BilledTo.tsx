import React from 'react'
import styles from './BilledTo.module.scss'
import SelectClientCard from '../SelectClientCard/SelectClientCard'
import { Grid, Typography } from '@mui/material'
export interface IBilledTo {
    handleClick: any
}
const BilledTo = ({ handleClick }: IBilledTo) => {
    return (
        <Grid className={styles.billedToContainer}>
            <Typography variant='h5' fontSize={20} fontWeight={500}>Billed By
                <span style={{ fontSize: 15, color: "#617183", paddingInline: 5 }}>(Your Details)</span>
            </Typography>
            <SelectClientCard handleClick={handleClick} />
        </Grid>
    )
}

export default BilledTo