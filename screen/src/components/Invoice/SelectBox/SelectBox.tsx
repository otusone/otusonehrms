import React from 'react'
import styles from './SelectBox.module.scss'
import { Box, Grid, Typography } from '@mui/material'

export interface ISelectBox {
    icon: any;
    name: string;
    handleClick: any;
}
const SelectBox = ({ icon, name, handleClick }: ISelectBox) => {
    return (
        <Grid className={styles.selectBox} onClick={handleClick}>
            <Box>
                {icon}
            </Box>
            <Typography sx={{ paddingInline: 1 }}>{name}</Typography>
        </Grid>
    )
}

export default SelectBox