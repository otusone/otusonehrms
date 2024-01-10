import React from 'react'
import styles from './CheckoutCard.module.scss'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { MdAdd } from "react-icons/md";

export interface ICheckoutCard {
    totalAm: any;
    gts: any;
    data: any;
}
const CheckoutCard = ({ totalAm, gts, data }: ICheckoutCard) => {

    return (
        <Grid className={styles.checkoutCardContainer}>
            <Typography variant='h5' fontSize={22} fontWeight={500}>Checkout Details</Typography>
            <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 3 }} />
            <Box>
                <Box display={"flex"} justifyContent={"space-between"} sx={{ marginBlock: 1 }}>
                    <Typography variant='h5' fontSize={18} fontWeight={500}>Amount </Typography>
                    <Typography variant='h5' fontSize={18} fontWeight={500}>{totalAm}/- </Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} sx={{ marginBlock: 1 }}>
                    <Typography variant='h5' fontSize={18} fontWeight={500}>GST</Typography>
                    <Typography variant='h5' fontSize={18} fontWeight={500}>{gts}%</Typography>
                </Box>
            </Box>
            <Divider />
            <Grid display={"flex"} justifyContent={"space-between"} sx={{ marginBlock: 2 }}>
                <Grid>
                    <Typography variant='h5' fontSize={20} fontWeight={600}>Total (INR)</Typography>
                </Grid>
                <Grid>
                    <Typography variant='h5' fontSize={20} fontWeight={600}>{data}/-</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CheckoutCard