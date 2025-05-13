import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, Paper, Divider } from '@mui/material';
import axios from 'axios';
import logo from '/assets/logo.png';

const ResetPassword = () => {
    const location = useLocation();
    const { email } = location.state || {};
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8000/api/v1/user/resendverification', {
                email,
                password
            });

            if (response.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                throw new Error(response.data.message || "Password reset failed");
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                p: 3
            }}>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <img src={logo} alt="Company Logo" style={{ height: '60px' }} />
                </Box>
                <Paper elevation={6} sx={{
                    width: '100%',
                    maxWidth: '500px',
                    p: 4,
                    borderRadius: '12px',
                    background: 'white',
                    textAlign: 'center'
                }}>
                    <Typography variant="h5" sx={{ mb: 3, color: '#6a1b9a', fontWeight: 'bold' }}>
                        Password Reset Successfully!
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        You can now login with your new password.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            py: 1.5,
                            px: 4,
                            borderRadius: '8px',
                            backgroundColor: '#6a1b9a',
                            '&:hover': {
                                backgroundColor: '#4a148c'
                            }
                        }}
                        onClick={() => navigate('/login')}
                    >
                        Go to Login
                    </Button>
                </Paper>
            </Box>
        );
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
            p: 3
        }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                {/* <img src={logo} alt="Company Logo" style={{ height: '60px' }} /> */}
                <Typography variant="h5" sx={{ color: '#6a1b9a', fontWeight: 'bold' }}>
                    Reset Your Password
                </Typography>
            </Box>

            <Paper elevation={6} sx={{
                width: '100%',
                maxWidth: '500px',
                p: 4,
                borderRadius: '12px',
                background: 'white'
            }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#6a1b9a', fontWeight: '600' }}>
                    Create New Password
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                    Your new password must be different from previous passwords
                </Typography>

                {error && (
                    <Typography sx={{ 
                        color: 'error.main', 
                        mb: 2,
                        p: 1,
                        backgroundColor: 'rgba(211, 47, 47, 0.1)',
                        borderRadius: '4px'
                    }}>
                        {error}
                    </Typography>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required
                        sx={{ mb: 2 }}
                        InputProps={{
                            style: { borderRadius: '8px' }
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Confirm New Password"
                        type="password"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        margin="normal"
                        required
                        sx={{ mb: 3 }}
                        InputProps={{
                            style: { borderRadius: '8px' }
                        }}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                            mt: 2,
                            py: 1.5,
                            borderRadius: '8px',
                            backgroundColor: '#6a1b9a',
                            '&:hover': {
                                backgroundColor: '#4a148c',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default ResetPassword;