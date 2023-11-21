import React from 'react'
import styles from './HeadingText.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import { BsFillPatchPlusFill } from "react-icons/bs";

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
                <Box>
                    <BsFillPatchPlusFill fontSize={35} cursor={"pointer"} onClick={handleClick} />
                </Box> :
                ""}
        </Grid>
    )
}

export default HeadingText