import React from 'react'
import styles from './BilledInfo.module.scss'
import { Grid, Typography } from '@mui/material'
import InvoiceSelect from '../InvoiceSelect/InvoiceSelect'
import BilledCard from '../BilledCard/BilledCard'
import SelectClientCard from '../SelectClientCard/SelectClientCard'

const BilledInfo = ({ IsBilledCard, handleClick }: any) => {
    return (
        <Grid className={styles.billedInfoContainer}>
            <Typography variant='h5' fontSize={20} fontWeight={500}>Billed By
                <span style={{ fontSize: 15, color: "#617183", paddingInline: 5 }}>(Your Details)</span>
            </Typography>
            <InvoiceSelect />
            {IsBilledCard ? <BilledCard /> : <SelectClientCard handleClick={handleClick}/>}
        </Grid>
    )
}

export default BilledInfo