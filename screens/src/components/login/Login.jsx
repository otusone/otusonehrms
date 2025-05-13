import React, { useState } from 'react';
import { Box, Grid, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';


const Login = () => {
    const [inputData, setInputData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`http://localhost:8000/api/v1/user/login`, {
                email: inputData.email,
                password: inputData.password,
            });

            if (response.data.token) {
                localStorage.setItem("authToken", response.data.token);
                navigate("/dashboard");
            } else {
                throw new Error("No token received");
            }
        } catch (error) {
            setError(error.message || "Invalid Email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid className="loginContainer">
            <Box>
            <img src="/assets/logo.png" alt="hr" />
            </Box>
            <Grid container justifyContent={"space-between"}>
                <Box>
                <img src="/assets/hr.jpg" alt="hr" />
                </Box>
                <Box className="loginFormContainer" style={{backgroundColor:"white"}}>
                    <Typography marginBottom={4} variant='h4' fontSize={29} fontWeight={600}>
                        Welcome
                        <span style={{ color: "#BC125E", paddingInlineStart: 10 }}>
                            to login!
                        </span>
                    </Typography>
                    <Box>
                        <div className="inputFieldContainer">
                            <Typography>Email</Typography>
                            <TextField
                                type="email"
                                name="email"
                                value={inputData.email}
                                placeholder="example@gmail.com"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputFieldContainer">
                            <Typography>Password</Typography>
                            <TextField
                                type="password"
                                name="password"
                                value={inputData.password}
                                placeholder="*****"
                                onChange={handleChange}
                            />
                        </div>
                    </Box>
                    <Typography style={{ color: "#BC125E", cursor: "pointer" }}>
                      <a href="/forgotpassword">Forgot Your Password?</a>   New User <a href="/signup">SignUp</a>
                    </Typography>
                    <div className="commonButtonContainer">
                        <Button onClick={handleLogin} variant='outlined'>
                            Login
                        </Button>
                    </div>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
