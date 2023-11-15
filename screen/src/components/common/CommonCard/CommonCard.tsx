import React from 'react'
import styles from './CommonCard.module.scss'
import { Box, Grid, Typography } from '@mui/material'

export interface ICommonCard {
    icon: any;
    heading: string;
    number: any;
    color: string;
    backgroundColor: string;
}
const CommonCard = ({ icon, heading, number, backgroundColor, color }: ICommonCard) => {

    return (
        <Grid className={styles.commonCardContainer}>
            <Box>
                <Grid style={{ backgroundColor: backgroundColor }}>{icon}</Grid>
                <Box>
                    <Typography>Total</Typography>
                    <Typography variant='h5'>{heading}</Typography>
                </Box>
            </Box>
            <Box>
                <Typography style={{ color: color }} variant='h5' fontSize={21}>{number}</Typography>
            </Box>
        </Grid>
    )
}

export default CommonCard