import React, { useEffect, useState } from 'react'
import styles from './Heading.module.scss'
import { Grid, Box, Typography, Button } from '@mui/material'
import img from '../../../asserst/images/profile_pic.jpg'
import CommonButton from '../../../components/common/CommonButton/CommonButton';
import HeadingNotification from '../../../components/heading/headingNotification/HeadingNotification';
import { useLocation } from 'react-router-dom';
import { LuAlignJustify } from "react-icons/lu";


export interface IHeading {
    handleCheckIn?: any;
    handleCheckOut?: any;
    IsAction?: boolean;
}
const Heading = ({ handleCheckIn, handleCheckOut, IsAction }: IHeading) => {
    const location = useLocation();
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [date, setDate] = useState<any>('');
    const [headingName, setHeadingName] = useState<any>('');

    const path = location.pathname;

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
    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Grid container className={styles.headingContainer}>
            <Grid >
                <Box>
                    {typeof window !== 'undefined' && window.innerWidth && window.innerWidth < 480 ? <LuAlignJustify fontSize={35} /> : <>{img && <img src={img} alt='img' />}</>}

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
                        {typeof window !== 'undefined' && window.innerWidth && window.innerWidth < 480 ? <img src='' /> : <HeadingNotification />}
                    </Box>
                }
            </Grid>
        </Grid>
    )
}

export default Heading