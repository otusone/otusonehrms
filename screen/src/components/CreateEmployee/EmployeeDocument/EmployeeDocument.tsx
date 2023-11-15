import React from 'react'
import styles from './EmployeeDocument.module.scss'
import { Box, Divider, Grid, Typography } from '@mui/material';
import InputField from '../../inputField/InputField';

export interface IEmployeeDocument {
    empDocument: any;
    handleChange: any
}
const EmployeeDocument = ({ empDocument, handleChange }: IEmployeeDocument) => {
    return (
        <Grid className={styles.employeeDocument}>
            <Typography variant='h5' fontSize={20}>Employee Document</Typography>
            <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 4 }} />
            <Box>
                <InputField
                    label={'Certificate'}
                    name={'certificate'}
                    placeholder={''}
                    value={empDocument.certificate}
                    handleChange={handleChange}
                    type={"file"}
                />
                <InputField
                    label={'Resume'}
                    name={'resume'}
                    placeholder={''}
                    value={empDocument.resume}
                    handleChange={handleChange}
                    type={"file"}
                />
                <InputField
                    label={'Photo'}
                    name={'photo'}
                    placeholder={''}
                    value={empDocument.photo}
                    handleChange={handleChange}
                    type={"file"}
                />
            </Box>
        </Grid>
    )
}

export default EmployeeDocument;