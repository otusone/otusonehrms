import React from 'react'
import styles from './BilledCard.module.scss'
import { Grid, Box, Typography } from '@mui/material'

export interface IBilledCard {
    heading: string;
    name: string;
    address: string;
}
const BilledCard = ({ heading, name, address }: IBilledCard) => {
    return (
        <Grid className={styles.billedCardContainer}>
            <Typography variant='h4' fontSize={20} fontWeight={500} >{heading}</Typography>
            <Box>
                <Typography variant='h5' fontSize={18} fontWeight={500}>Name: <span>{name}</span></Typography>
                <Typography variant='h5' fontSize={18} fontWeight={500}>Address: <span>{address}</span></Typography>
            </Box>
        </Grid>
    )
}

export default BilledCard