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
    modalAction?: any;
    buttonOne?: string;
    buttonTwo?: string;
}

const data = [
    {
        "id": 1,
        "label": "test"
    },
    {
        "id": 2,
        "label": "john"
    },
    {
        "id": 3,
        "label": "harry"
    },
    {
        "id": 4,
        "label": "Text"
    },
    {
        "id": 5,
        "label": "Delete"
    },
    {
        "id": 6,
        "label": "Result"
    }
]
const AttandanceModal = ({ heading, inputData, handleChange, modalAction, open, handleClose, buttonOne, buttonTwo }: IAttandanceModal) => {
    const employee = inputData?.employee || ''
    const date = inputData?.date || ''
    const hours = inputData?.hours || ''
    const remark = inputData?.remark || ''

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
                        option={employee}
                        name={'employee'}
                        handleChange={handleChange}
                    />
                    <Box sx={{ display: "flex", marginBlock: 2 }}>
                        <InputField
                            label={'Date'}
                            name={'date'}
                            placeholder={''}
                            value={date}
                            handleChange={handleChange}
                            type={'date'}
                        />
                        <InputField
                            label={'Hours'}
                            name={'hours'}
                            placeholder={'00:00:00'}
                            value={hours}
                            handleChange={handleChange}
                            type={'number'}
                        />
                    </Box>
                    <InputField
                        label={'Remark'}
                        name={'remark'}
                        placeholder={'Write remark some hare!'}
                        value={remark}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <Box sx={{ display: "flex", marginBlockStart: 2, width: "fit-content", marginInlineStart: "auto" }}>
                        <CommonButton
                            name={buttonOne}
                            onClick={handleClose}
                        />
                        <CommonButton
                            name={buttonTwo}
                            onClick={modalAction}
                        />
                    </Box>
                </Grid>
            </Modal>
        </Grid>
    )
}

export default AttandanceModal;