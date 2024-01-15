import React from 'react'
import styles from './BilledInfoCard.module.scss'
import { Grid, Typography } from '@mui/material'
import BilledCard from '../BilledCard/BilledCard'

export interface IBilledInfoCard {
    heading: string;
    businessName: string;
    address: string;
}
const BilledInfoCard = ({ heading, businessName, address }: IBilledInfoCard) => {
    return (
        <Grid className={styles.billedByContainer}>
            <Typography variant='h5' fontSize={20} fontWeight={500}>{heading}
                <span style={{ fontSize: 15, color: "#617183", paddingInline: 5 }}>(Your Details)</span>
            </Typography>
            <BilledCard
                heading={'Business details'}
                name={businessName}
                address={address}
            />
        </Grid>
    )
}

export default BilledInfoCard;