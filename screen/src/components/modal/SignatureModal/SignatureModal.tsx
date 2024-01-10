import React from 'react'
import styles from './SignatureModal.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material'
import { RxCross2 } from "react-icons/rx";
import { FiUploadCloud } from "react-icons/fi";
import CommonButton from '../../common/CommonButton/CommonButton';



export interface ISignatureModal {
    open: boolean;
    handleClose: any;
}
const SignatureModal = ({ open, handleClose }: ISignatureModal) => {
    return (
        <Modal
            open={open}
            sx={{ width: 500, height: 'fit-content', margin: 'auto' }}
        >
            <Grid className={styles.signatureModal}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Hello</Typography>
                    <RxCross2 fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 4 }} />
                <Grid className={styles.signature}>
                    <FiUploadCloud fontSize={40} />
                    <Typography>Upload</Typography>
                </Grid>
                <Grid className={styles.action}>
                    <CommonButton name={"Close"} onClick={handleClose} />
                    <CommonButton name={"Create"} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default SignatureModal