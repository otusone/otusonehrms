import React from 'react'
import styles from './SelectClientCard.module.scss'
import { Grid, Box, Typography } from '@mui/material'
import CommonButton from '../../common/CommonButton/CommonButton'

const SelectClientCard = ({ handleClick }: any) => {
    return (
        <Grid className={styles.selectClientCardContainer}>
            <Typography textAlign={"center"}>Select a Client/Business from list</Typography>
            <Typography textAlign={"center"} marginBlock={2}>OR</Typography>
            <Box display={"flex"} justifyContent={"center"}>
                <CommonButton name={"Add New Client"} onClick={handleClick} />
            </Box>
        </Grid>
    )
}

export default SelectClientCard