import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper, Divider, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:8000/api/v1/user/otpgeneration', {
        email: email
      });

      if (response.data.success) {
        setMessage("OTP has been sent to your email. Redirecting...");
        setTimeout(() => {
          navigate('/verifyotp', { state: { email } });
        }, 1500);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={styles.container}>
      <Paper elevation={6} sx={styles.paper}>
        <Typography variant="h5" sx={styles.title}>
          Password Recovery
        </Typography>
        
        {message && <Typography sx={styles.successMessage}>{message}</Typography>}
        {error && <Typography sx={styles.errorMessage}>{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? <CircularProgress size={24} /> : 'Send Verification Code'}
          </Button>
        </form>

        <Divider sx={styles.divider} />

        <Button
          fullWidth
          variant="outlined"
          sx={styles.secondaryButton}
          onClick={() => navigate('/login')}
        >
          Back to Login
        </Button>
      </Paper>
    </Box>
  );
};

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
  secondaryButton: {
    py: 1.5,
    borderRadius: '8px',
    color: '#6a1b9a',
    borderColor: '#6a1b9a',
    '&:hover': {
      borderColor: '#4a148c',
      backgroundColor: 'rgba(106, 27, 154, 0.08)'
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

export default ForgotPassword;