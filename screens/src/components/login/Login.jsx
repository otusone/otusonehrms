import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/authSlice'; // Make sure this path is correct
import axios from 'axios';
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';
import './Login.css';

const Login = () => {
  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

      if (response.status === 200 && response.data.token && response.data.data) {
        const { token, data } = response.data;

        localStorage.setItem('authToken', token);
        localStorage.setItem('authUser', JSON.stringify(data));

        // Store user in Redux
        dispatch(setUser(data));

        // Navigate based on role
        if (data.role === 'admin') {
          navigate('/dashboard');
        } else if (data.role === 'user') {
          navigate('/user-dashboard');
        } else {
          setError('Unauthorized role.');
        }
      } else {
        throw new Error('Invalid login response.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
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
        <Box className="loginFormContainer" style={{ backgroundColor: 'white' }}>
          <Typography marginBottom={4} variant="h4" fontSize={29} fontWeight={600}>
            Welcome
            <span style={{ color: '#BC125E', paddingInlineStart: 10 }}>
              to login!
            </span>
          </Typography>
          <form onSubmit={handleLogin}>
            <div className="inputFieldContainer">
              <Typography>Email</Typography>
              <TextField
                type="email"
                name="email"
                value={inputData.email}
                placeholder="example@gmail.com"
                onChange={handleChange}
                required
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
                required
              />
            </div>

            {error && (
              <Typography color="error" style={{ marginTop: '10px' }}>
                {error}
              </Typography>
            )}

            <Typography style={{ color: '#BC125E', cursor: 'pointer', marginTop: 8 }}>
              Forgot Your Password?
            </Typography>

            <div className="commonButtonContainer" style={{ marginTop: 16 }}>
              <Button type="submit" variant="outlined" disabled={loading}>
                {loading ? <CircularProgress size={20} /> : 'Login'}
              </Button>
            </div>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
