import React from 'react'
import styles from './CheckoutCard.module.scss'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { MdAdd } from "react-icons/md";


const CheckoutCard = () => {
    const data = [
        {
            "id": 1,
            "icon": <MdAdd fontSize={16} />,
            "lable": 'Give Item wise Discount'
        },
        {
            "id": 2,
            "icon": <MdAdd fontSize={16} />,
            "lable": 'Give Discount on Total'
        },
        {
            "id": 3,
            "icon": <MdAdd fontSize={16} />,
            "lable": 'Add Additional Charges'
        }
    ]
    return (
        <Grid className={styles.checkoutCardContainer}>
            <Typography variant='h5' fontSize={22} fontWeight={500}>Checkout Details</Typography>
            <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 3 }} />
            <Box>
                <Box display={"flex"} justifyContent={"space-between"} sx={{ marginBlock: 1 }}>
                    <Typography variant='h5' fontSize={18} fontWeight={500}>Amount </Typography>
                    <Typography variant='h5' fontSize={18} fontWeight={500}>1200/- </Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} sx={{ marginBlock: 1 }}>
                    <Typography variant='h5' fontSize={18} fontWeight={500}>GST</Typography>
                    <Typography variant='h5' fontSize={18} fontWeight={500}>12%</Typography>
                </Box>
            </Box>
            <Divider />
            <Grid display={"flex"} justifyContent={"space-between"} sx={{ marginBlock: 2 }}>
                <Grid>
                    <Typography variant='h5' fontSize={20} fontWeight={600}>Total (INR)</Typography>
                </Grid>
                <Grid>
                    <Typography variant='h5' fontSize={20} fontWeight={600}>₹1</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CheckoutCard