import React from 'react'
import styles from './CustomLoader.module.scss'
import { Box, Grid, Typography } from '@mui/material';


const CustomLoader = () => {
    return (
        <Grid className={styles.customLoaderContainer}>
            <Grid className={styles.customLoader}>
                <Box></Box>
                <Typography variant='h6' fontSize={16} fontWeight={500}>Loading...</Typography>
            </Grid>
        </Grid>
    )
}

export default CustomLoader