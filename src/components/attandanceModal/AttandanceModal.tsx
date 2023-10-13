import React from 'react'
import styles from './AttandanceModal.module.scss'
import { Grid, Modal, Box, Typography, Divider } from '@mui/material'
import SelectField from '../SelectField/SelectField';
import DateField from '../DateField/DateField';
import InputField from '../inputField/InputField';
import CommonButton from '../common/CommonButton/CommonButton';

export interface IAttandanceModal {
    open: boolean;
    handleClose?: () => void;

}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
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
const AttandanceModal = ({ open, handleClose }: IAttandanceModal) => {
    return (
        <Grid className={styles.attandanceModalContainer}>
            <Modal
                open={open}
            >
                <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create New Timesheet
                    </Typography>
                    <Divider sx={{ marginBlock: 2 }} />
                    <SelectField
                        title={''}
                        data={data}
                        option={"data"}
                        name={''}
                        handleChange={undefined}
                    />
                    <Box sx={{ display: "flex" }}>
                        <DateField />
                        <InputField
                            label={'Hours'}
                            name={''}
                            placeholder={''}
                            value={''}
                            handleChange={undefined}
                        />
                    </Box>
                    <InputField
                        label={'Remark'}
                        name={''}
                        placeholder={''}
                        value={''}
                        handleChange={undefined}
                    />
                    <Box sx={{ display: "flex" }}>
                        <CommonButton
                            name={'Close'}
                            onClick={function (): void {
                                throw new Error('Function not implemented.');
                            }}
                        />
                        <CommonButton
                            name={'Create'}
                            onClick={function (): void {
                                throw new Error('Function not implemented.');
                            }}
                        />
                    </Box>
                </Box>
            </Modal>

        </Grid>
    )
}

export default AttandanceModal;