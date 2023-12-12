import React from 'react'
import styles from './HeadingText.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import { BsFillPatchPlusFill } from "react-icons/bs";
import CommonButton from '../common/CommonButton/CommonButton';

export interface IHeadingText {
    heading: string;
    handleClick?: any;
    IsAction?: boolean;
}
const HeadingText = ({ heading, handleClick, IsAction }: IHeadingText) => {
    return (
        <Grid className={styles.headingTextContainer}>
            <Typography variant='h4' fontWeight={500} fontSize={25}>{heading}</Typography>
            {IsAction
                ?
                <CommonButton name={"Applie Leave"} onClick={handleClick} /> :
                ""}
        </Grid>
    )
}

export default HeadingText