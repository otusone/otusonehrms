import React, { useEffect, useState } from 'react'
import styles from './Heading.module.scss'
import { Grid, Box, Typography, Button } from '@mui/material'
import img from '../../../asserst/images/profile_pic.jpg'
import CommonButton from '../../../components/common/CommonButton/CommonButton';
import HeadingNotification from '../../../components/heading/headingNotification/HeadingNotification';
import { useLocation } from 'react-router-dom';

export interface IHeading {
    handleCheckIn?: any;
    handleCheckOut?: any;
    IsAction?: boolean;
}
const Heading = ({ handleCheckIn, handleCheckOut, IsAction }: IHeading) => {
    const location = useLocation();
    const [date, setDate] = useState<any>('');
    const [headingName, setHeadingName] = useState<any>('');

    const path = location.pathname;
    console.log(path, "path...")

    useEffect(() => {

        const today = new Date();
        const formatedDate = today.toDateString();
        setDate(formatedDate);

        const userName = localStorage.getItem('userName')
        if (userName) {
            setHeadingName(userName)
        } else {
            console.log('No logined user found');
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
                        {path === "/attendance" ?
                            <>
                                <CommonButton name={"Check In"} onClick={handleCheckIn} />
                                <CommonButton name={"Check Out"} onClick={handleCheckOut} />
                            </>
                            :
                            ""}
                    </Box> :
                    <Box>
                        <HeadingNotification />
                    </Box>}
            </Grid>
        </Grid>
    )
}

export default Heading