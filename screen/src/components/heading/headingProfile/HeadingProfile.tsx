import React, { useState } from 'react'
import styles from './HeadingProfile.module.scss'
import { Grid, Typography, Box } from '@mui/material'
import img from '../../../asserst/images/profile_pic.jpg'
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineGlobal } from 'react-icons/ai';
import CommonList from '../../common/CommonList/CommonList';

export interface IHeadingProfile {
    IsImage?: boolean;
    isIcon?: boolean;
    color?: string;
    name: string;
    handleLogout?: any
}

const HeadingProfile = ({ IsImage, isIcon, color, name, handleLogout }: IHeadingProfile) => {
    const [show, setShow] = useState(false);
    const handleClick = () => {
        setShow(!show)
    }
    return (
        <Grid className={styles.headingProfileContainer}>
            {IsImage ? <img src={img} width={45} height={45} alt='img' /> : ""}
            {isIcon ? <AiOutlineGlobal fontSize={20} /> : ""}
            <Typography style={{ color: color }}>{name}!</Typography>
            <IoIosArrowDown onClick={handleClick} fontSize={15} />
            {show && <CommonList handleLogout={handleLogout} />}
        </Grid >
    )
}

export default HeadingProfile;
