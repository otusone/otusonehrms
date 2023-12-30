import React from 'react'
import styles from './InvoiceInfo.module.scss'
import { Grid, TextField, Typography } from '@mui/material'
const ariaLabel = { 'aria-label': 'description' };


const InvoiceInfo = () => {
    return (
        <Grid className={styles.invoiceInfo}>
            <Grid >
                <Typography sx={{ marginBlock: "auto" }}>Invoice No*</Typography>
                <TextField placeholder='00001' className={styles.inbox} />
            </Grid>
            <Grid>
                <Typography sx={{ marginBlock: "auto" }}>Invoice Date *</Typography>
                <TextField type='date' />
            </Grid>
        </Grid>
    )
}

export default InvoiceInfo