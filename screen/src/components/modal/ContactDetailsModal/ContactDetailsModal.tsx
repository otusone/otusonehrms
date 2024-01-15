import React from 'react'
import styles from './ContactDetailsModal.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material'
import { RxCross2 } from "react-icons/rx";
import InputField from '../../inputField/InputField';
import CommonButton from '../../common/CommonButton/CommonButton';


export interface IContactDetailsModal {
    open: boolean;
    constactInfo: any;
    handleClose: any;
    handleChange: any;
    handleClick: any;
}
const ContactDetailsModal = ({ open, constactInfo, handleClose, handleChange, handleClick }: IContactDetailsModal) => {
    return (
        <Modal
            open={open}
            sx={{ width: 500, height: 'fit-content', margin: "auto" }}
        >
            <Grid className={styles.contactDetailsModal}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Your Contact Details</Typography>
                    <RxCross2 fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 4 }} />
                <Grid className={styles.contactDetails}>
                    <InputField
                        label={'Name'}
                        name={'name'}
                        placeholder={"Enter your name"}
                        value={constactInfo.name}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'Phone'}
                        name={'phone'}
                        placeholder={'Enter your phone'}
                        value={constactInfo.phone}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <InputField
                        label={'Email'}
                        name={'email'}
                        placeholder={'Enter your email'}
                        value={constactInfo.email}
                        handleChange={handleChange}
                        type={undefined}
                    />
                </Grid>
                <Grid className={styles.action}>
                    <CommonButton name={"Close"} onClick={handleClose} />
                    <CommonButton name={"Add"} onClick={handleClick} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default ContactDetailsModal