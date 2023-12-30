import React from 'react'
import styles from './AnnouncementModal.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material'
import { RxCross2 } from "react-icons/rx";
import InputField from '../../inputField/InputField';
import CommonButton from '../../common/CommonButton/CommonButton';


export interface IAnnouncementModal {
    open: boolean;
    name:string;
    inputData: any;
    handleChange: any;
    handleClose: any;
    heading: any;
    handleClick: any;
}
const AnnouncementModal = ({ open, name, inputData, handleChange, handleClose, heading, handleClick }: IAnnouncementModal) => {
    return (
        <Modal
            open={open}
            sx={{ width: 600, height: 'fit-content', margin: "auto" }}
        >
            <Grid className={styles.announcementModal}>
                <Box>
                    <Typography variant='h4' fontSize={22} fontWeight={500}>{heading}</Typography>
                    <RxCross2 fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider />
                <Grid container className={styles.announcementDetails}>
                    <Grid>
                        <InputField
                            label={'Title'}
                            name={'title'}
                            placeholder={'Enter Title'}
                            value={inputData.title}
                            handleChange={handleChange}
                            type={"text"}
                        />
                        <InputField
                            label={'Description'}
                            name={'description'}
                            placeholder={'Enter Description'}
                            value={inputData.description}
                            handleChange={handleChange}
                            type={undefined}
                        />

                    </Grid>
                    <Grid>
                        <InputField
                            label={'Start Date'}
                            name={'start_date'}
                            placeholder={''}
                            value={inputData.start_date}
                            handleChange={handleChange}
                            type={"date"}
                        />
                        <InputField
                            label={'Start Time'}
                            name={'start_time'}
                            placeholder={''}
                            value={inputData.start_time}
                            handleChange={handleChange}
                            type={"time"}
                        />
                    </Grid>
                </Grid>
                <Box>
                    <CommonButton name={"Close"} onClick={handleClose} />
                    <CommonButton name={name} onClick={handleClick} />
                </Box>
            </Grid>
        </Modal>
    )
}

export default AnnouncementModal