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

    // useEffect(() => {

    //     const today = new Date();
    //     const formatedDate = today.toDateString();
    //     setDate(formatedDate);

    //     const userEmail = localStorage.getItem('email')
    //     const userString = localStorage.getItem("user");
    //     const users = userString ? JSON.parse(userString) : 'null';
    //     const findUser = users.find((user: { email: string; }) => user.email === userEmail)
    //     const userName = findUser.username;
    //     setHeadingName(userName);

    // }, []);

    useEffect(() => {
        const today = new Date();
        const formatedDate = today.toDateString();
        setDate(formatedDate);

        const userEmail = localStorage.getItem('email');
        const userString = localStorage.getItem('user');
        let users = [];

        try {
            // Parse the userString only if it is not null or undefined
            if (userString) {
                users = JSON.parse(userString);

                // Check if users is an array before using the find method
                if (Array.isArray(users)) {
                    const findUser = users.find((user) => user.email === userEmail);

                    if (findUser) {
                        const userName = findUser.username;
                        setHeadingName(userName);
                    } else {
                        console.log('User not found');
                    }
                } else {
                    console.log('Users is not an array');
                }
            } else {
                console.log('User string is null or undefined');
            }
        } catch (error) {
            console.error('Error parsing userString:', error);
        }
    }, []);

    return (
        <Grid container className={styles.headingContainer}>
            <Grid >
                <Box>
                    {img && <img src={img} alt='img' />}
                </Box>
                <Box>
                    {headingName && <Typography variant='h4' fontWeight={600} fontSize={25}>Welcome, {headingName}</Typography>}
                    {date && <Typography fontSize={15}>{date}</Typography>}
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