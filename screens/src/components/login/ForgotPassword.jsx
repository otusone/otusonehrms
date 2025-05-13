import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '/assets/logo.png'; // Update with your logo path

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8000/api/v1/user/resendverification', {
                email: email
            });

            if (response.data.success) {
                setMessage("OTP has been sent to your email. Please check your inbox.");
                setTimeout(() => {
                    navigate('/verifyotp', { state: { email } });
                }, 2000);
            } else {
                throw new Error(response.data.message || "Failed to send OTP");
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

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
                <Typography variant="h5" sx={{ mt: 1, color: '#6a1b9a', fontWeight: 'bold' }}>
                    Password Recovery
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
                    Enter Your Email
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                    We'll send a verification code to your email
                </Typography>

                {message && (
                    <Typography sx={{ 
                        color: 'success.main', 
                        mb: 2,
                        p: 1,
                        backgroundColor: 'rgba(46, 125, 50, 0.1)',
                        borderRadius: '4px'
                    }}>
                        {message}
                    </Typography>
                )}

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
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        {loading ? 'Sending OTP...' : 'Send Verification Code'}
                    </Button>
                </form>

                <Divider sx={{ my: 3 }} />

                <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                        py: 1.5,
                        borderRadius: '8px',
                        color: '#6a1b9a',
                        borderColor: '#6a1b9a',
                        '&:hover': {
                            borderColor: '#4a148c',
                            backgroundColor: 'rgba(106, 27, 154, 0.08)'
                        }
                    }}
                    onClick={() => navigate('/')}
                >
                    Back to Login
                </Button>
            </Paper>
        </Box>
    );
};

export default ForgotPassword;