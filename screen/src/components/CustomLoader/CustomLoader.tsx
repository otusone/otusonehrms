import React from 'react'
import styles from './CustomLoader.module.scss'
import { Grid, Typography } from '@mui/material';


const CustomLoader = () => {
    return (
        <Grid className={styles.customLoaderContainer}>
            <Grid className={styles.customLoader}>
            </Grid>
        </Grid>
    )
}

export default CustomLoader