import React from 'react'
import styles from './CreateLeaveModal.module.scss'
import { Grid, Modal, Typography } from '@mui/material'

export interface ICreateLeaveModal {
    open: boolean;
}
const CreateLeaveModal = ({ open }: ICreateLeaveModal) => {
    return (
        <Modal
            open={open}
        >
            <Grid className={styles.createLeaveModalContainer}>
                <Typography>hello</Typography>
            </Grid>

        </Modal>
    )
}

export default CreateLeaveModal