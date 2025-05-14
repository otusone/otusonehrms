import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, Paper, Divider, CircularProgress } from '@mui/material';
import axios from 'axios';

const VerifyOTP = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const navigate = useNavigate();

  if (!email) {
    return (
      <Box sx={styles.container}>
        <Paper elevation={6} sx={styles.paper}>
          <Typography variant="h6" color="error" sx={{ mb: 3 }}>
            Email address is missing
          </Typography>
          <Button 
            variant="contained" 
            sx={styles.primaryButton}
            onClick={() => navigate('/forgotpassword')}
          >
            Go Back
          </Button>
        </Paper>
      </Box>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/otpverify', {
        email,
        otp
      });

      if (response.data.success) {
        navigate('/resetpassword', { state: { email } });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/generateOTP', {
        email
      });

      if (response.data.success) {
        setResendSuccess(true);
        setTimeout(() => setResendSuccess(false), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Box sx={styles.container}>
      <Paper elevation={6} sx={styles.paper}>
        <Typography variant="h5" sx={styles.title}>
          Verify Your Identity
        </Typography>
        
        {resendSuccess && (
          <Typography sx={styles.successMessage}>
            New OTP has been sent to your email
          </Typography>
        )}
        {error && <Typography sx={styles.errorMessage}>{error}</Typography>}

        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
          We sent a 6-digit code to <strong>{email}</strong>
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Verification Code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            margin="normal"
            required
            sx={styles.input}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={styles.primaryButton}
          >
            {loading ? <CircularProgress size={24} /> : 'Verify Code'}
          </Button>
        </form>

        <Divider sx={styles.divider} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Didn't receive code?
          </Typography>
          <Button
            onClick={handleResend}
            disabled={resendLoading}
            sx={{ textTransform: 'none' }}
          >
            {resendLoading ? 'Sending...' : 'Resend Code'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

// Reuse the same styles from ForgotPassword.js
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
    p: 3
  },
  paper: {
    width: '100%',
    maxWidth: '500px',
    p: 4,
    borderRadius: '12px',
    background: 'white'
  },
  title: {
    mb: 3,
    color: '#6a1b9a',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    mb: 3,
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px'
    }
  },
  primaryButton: {
    mt: 2,
    py: 1.5,
    borderRadius: '8px',
    backgroundColor: '#6a1b9a',
    '&:hover': {
      backgroundColor: '#4a148c',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    },
    transition: 'all 0.3s ease',
    '&.Mui-disabled': {
      backgroundColor: '#e0e0e0'
    }
  },
  successMessage: {
    color: 'success.main', 
    mb: 2,
    p: 1.5,
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
    borderRadius: '4px',
    textAlign: 'center'
  },
  errorMessage: {
    color: 'error.main', 
    mb: 2,
    p: 1.5,
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
    borderRadius: '4px',
    textAlign: 'center'
  },
  divider: {
    my: 3
  }
};

export default VerifyOTP;