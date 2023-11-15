import React from 'react'
import styles from './UserModal.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material'
import InputField from '../inputField/InputField';
import { RxCross2 } from "react-icons/rx";
import CommonButton from '../common/CommonButton/CommonButton';
import SelectField from '../SelectField/SelectField';

export interface IUserModal {
    open: boolean;
    handleChange: any;
    handleClose: any;
    handleCreate: any;
    inputData: any;
}
const UserModal = ({ open, inputData, handleChange, handleClose, handleCreate }: IUserModal) => {
    const role = [{ "id": 1, "label": "HR" }, { "id": 2, "label": "Manager" }, { "id": 3, "label": "Team Leader" }, { "id": 4, "label": "Employee" }]
    return (
        <Modal
            open={open}
            sx={{ width: 500, height: 'fit-content', margin: "auto" }}
        >
            <Grid className={styles.userModalContainer}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Create New User</Typography>
                    <RxCross2 fontSize={25} cursor={"pointer"} onClick={handleClose} />

                </Box>
                <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 4 }} />
                <Box>
                    <InputField
                        label={'Name'}
                        name={'username'}
                        placeholder={'Enter Your Name'}
                        value={inputData.username}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <InputField
                        label={'Email'}
                        name={'email'}
                        placeholder={'Enter Your Email'}
                        value={inputData.email}
                        handleChange={handleChange}
                        type={"email"}
                    />
                    <InputField
                        label={'Password'}
                        name={'password'}
                        placeholder={'Enter Your Password'}
                        value={inputData.password}
                        handleChange={handleChange}
                        type={"password"}
                    />
                    <SelectField
                        title={'User Role'}
                        data={role}
                        option={inputData.role}
                        name={'role'}
                        handleChange={handleChange}
                    />
                </Box>
                <Box sx={{ display: "flex" }}>
                    <CommonButton
                        name={"close"}
                        onClick={handleClose}
                    />
                    <CommonButton
                        name={"Create"}
                        onClick={handleCreate}
                    />
                </Box>
            </Grid>
        </Modal>
    )
}

export default UserModal