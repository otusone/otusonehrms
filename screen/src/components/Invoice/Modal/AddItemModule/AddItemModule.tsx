import React from 'react'
import styles from './AddItemModule.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material'
import { RxCross2 } from "react-icons/rx";
import InputField from '../../../inputField/InputField';
import CommonButton from '../../../common/CommonButton/CommonButton';


export interface IAddItemModule {
    open: boolean;
    handleClose: any;
}
const AddItemModule = ({ open, handleClose }: IAddItemModule) => {
    return (
        <Modal
            open={open}
            sx={{ width: 650, height: "fit-content", margin: "auto" }}
        >
            <Grid className={styles.addItemModuleContainer}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Add New Item</Typography>
                    <RxCross2 fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 4 }} />
                <Grid className={styles.itemFields}>
                    <Grid>
                        <InputField
                            label={'Item'}
                            name={''}
                            placeholder={''}
                            value={''}
                            handleChange={undefined}
                            type={undefined}
                        />
                        <InputField
                            label={'Amount'}
                            name={''}
                            placeholder={''}
                            value={''}
                            handleChange={undefined}
                            type={undefined}
                        />
                    </Grid>
                    <Grid>
                        <InputField
                            label={'Quantity'}
                            name={''}
                            placeholder={''}
                            value={''}
                            handleChange={undefined}
                            type={undefined}
                        />
                        <InputField
                            label={'GST'}
                            name={''}
                            placeholder={''}
                            value={''}
                            handleChange={undefined}
                            type={undefined}
                        />
                    </Grid>
                </Grid>
                <Grid className={styles.action}>
                    <CommonButton name={"Close"} onClick={handleClose} />
                    <CommonButton name={"Create"} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default AddItemModule