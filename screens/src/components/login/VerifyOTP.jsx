import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, Paper, Divider } from '@mui/material';
import axios from 'axios';
import logo from '/assets/logo.png';

const VerifyOTP = () => {
    const location = useLocation();
    const { email } = location.state || {};
    const [otp, setOtp] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8000/api/v1/user/verify-otp', {
                email,
                otp
            });

            if (response.data.success) {
                navigate('/reset-password', { state: { email } });
            } else {
                throw new Error(response.data.message || "OTP verification failed");
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
                    Verify Your Identity
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
                    Enter Verification Code
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                    We sent a 6-digit code to {email || 'your email'}
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
                        label="Verification Code"
                        variant="outlined"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
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
                        {loading ? 'Verifying...' : 'Verify Code'}
                    </Button>
                </form>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Didn't receive code? 
                        <Button 
                            color="secondary" 
                            sx={{ ml: 1, textTransform: 'none' }}
                            onClick={() => navigate('/forgotpassword')}
                        >
                            Resend Code
                        </Button>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default VerifyOTP;