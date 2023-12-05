import React, { useEffect, useState } from 'react'
import styles from './LeaveModal.module.scss'
import { Modal, Grid, Typography, Divider, Box } from '@mui/material'
import SelectField from '../../SelectField/SelectField';
import InputField from '../../inputField/InputField';
import CommonButton from '../../common/CommonButton/CommonButton';
import { RxCross1 } from "react-icons/rx";
import data from './data.json';



export interface ILeaveModal {
    open: boolean;
    heading: string;
    handleClose: any;
    inputData: any;
    handleChange: any;
    handleClick: any;
}
const LeaveModal = ({ open, heading, handleClose, inputData, handleChange, handleClick }: ILeaveModal) => {
    const [name, setName] = useState()
    const [empId, setEmpId] = useState()
    useEffect(() => {
        const dataString: any = localStorage.getItem("loginedUser")
        const data = JSON.parse(dataString)
        const { name, emp_id } = data;
        setName(name)
        setEmpId(emp_id)
    }, [])
    return (
        <Modal
            open={open}
            sx={{ width: 600, height: "fit-content", margin: "auto" }}
        >
            <Grid className={styles.createLeaveModalContainer}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h4' fontSize={20} fontWeight={500}>{heading} </Typography>
                    <RxCross1 fontSize={20} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider />
                <Grid>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography variant='h5' fontWeight={600} fontSize={18}>NAME: <span style={{ fontSize: 18, fontWeight: 500 }}>{name}</span></Typography>
                        <Typography fontWeight={600} fontSize={18}>ID: <span style={{ fontSize: 18, fontWeight: 500 }}>{empId}</span></Typography>
                    </Box>
                    <Box display={"flex"}>
                        <InputField
                            label={'Start Date'}
                            name={'start_date'}
                            placeholder={''}
                            value={inputData.start_date}
                            handleChange={handleChange}
                            type={"date"}
                        />
                        <InputField
                            label={'End Date'}
                            name={'end_date'}
                            placeholder={''}
                            value={inputData.end_date}
                            handleChange={handleChange}
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
                            name={'leave_reason'}
                            placeholder={''}
                            value={inputData.leave_reason}
                            handleChange={handleChange}
                            type={"text"}
                        />
                        <InputField
                            label={'Remak'}
                            name={'remark'}
                            placeholder={'Remark'}
                            value={inputData.remark}
                            handleChange={handleChange}
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
                            onClick={handleClick}
                        />
                    </Box>
                </Grid>
            </Grid>

        </Modal>
    )
}

export default LeaveModal