import React, { useState } from 'react'
import styles from './PersonalDetail.module.scss'
import { Divider, Grid, Typography } from '@mui/material'
import InputField from '../../inputField/InputField'
import DateField from '../../DateField/DateField'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export interface IPersonalDetail {

}
const PersonalDetail = () => {
    const [inputData, setInputData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        password: '',
        address: ''
    })
    const handleChange = (e: any) => {
        // const { name, value } = e.target;
        // setInputData({ ...inputData, [name]: value })
        // console.log(inputData, "inputData")
    }
    console.log(inputData, "inputData")
    return (
        <Grid className={styles.createEmployeeCard}>
            <Typography variant='h5'>Personal Detail</Typography>
            <Divider sx={{ marginBlock: 2 }} />
            <Grid container>
                <Grid item sm={6}>
                    <InputField
                        label={'Name'}
                        name={'name'}
                        value={inputData.name}
                        placeholder={'Enter employee Name'}
                        handleChange={handleChange} type={undefined}                    />
                    <DateField />
                    <InputField
                        label={'Email'}
                        name={'email'}
                        value={inputData.email}
                        placeholder={'Enter employee Email'}
                        handleChange={handleChange} type={undefined}                    />
                </Grid>
                <Grid item sm={6}>
                    <InputField
                        label={'Phone'}
                        name={'phone'}
                        value={inputData.phone}
                        placeholder={'Enter employee Phone'}
                        handleChange={handleChange} type={undefined} />
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="gender"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                    <InputField
                        label={'Password'}
                        name={'password'}
                        value={inputData.password}
                        placeholder={'Enter employee Password'}
                        handleChange={handleChange} type={undefined} />
                </Grid>
            </Grid>
            <InputField
                label={'Address'}
                name={'address'}
                value={inputData.address}
                placeholder={'Enter employee address'}
                handleChange={handleChange} type={undefined} />
        </Grid>
    )
}

export default PersonalDetail;