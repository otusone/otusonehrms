import React from 'react'
import styles from './EditAttandanceModal.module.scss'
import { Grid, Modal, Typography } from '@mui/material';

export interface IEditAttandanceModal {
    open: boolean;
}
const EditAttandanceModal = ({ open }: IEditAttandanceModal) => {
    return (
        <Modal
            open={open}
        >
            <Grid className={styles.editAttandanceModal}>
                <Typography>hello</Typography>
            </Grid>
        </Modal>
    )
}

export default EditAttandanceModal;