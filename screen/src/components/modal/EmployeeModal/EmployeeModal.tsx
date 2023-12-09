import React from 'react'
import styles from './EmployeeModal.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material'
import InputField from '../../inputField/InputField';
import { RxCross2 } from "react-icons/rx";
import CommonButton from '../../common/CommonButton/CommonButton';


export interface IEmployeeModal {
    open: boolean;
    handleCloss: any;
    handleEdit: any;
    inputData: any;
    handleChange: any;
}
const EmployeeModal = ({ open, inputData, handleChange, handleCloss, handleEdit }: IEmployeeModal) => {
    return (
        <Modal
            open={open}
            sx={{ width: 600, height: "fit-content", margin: "auto", }}
        >
            <Grid className={styles.employeeEditModal}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={20} fontWeight={500}>Edit Employee Details</Typography>
                    <RxCross2 fontSize={22} cursor={"pointer"} onClick={handleCloss} />
                </Box>
                <Divider />
                <Grid container >
                    <Grid item sm={6}>
                        <InputField
                            label={'Emp ID'}
                            name={'emp_id'}
                            placeholder={''}
                            value={inputData.emp_id}
                            handleChange={handleChange}
                            type={undefined}
                        />
                        <InputField
                            label={'Name'}
                            name={'name'}
                            placeholder={''}
                            value={inputData.name}
                            handleChange={handleChange}
                            type={undefined}
                        />
                        <InputField
                            label={'Email'}
                            name={'email'}
                            placeholder={''}
                            value={inputData.email}
                            handleChange={handleChange}
                            type={undefined}
                        />
                        <InputField
                            label={'Branch'}
                            name={'branch'}
                            placeholder={''}
                            value={inputData.branch}
                            handleChange={handleChange}
                            type={undefined}
                        />

                    </Grid>
                    <Grid item sm={6}>
                        <InputField
                            label={'Department'}
                            name={'department'}
                            placeholder={''}
                            value={inputData.department}
                            handleChange={handleChange}
                            type={undefined}
                        />
                        <InputField
                            label={'Desination'}
                            name={'desination'}
                            placeholder={''}
                            value={inputData.designation}
                            handleChange={handleChange}
                            type={undefined}
                        />
                        <InputField
                            label={'Date Of Joining'}
                            name={'dateOfJoin'}
                            placeholder={''}
                            value={inputData.dateOfJoin}
                            handleChange={handleChange}
                            type={undefined}
                        />

                    </Grid>
                </Grid>
                <Grid className={styles.modalAction}>
                    <CommonButton name={"Closs"} onClick={handleCloss} />
                    <CommonButton name={"Edit"} onClick={handleEdit} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default EmployeeModal