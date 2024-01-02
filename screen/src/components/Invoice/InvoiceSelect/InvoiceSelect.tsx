import React from 'react'
import styles from './InvoiceSelect.module.scss'
import { FormControl, Grid, Select, MenuItem, Typography } from '@mui/material'

const InvoiceSelect = () => {
    return (
        <Grid className={styles.invoiceSelect}>
            <FormControl>
                <Select>
                    <MenuItem>One</MenuItem>
                    <MenuItem>Two</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    )
}

export default InvoiceSelect