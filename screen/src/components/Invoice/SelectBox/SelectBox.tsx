import React from 'react'
import styles from './SelectBox.module.scss'
import { Grid, Typography } from '@mui/material'
import { CgMathPercent } from "react-icons/cg";


const SelectBox = ({name}:any) => {
    return (
        <Grid className={styles.selectBox}>
            <CgMathPercent fontSize={25} style={{ color: "#58024B" }} />
            <Typography sx={{ paddingInline: 1 }}>{name}</Typography>
        </Grid>
    )
}

export default SelectBox