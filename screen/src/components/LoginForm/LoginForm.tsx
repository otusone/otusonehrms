import React, { useState } from 'react'
import styles from './LoginForm.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import InputField from '../inputField/InputField'
import CommonButton from '../common/CommonButton/CommonButton'

export interface ILoginForm {
    inputData: any,
    handleChange: any;
    handleClick: any;

}
const LoginForm = ({ inputData, handleChange, handleClick }: ILoginForm) => {

    return (
        <Grid className={styles.loginFormContainer}>
            <Typography marginBlockEnd={4} variant='h4' fontSize={29} fontWeight={600}>Welcome
                <span style={{ color: "#BC125E", paddingInlineStart: 10 }}>
                    to login!
                </span>
            </Typography>
            <Box>
                <InputField
                    label={'Email'}
                    name={'email'}
                    placeholder={'example@gmail.com'}
                    value={inputData.email}
                    handleChange={handleChange}
                    type={"email"}
                />
                <InputField
                    label={'Password'}
                    name={'password'}
                    placeholder={'*****'}
                    value={inputData.password}
                    handleChange={handleChange}
                    type={"password"}
                />
            </Box>
            <Typography style={{ color: "#BC125E", cursor: "pointer" }}>Forgot Your Password?</Typography>
            <CommonButton
                name={"Login"}
                onClick={handleClick}
            />

        </Grid>
    )
}

export default LoginForm