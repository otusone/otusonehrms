import React from 'react'
import styles from './AddClientCard.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import BilledCard from '../BilledCard/BilledCard'
import CommonButton from '../../common/CommonButton/CommonButton';

export interface IBilledInfoCard {
    heading: string;
    handleClick: any;
}
const AddClientCard = ({ heading, handleClick }: IBilledInfoCard) => {
    return (
        <Grid className={styles.billedByContainer}>
            <Typography variant='h5' fontSize={20} fontWeight={500}>{heading}
                <span style={{ fontSize: 15, color: "#617183", paddingInline: 5 }}>(Your Details)</span>
            </Typography>
            <Grid className={styles.addClientButton}>
                <Typography variant='h5' fontSize={18} fontWeight={500}>Business details</Typography>
                <CommonButton name={"Add New Client"} onClick={handleClick} />

            </Grid>
        </Grid>
    )
}

export default AddClientCard;