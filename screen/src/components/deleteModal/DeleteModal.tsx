import React, { useState } from 'react'
import styles from './DeleteModal.module.scss'
import { Box, Grid, Modal, Typography } from '@mui/material';
import { BsExclamationLg } from 'react-icons/bs';

import CommonButton from '../common/CommonButton/CommonButton';

export interface IDeleteModal {
    heading: string;
    subHeading: string;
    open: boolean;
    clossModal: any;
    noHandler: any;
    yesHandler: any;
}
const DeleteModal = ({ heading, subHeading, open, clossModal, noHandler, yesHandler }: IDeleteModal) => {
    const [closs, setClose] = useState(false)
    return (
        <Grid>
            <Modal
                open={open}
            >
                <Grid className={styles.deleteModal}>
                    <Box sx={{ border: "4px solid #FFC16A", width: 85, height: 85, margin: 'auto', borderRadius: 40 }}>
                        <BsExclamationLg style={{ color: '#FFC16A', width: 78, height: 78, margin: "auto" }} fontSize={60} />
                    </Box>
                    <Typography variant="h4" fontWeight={600} fontSize={32} align='center' sx={{ paddingBlockStart: 3, color: "#545454" }}>{heading}</Typography>
                    <Typography align='center' fontSize={18} sx={{ paddingInline: 6, paddingBlock: 2, color: "#545454" }}>{subHeading}</Typography>
                    <Box sx={{ margin: "auto", border: "1px solid yellow", width: "fit-content", display: "flex" }}>
                        <CommonButton
                            name={'No'}
                            onClick={noHandler}
                        />
                        <CommonButton
                            name={'Yes'}
                            onClick={yesHandler}
                        />
                    </Box>
                </Grid>
            </Modal>
        </Grid>
    )
}

export default DeleteModal;