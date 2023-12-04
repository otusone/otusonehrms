import React from 'react'
import styles from './CreateLeaveModal.module.scss'
import { Modal, Grid, Typography, Divider, Box } from '@mui/material'
import SelectField from '../../SelectField/SelectField';
import InputField from '../../inputField/InputField';
import CommonButton from '../../common/CommonButton/CommonButton';
import { RxCross1 } from "react-icons/rx";
import data from './data.json';



export interface ICreateLeaveModal {
    open: boolean;
    handleClose: any;
    inputData: any;
    handleChange: any;
}
const CreateLeaveModal = ({ open, handleClose, inputData, handleChange }: ICreateLeaveModal) => {
    return (
        <Modal
            open={open}
            sx={{ width: 600, height: "fit-content", margin: "auto" }}
        >
            <Grid className={styles.createLeaveModalContainer}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h4' fontSize={20} fontWeight={500}> Create New Leave </Typography>
                    <RxCross1 fontSize={20} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider />
                <Grid>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography variant='h5' fontWeight={600} fontSize={18}>NAME: <span style={{ fontSize: 18, fontWeight: 500 }}>ANUJ KUMAR</span></Typography>
                        <Typography fontWeight={600} fontSize={18}>ID: <span style={{ fontSize: 18, fontWeight: 500 }}>EMP00001</span></Typography>
                    </Box>
                    <Box display={"flex"}>
                        <InputField
                            label={'Start Date'}
                            name={''}
                            placeholder={''}
                            value={''}
                            handleChange={undefined}
                            type={"date"}
                        />
                        <InputField
                            label={'End Date'}
                            name={''}
                            placeholder={''}
                            value={''}
                            handleChange={undefined}
                            type={"date"}
                        />

                    </Box>
                    <Box>
                        <SelectField
                            title={'Leave Type'}
                            data={data.leaveType}
                            option={inputData.leave_type}
                            name={'leave_type'}
                            handleChange={handleChange}
                        />
                    </Box>
                    <Box>
                        <InputField
                            label={'Leave Reason'}
                            name={''}
                            placeholder={''}
                            value={''}
                            handleChange={undefined}
                            type={"text"}
                        />
                        <InputField
                            label={'Remak'}
                            name={''}
                            placeholder={''}
                            value={''}
                            handleChange={undefined}
                            type={"text"}
                        />
                    </Box>
                    <Box display={"flex"}>
                        <CommonButton
                            name={"Close"}
                            onClick={handleClose}
                        />
                        <CommonButton
                            name={"Create"}
                        />
                    </Box>
                </Grid>
            </Grid>

        </Modal>
    )
}

export default CreateLeaveModal