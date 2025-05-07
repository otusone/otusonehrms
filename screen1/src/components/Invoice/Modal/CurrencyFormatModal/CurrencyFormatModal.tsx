import React from 'react'
import styles from './CurrencyFormatModal.module.scss'
import { Grid, Modal, Typography } from '@mui/material'

export interface ICurrencyFormatModal {
    open: boolean;
}
const CurrencyFormatModal = ({ open }: ICurrencyFormatModal) => {
    return (
        <Modal
            open={open}
            sx={{ width: 500, height: 'fit-content', margin: "auto" }}
        >
            <Grid className={styles.currencyFormatModal}>
                <Typography>Hello</Typography>
            </Grid>
        </Modal>
    )
}

export default CurrencyFormatModal