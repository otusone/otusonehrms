import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import Sidebar from "../sidebar/sidebar";
import Heading from "../headingProfile/heading";
import axios from "axios";

const Attendance = ({ attendData, handleSearch }) => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: "", 
    severity: "info" 
  });

  // Handle closing snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Format date and time for display
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "N/A";
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };

  // Format location for display
  const formatLocation = (location) => {
    if (!location) return "N/A";
    return `Lat: ${location.latitude}, Long: ${location.longitude}`;
  };

  // Handle Clock-In API call
  const handleClockIn = async () => {
    setLoading(true);
    try {
      // Get current timestamp and date
      const now = new Date();
      const clockInTime = now.toISOString();
      const date = now.toISOString().split('T')[0];

      // Add authorization header if needed
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // If using JWT
        }
      };

      const response = await axios.post(
        "http://localhost:8000/api/v1/user/clockinattendance",
        {
          clockIn: clockInTime,
          date: date,
          clockInLocation: {
            latitude: 28.6139,
            longitude: 77.2090,
          },
        },
        config
      );

      if (response.data.success) {
        setSnackbar({
          open: true,
          message: "Clock-In Successful",
          severity: "success"
        });
        // You might want to refresh the attendance data here
      } else {
        setSnackbar({
          open: true,
          message: response.data.message || "Clock-In Failed",
          severity: "error"
        });
      }
    } catch (error) {
      console.error("Error during Clock-In:", error);
      let errorMessage = "Clock-In Failed";
      
      if (error.response) {
        // The request was made and the server responded with a status code
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response from server";
      }

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" minHeight="100vh">
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "100%", md: "18%" },
          borderRight: { md: "1px solid #eee" },
          bgcolor: "#fff",
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
        <Heading />

        <Box px={4} py={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            flexWrap="wrap"
          >
            <Typography variant="h6" sx={{ mb: { xs: 1, sm: 0 } }}>
              Attendance
            </Typography>

            <Box display="flex" gap={2}>
              <TextField
                placeholder="Search..."
                size="small"
                onChange={handleSearch}
                sx={{ width: "250px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleClockIn}
                sx={{ height: "40px" }}
                disabled={loading}
              >
                {loading ? "Clocking In..." : "Clock In"}
              </Button>
            </Box>
          </Box>

          {/* Table */}
          <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: "#56005b" }}>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }}>EMPLOYEE ID</TableCell>
                  <TableCell sx={{ color: "#fff" }}>CLOCK IN TIME</TableCell>
                  <TableCell sx={{ color: "#fff" }}>DATE</TableCell>
                  <TableCell sx={{ color: "#fff" }}>CLOCK IN LOCATION</TableCell>
                  <TableCell sx={{ color: "#fff" }}>WORKING HOURS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendData?.length > 0 ? (
                  attendData.map((attend) => (
                    <TableRow key={attend._id}>
                      <TableCell>{attend.userId}</TableCell>
                      <TableCell>{formatDateTime(attend.clockIn)}</TableCell>
                      <TableCell>{attend.date}</TableCell>
                      <TableCell>{formatLocation(attend.clockInLocation)}</TableCell>
                      <TableCell>{attend.workingHours} hours</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No Attendance records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Attendance;