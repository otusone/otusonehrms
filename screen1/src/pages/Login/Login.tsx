import React, { useState } from 'react'
import styles from './Login.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import logo from '../../asserst/images/logo.png'
import LoginForm from '../../components/LoginForm/LoginForm'
import hr from '../../asserst/images/hr.jpg'


export interface ILogin {
    inputData: any;
    handleChange: any;
    handleLogin: any;

}
const Login = ({ inputData, handleChange, handleLogin }: ILogin) => {

    return (
        <Grid className={styles.loginContainer}>
            <Box>
                <img src={logo} alt='img' />
            </Box>
            <Grid container justifyContent={"space-between"}>
                <Box>
                    <img src={hr} alt='hr' />
                </Box>
                <Box>
                    <LoginForm
                        inputData={inputData}
                        handleChange={handleChange}
                        handleClick={handleLogin}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login