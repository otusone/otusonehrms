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
            {data.map((item) => {
                return (
                    <Grid display={"flex"} className={styles.CheckoutCard}>
                        <Box>{item.icon}</Box>
                        <Typography fontSize={15} sx={{ paddingInline: 1, color: "#161C26" }}>{item.lable}</Typography>
                    </Grid>
                )
            })}
            <Divider />
            <Grid display={"flex"} justifyContent={"space-between"} sx={{ marginBlock: 2 }}>
                <Grid>
                    <Typography variant='h5' fontSize={20} fontWeight={500}>Total (INR)</Typography>
                </Grid>
                <Grid>
                    <Typography variant='h5' fontSize={20} fontWeight={500}>₹1</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CheckoutCard