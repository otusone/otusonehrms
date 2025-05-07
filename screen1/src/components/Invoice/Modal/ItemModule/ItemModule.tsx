import React from 'react'
import styles from './ItemModule.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material'
import { RxCross2 } from "react-icons/rx";
import InputField from '../../../inputField/InputField';
import CommonButton from '../../../common/CommonButton/CommonButton';


export interface IAddItemModule {
    open: boolean;
    heading: string;
    handleClose: any;
    inputData: any;
    handleChange: any;
    handleClick: any;
}
const AddItemModule = ({ open, heading, handleClose, inputData, handleChange, handleClick }: IAddItemModule) => {
    return (
        <Modal
            open={open}
            sx={{ width: 650, height: "fit-content", margin: "auto" }}
        >
            <Grid className={styles.addItemModuleContainer}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>{heading}</Typography>
                    <RxCross2 fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 4 }} />
                <Grid className={styles.itemFields}>
                    <Grid>
                        <InputField
                            label={'Item'}
                            name={'item'}
                            placeholder={''}
                            value={inputData.item}
                            handleChange={handleChange}
                            type={undefined}
                        />
                        <InputField
                            label={'Amount'}
                            name={'amount'}
                            placeholder={''}
                            value={inputData.amount}
                            handleChange={handleChange}
                            type={undefined}
                        />
                    </Grid>
                    <Grid>
                        <InputField
                            label={'Quantity'}
                            name={'quantity'}
                            placeholder={''}
                            value={inputData.quantity}
                            handleChange={handleChange}
                            type={undefined}
                        />
                        <InputField
                            label={'GST'}
                            name={'gst'}
                            placeholder={''}
                            value={inputData.gst}
                            handleChange={handleChange}
                            type={undefined}
                        />
                    </Grid>
                </Grid>
                <Grid className={styles.action}>
                    <CommonButton name={"Close"} onClick={handleClose} />
                    <CommonButton name={"Create"} onClick={handleClick} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default AddItemModule