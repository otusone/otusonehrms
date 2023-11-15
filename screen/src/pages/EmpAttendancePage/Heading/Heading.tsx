import React from 'react'
import styles from './Heading.module.scss'
import { Grid, Box, Typography, Button } from '@mui/material'
import { FaRegCircleUser } from "react-icons/fa6";
import img from '../../../asserst/images/profile_pic.jpg'
import HeadingNotification from '../../../components/heading/headingNotification/HeadingNotification';
import CommonButton from '../../../components/common/CommonButton/CommonButton';


const Heading = () => {
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
                <CommonButton name={"Check In"} onClick={function (): void {
                    throw new Error('Function not implemented.');
                } } />
                <CommonButton name={"Check Out"} onClick={function (): void {
                    throw new Error('Function not implemented.');
                } } />
            </Grid>

        </Grid>
    )
}

export default Heading