import React from 'react'
import styles from './UserCard.module.scss'
import { Grid, Box, Typography } from '@mui/material'
import { PiDotsThreeOutlineVerticalDuotone } from 'react-icons/pi';
import CommonButton from '../CommonButton/CommonButton';
import img from '../../../asserst/images/profile_pic.jpg'
import { RxAvatar } from "react-icons/rx";
import { PiUserCircleLight } from "react-icons/pi";

export interface IUserCard {
    label: string;
    image?: string;
    name: string;
    email: string;
    IsButton: boolean;
    IsLabel: boolean;
    handleClick?: any
}
const UserCard = ({ label, image, name, email, IsButton, IsLabel, handleClick }: IUserCard) => {
    return (
        <Grid className={styles.userCardContainer}>
            {IsLabel ? <Box sx={{ display: "flex", justifyContent: "space-between", marginInlineEnd: "auto" }}>
                <Typography variant='h5'>{label}</Typography>
                <PiDotsThreeOutlineVerticalDuotone fontSize={20} onClick={handleClick} cursor={"pointer"} />
            </Box> : <PiDotsThreeOutlineVerticalDuotone fontSize={20} />}
            <Box>
                <Box>
                    {/* <img src={img} alt='img' /> */}
                    <RxAvatar fontSize={90} />
                </Box>
                <Typography variant='h4' align='center'>{name}</Typography>
                <Typography align='center'>{email}</Typography>
                {IsButton ? <CommonButton
                    name={"#EMP00001"} onClick={function (): void {
                        throw new Error('Function not implemented.');
                    }} /> : ""}
            </Box>
        </Grid>
    )
}

export default UserCard;