import React from 'react'
import styles from './BilledCard.module.scss'
import { Grid, Box, Typography } from '@mui/material'

const BilledCard = () => {
    return (
        <Grid className={styles.billedCardContainer}>
            <Typography variant='h4' fontSize={20} fontWeight={500} >Billed By</Typography>
            <Box>
                <Typography variant='h5' fontSize={18} fontWeight={500}>Name: <span>Anuj</span></Typography>
                <Typography variant='h5' fontSize={18} fontWeight={500}>Address: <span>Noida, UP, India 201301</span></Typography>
            </Box>

        </Grid>
    )
}

export default BilledCard