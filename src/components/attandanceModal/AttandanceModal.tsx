import React, { useState } from 'react'
import styles from './AttandanceModal.module.scss'
import { Grid, Modal, Box, Typography, Divider, SelectChangeEvent } from '@mui/material'
import SelectField from '../SelectField/SelectField';
import InputField from '../inputField/InputField';
import CommonButton from '../common/CommonButton/CommonButton';
import { RxCross1 } from 'react-icons/rx';

export interface IAttandanceModal {
    heading?: string;
    open: boolean;
    handleClose?: any;
    inputData?: any;
    handleChange?: any;
}

const data = [
    {
        "id": 1,
        "label": "harry"
    },
    {
        "id": 2,
        "label": "john"
    }
]
const AttandanceModal = ({ heading, inputData, handleChange, open, handleClose }: IAttandanceModal) => {
    // const [inputData, setInputData] = useState({
    //     employee: '',
    //     hours: '',
    //     remark: '',
    //     date: ''
    // })
    // const handleChange = (e: SelectChangeEvent) => {
    //     const { name, value } = e.target;
    //     setInputData({ ...inputData, [name]: value })
    // }
    const formData = {
        employee: inputData.employee,
        hours: inputData.hours,
        remark: inputData.remark,
        date: inputData.date
    }
    const createHandler = () => {
        localStorage.setItem("data", JSON.stringify(formData))
    }
    console.log(inputData, 'hello')
    return (
        <Grid>
            <Modal
                open={open}
            >
                <Grid className={styles.attandanceModal} >
                    <Box>
                        <Typography variant="h6">{heading}</Typography>
                        <RxCross1 onClick={handleClose} style={{ cursor: "pointer" }} fontSize={25} />
                    </Box>
                    <Divider sx={{ marginBlock: 2 }} />
                    <SelectField
                        title={'Empolyee'}
                        data={data}
                        option={inputData.employee}
                        name={'employee'}
                        handleChange={handleChange}
                    />
                    <Box sx={{ display: "flex", marginBlock: 2 }}>
                        <InputField
                            label={'Date'}
                            name={'date'}
                            placeholder={''}
                            value={inputData.date}
                            handleChange={handleChange}
                            type={'date'}
                        />
                        <InputField
                            label={'Hours'}
                            name={'hours'}
                            placeholder={'00:00:00'}
                            value={inputData.hours}
                            handleChange={handleChange}
                            type={'number'}
                        />
                    </Box>
                    <InputField
                        label={'Remark'}
                        name={'remark'}
                        placeholder={'Write remark some hare!'}
                        value={inputData.remark}
                        handleChange={handleChange}
                        type={undefined}
                    />
                    <Box sx={{ display: "flex", marginBlockStart: 2, width: "fit-content", marginInlineStart: "auto" }}>
                        <CommonButton
                            name={'Close'}
                            onClick={handleClose}
                        />
                        <CommonButton
                            name={'Create'}
                            onClick={createHandler}
                        />
                    </Box>
                </Grid>
            </Modal>
        </Grid>
    )
}

export default AttandanceModal;