import React from 'react'
import styles from './CreateLeaveModal.module.scss'
import { Grid, Modal, Typography, Divider, Box } from '@mui/material'
import SelectField from '../SelectField/SelectField';
import InputField from '../inputField/InputField';
import data from '../../pages/ManageLeave/data.json'
import CommonButton from '../common/CommonButton/CommonButton';
import { RxCross1 } from 'react-icons/rx';

export interface ICreateLeaveModal {
    open: boolean;
    clossModal: () => void;
}
const CreateLeaveModal = ({ open, clossModal }: ICreateLeaveModal) => {
    return (
        <Modal
            open={open}
        >
            <Grid className={styles.createLeaveModalContainer}>
                <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                    <Typography variant='h4' fontSize={20}>Create New Leave</Typography>
                    <RxCross1 onClick={clossModal} cursor={"pointer"} fontSize={22} />
                </Box>
                <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                <Box sx={{ display: "flex" }}>
                    <SelectField
                        title={'Employee'}
                        data={data.employee}
                        option={undefined}
                        name={'employee'}
                        handleChange={undefined}
                    />
                    <SelectField
                        title={'Leave Type*'}
                        data={data.leaveType}
                        option={undefined}
                        name={'leaveType'}
                        handleChange={undefined}
                    />
                </Box>
                <Box sx={{ display: "flex" }}>
                    <InputField
                        label={'Start Date'}
                        name={'startDate'}
                        placeholder={''}
                        value={''}
                        handleChange={undefined}
                        type={'date'}
                    />
                    <InputField
                        label={'End Date'}
                        name={'endDate'}
                        placeholder={''}
                        value={''}
                        handleChange={undefined}
                        type={'date'}
                    />
                </Box>
                <InputField
                    label={'Leave Reason'}
                    name={'leaveReason'}
                    placeholder={'Leave Reason'}
                    value={''}
                    handleChange={undefined}
                    type={undefined}
                />
                <InputField
                    label={'Remark'}
                    name={'remak'}
                    placeholder={'Leave Remark'}
                    value={''}
                    handleChange={undefined}
                    type={undefined}
                />
                <Box display={"flex"}>
                    <CommonButton
                        name={'Closs'}
                        onClick={clossModal} />
                    <CommonButton
                        name={'Create'}
                        onClick={(() => console.log('hello2'))} />
                </Box>
            </Grid>

        </Modal>
    )
}

export default CreateLeaveModal