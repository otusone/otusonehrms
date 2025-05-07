import React from 'react'
import styles from './TaxModal.module.scss'
import { Box, Divider, FormControl, FormControlLabel, FormLabel, Grid, Modal, Radio, RadioGroup, Typography } from '@mui/material'
import { RxCross2 } from "react-icons/rx";
import SelectField from '../../../SelectField/SelectField';
import CommonButton from '../../../common/CommonButton/CommonButton';


export interface ITaxModal {
    open: boolean;
    handleClose: any;
}

const TaxModal = ({ open, handleClose }: ITaxModal) => {
    const data = [
        {
            "id": 1,
            "label": "NONE"
        },
        {
            "id": 2,
            "label": "GST (india)"
        },
        {
            "id": 3,
            "label": "VAT"
        },
        {
            "id": 5,
            "label": "PPN"
        }
    ]
    return (
        <Modal
            open={open}
            sx={{ width: 500, height: "fit-content", margin: 'auto' }}
        >
            <Grid className={styles.taxModalContainer}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Configure Tax</Typography>
                    <RxCross2 fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 4 }} />
                <SelectField
                    title={'Select Tax Type*'}
                    data={data}
                    option={undefined}
                    name={''}
                    handleChange={undefined}
                />
                <FormControl>
                    <Typography>GST Type*</Typography>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="IGST" control={<Radio />} label="IGST" />
                        <FormControlLabel value="CGST" control={<Radio />} label="CGST & SGST" />
                    </RadioGroup>
                </FormControl>
                <Grid className={styles.action}>
                    <CommonButton name={"Close"} onClick={handleClose} />
                    <CommonButton name={"Create"} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default TaxModal