import React from 'react'
import styles from './TermsConditionModal.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material'
import { RxCross2 } from "react-icons/rx";
import InputField from '../../inputField/InputField';
import CommonButton from '../../common/CommonButton/CommonButton';


export interface ITermsConditionModal {
    open: boolean;
    heading: string;
    handleClose: any;
    tremValue: any;
    handleChange: any;
}
const TermsConditionModal = ({ open, heading, handleClose, tremValue, handleChange }: ITermsConditionModal) => {
    return (
        <Modal
            open={open}
            sx={{ width: 650, height: "fit-content", margin: "auto" }}
        >
            <Grid className={styles.termsConditionModal}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>{heading}</Typography>
                    <RxCross2 fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid className={styles.termDetails}>
                    <InputField
                        label={''}
                        name={'term'}
                        placeholder={'Write terms and conditions hare.'}
                        value={tremValue.term}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <CommonButton name={"Add New Term"} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default TermsConditionModal