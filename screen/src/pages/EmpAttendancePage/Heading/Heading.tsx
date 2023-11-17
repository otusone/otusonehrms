import React, { useEffect, useState } from 'react'
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
    const [date, setDate] = useState<any>('');
    const [headingName, setHeadingName] = useState<any>('');

    useEffect(() => {

        const today = new Date();
        const formatedDate = today.toDateString();
        setDate(formatedDate);

        const userEmail = localStorage.getItem('email')
        const userString = localStorage.getItem("user");
        const users = userString ? JSON.parse(userString) : null;
        const findUser = users.find((user: { email: string; }) => user.email === userEmail)
        const userName = findUser.username;
        setHeadingName(userName);

    }, []);

    return (
        <Grid container className={styles.headingContainer}>
            <Grid >
                <Box>
                    <img src={img} alt='img' />
                </Box>
                <Box>
                    <Typography variant='h4' fontWeight={600} fontSize={25}>Welcome, {headingName}</Typography>
                    <Typography fontSize={15}>{date}</Typography>
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