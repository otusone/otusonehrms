import React from 'react'
import styles from './Emergencycontact.module.scss';
import { Box, Divider, Grid, Typography } from '@mui/material'
import InputField from '../../inputField/InputField'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';



export interface IPersonalDetail {
    emergencydetail: any;
    handleChange: any;

}

function Emergencycontatc({ emergencydetail, handleChange }: IPersonalDetail) {
  return (
    <Grid className={styles.createEmployeeCard} >
            <Typography variant='h5'>Emergency Contact</Typography>
            <Divider sx={{ marginBlock: 2 }} />
            <Grid container className={styles.employeeCard} >
                <Box display={"flex"}>
                    <InputField
                        label={'Name'}
                        name={'name'}
                        value={emergencydetail.name}
                        placeholder={'Enter employee Name'}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <InputField
                        label={'Phone'}
                        name={'phone'}
                        value={emergencydetail.phone}
                        placeholder={'Enter employee Phone'}
                        handleChange={handleChange}
                        type={"phone"}
                    />
                </Box>
                <Box display={"flex"}>
                    <InputField
                        label={'Email'}
                        name={'email'}
                        value={emergencydetail.email}
                        placeholder={'Enter employee Email'}
                        handleChange={handleChange}
                        type={"text"}
                    />
                </Box>
                <Box display={"flex"}>
                    <InputField
                        label={'Relation'}
                        name={'relation'}
                        value={emergencydetail.relation}
                        placeholder={'Enter employee Email'}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <InputField
                        label={'Address'}
                        name={'address'}
                        value={emergencydetail.address}
                        placeholder={'Enter employee Password'}
                        handleChange={handleChange}
                        type={"password"}
                    />
                </Box>
            </Grid>
        </Grid>
  )
}

export default Emergencycontatc
