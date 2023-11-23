import React, { useState } from 'react'
import styles from './PersonalDetail.module.scss'
import { Box, Divider, Grid, Typography } from '@mui/material'
import InputField from '../../inputField/InputField'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export interface IPersonalDetail {
    personalDetail: any;
    handleChange: any;

}
const PersonalDetail = ({ personalDetail, handleChange }: IPersonalDetail) => {

    return (
        <Grid className={styles.createEmployeeCard}>
            <Typography variant='h5'>Personal Detail</Typography>
            <Divider sx={{ marginBlock: 2 }} />
            <Grid container className={styles.employeeCard}>
                <Box display={"flex"}>
                    <InputField
                        label={'Name'}
                        name={'name'}
                        value={personalDetail.name}
                        placeholder={'Enter employee Name'}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <InputField
                        label={'Phone'}
                        name={'phone'}
                        value={personalDetail.phone}
                        placeholder={'Enter employee Phone'}
                        handleChange={handleChange}
                        type={"phone"}
                    />
                </Box>
                <Box display={"flex"}>
                    <InputField
                        label={'Date of Birth'}
                        name={'date'}
                        value={personalDetail.date}
                        placeholder={'Enter employee Email'}
                        handleChange={handleChange}
                        type={"date"}
                    />
                    <FormControl >
                        <Typography>Gender</Typography>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="gender"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box display={"flex"}>
                    <InputField
                        label={'Email'}
                        name={'email'}
                        value={personalDetail.email}
                        placeholder={'Enter employee Email'}
                        handleChange={handleChange}
                        type={"email"}
                    />
                    <InputField
                        label={'Password'}
                        name={'password'}
                        value={personalDetail.password}
                        placeholder={'Enter employee Password'}
                        handleChange={handleChange}
                        type={"password"}
                    />
                </Box>
            </Grid>
            <InputField
                label={'Address'}
                name={'address'}
                value={personalDetail.address}
                placeholder={'Enter employee address'}
                handleChange={handleChange}
                type={"text"}
            />
        </Grid>
    )
}

export default PersonalDetail;