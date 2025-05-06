import React, { useState } from 'react';
import './Login.css'; 
import { Box, Grid, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const InputField = ({ label, name, placeholder, value, handleChange, type }) => (
  <Grid className="inputFieldContainer">
    <Typography>{label}</Typography>
    <TextField
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      fullWidth
    />
  </Grid>
);

// Common button component
const CommonButton = ({ name, onClick }) => (
  <Grid className="commonButtonContainer">
    <Button onClick={onClick} variant="outlined">
      {name}
    </Button>
  </Grid>
);

const Login = () => {
  const [inputData, setInputData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/login', {
        email: inputData.email,
        password: inputData.password,
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/dashboard');
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      setError(error.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid className="loginContainer">
      <Box>
        <img src="/assets/logo.png" alt="logo" />
      </Box>

      <Grid container justifyContent="space-between">
        <Box>
          <img src="/assets/hr.jpg" alt="hr" />
        </Box>

        <Box className="loginFormContainer">
          <Typography marginBottom={4} variant="h4" fontSize={29} fontWeight={600}>
            Welcome
            <span style={{ color: '#BC125E', paddingInlineStart: 10 }}>to login!</span>
          </Typography>

          <Box>
            <InputField
              label="Email"
              name="email"
              placeholder="example@gmail.com"
              value={inputData.email}
              handleChange={handleChange}
              type="email"
            />
            <InputField
              label="Password"
              name="password"
              placeholder="*****"
              value={inputData.password}
              handleChange={handleChange}
              type="password"
            />
          </Box>

          <Typography style={{ color: '#BC125E', cursor: 'pointer' }}>
            Forgot Your Password?
          </Typography>

          {error && (
            <Typography style={{ color: 'red', marginTop: 10 }}>{error}</Typography>
          )}

          <CommonButton name={loading ? 'Logging in...' : 'Login'} onClick={handleLogin} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;

