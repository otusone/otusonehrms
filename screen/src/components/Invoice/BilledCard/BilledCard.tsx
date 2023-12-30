import React from 'react'
import styles from './BilledCard.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import { MdEdit } from "react-icons/md";


const BilledCard = () => {
    return (
        <Grid className={styles.billedCardContainer}>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant='h6' fontSize={18} fontWeight={500}>Business details</Typography>
                <Typography sx={{color:"#58024B"}}><MdEdit fontSize={25} style={{ color: "#58024B" }} />Edit</Typography>
            </Box>
            <Box>
                <Typography sx={{ color: "#51618A", fontSize: 15, paddingBlock: 1 }}>
                    Business Name  <span style={{ color: "#000000", paddingInlineStart: 12, }}>Anuj Kumar</span>
                </Typography>
                <Typography sx={{ color: "#51618A", fontSize: 15, }}>
                    Address  <span style={{ color: "#000000", paddingInlineStart: 12 }}>India</span>
                </Typography>
            </Box>
        </Grid>
    )
}

export default BilledCard