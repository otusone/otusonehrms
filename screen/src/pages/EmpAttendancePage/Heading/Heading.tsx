import React from 'react'
import styles from './Heading.module.scss'
import { Grid, Box, Typography, Button } from '@mui/material'
import img from '../../../asserst/images/profile_pic.jpg'
import CommonButton from '../../../components/common/CommonButton/CommonButton';
import HeadingNotification from '../../../components/heading/headingNotification/HeadingNotification';

export interface IHeading {
    handleCheckIn?: any;
    handleCheckOut?: any;
    IsAction?: boolean;
}
const Heading = ({ handleCheckIn, handleCheckOut, IsAction }: IHeading) => {
    return (
        <Grid container className={styles.headingContainer}>
            <Grid >
                <Box>
                    <img src={img} alt='img' />
                </Box>
                <Box>
                    <Typography variant='h4' fontWeight={600} fontSize={25}>Welcome, Sharry Lin</Typography>
                    <Typography fontSize={15}>Monday, 20 May 2019</Typography>
                </Box>
            </Grid>
            <Grid >
                {IsAction
                    ?
                    <Box>
                        <CommonButton name={"Check In"} onClick={handleCheckIn} />
                        <CommonButton name={"Check Out"} onClick={handleCheckOut} />
                    </Box> :
                    <Box>
                        <HeadingNotification />
                    </Box>}
            </Grid>
        </Grid>
    )
}

export default Heading