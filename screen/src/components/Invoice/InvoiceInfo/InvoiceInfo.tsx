import React from 'react'
import styles from './InvoiceInfo.module.scss'
import { Grid, TextField, Typography } from '@mui/material'
const ariaLabel = { 'aria-label': 'description' };

export interface IInvoiceInfo {
    data: any;
    handleChange: any;
}
const InvoiceInfo = ({ data, handleChange }: IInvoiceInfo) => {
    return (
        <Grid className={styles.invoiceInfo}>
            <Grid >
                <Typography sx={{ marginBlock: "auto" }}>Invoice No*</Typography>
                <TextField placeholder='00001' name='invoiceNo' value={data.invoiceNo} onChange={handleChange} className={styles.inbox} />
            </Grid>
            <Grid>
                <Typography sx={{ marginBlock: "auto" }}>Invoice Date *</Typography>
                <TextField type='date' name='date' value={data.date} onChange={handleChange} />
            </Grid>
        </Grid>
    )
}

export default InvoiceInfo