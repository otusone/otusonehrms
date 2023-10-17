import React from 'react'
import styles from './EditAttandanceModal.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material';
import { RxCross1 } from 'react-icons/rx';
import InputField from '../inputField/InputField';
import CommonButton from '../common/CommonButton/CommonButton';

export interface IEditAttandanceModal {
    open: boolean;
    inputData: any;
    handleChange: any;
    clossModal: any;
}
const EditAttandanceModal = ({ open, inputData, handleChange, clossModal }: IEditAttandanceModal) => {
    return (
        <Modal
            open={open}
        >
            <Grid className={styles.editAttandanceModal}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h4' fontSize={22}>Edit Attendance</Typography>
                    <RxCross1 onClick={clossModal} fontSize={20} cursor={"pointer"} />
                </Box>
                <Divider sx={{ marginBlock: 2 }} />
                <Box display={"flex"} justifyContent={"space-between"} marginBlock={3}>
                    <InputField
                        label={'Employee'}
                        name={'employee'}
                        placeholder={'John Deo'}
                        value={inputData.employee}
                        handleChange={handleChange}
                        type={'text'}
                    />
                    <InputField
                        label={'Date'}
                        name={'date'}
                        placeholder={''}
                        value={inputData.data}
                        handleChange={handleChange}
                        type={"date"}
                    />
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} marginBlock={3}>
                    <InputField
                        label={'Clock In'}
                        name={'clock_in'}
                        placeholder={''}
                        value={inputData.clock_in}
                        handleChange={handleChange}
                        type={"time"}
                    />
                    <InputField
                        label={'Clock Out'}
                        name={'clock_out'}
                        placeholder={''}
                        value={inputData.clock_out}
                        handleChange={handleChange}
                        type={"time"}
                    />
                </Box>
                <Box width={"fit-content"} display={"flex"} marginInlineStart={"auto"} marginBlockStart={3}>
                    <CommonButton
                        name={'Cancel'}
                        onClick={clossModal} />
                    <CommonButton
                        name={'Edit'}
                        onClick={(() => console.log("edit"))} />
                </Box>
            </Grid>
        </Modal>
    )
}

export default EditAttandanceModal;