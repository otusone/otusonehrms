import React from 'react'
import styles from './BilledCard.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import { MdEdit } from "react-icons/md";

export interface IBilledCard {
    heading: string;
    name: string;
    address: string;
}
const BilledCard = ({ heading, name, address }: IBilledCard) => {
    return (
        <Grid className={styles.billedCardContainer}>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant='h6' fontSize={18} fontWeight={500}>{heading}</Typography>
            </Box>
            <Box>
                <Typography sx={{ color: "#51618A", fontSize: 15, paddingBlock: 1 }}>
                    Business Name  <span style={{ color: "#000000", paddingInlineStart: 12, }}>{name}</span>
                </Typography>
                <Typography sx={{ color: "#51618A", fontSize: 15, }}>
                    Address  <span style={{ color: "#000000", paddingInlineStart: 12 }}>{address}</span>
                </Typography>
            </Box>
        </Grid>
    )
}

export default BilledCard