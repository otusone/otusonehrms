import React, { useEffect, useState } from "react";
import axios from "axios";
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
  Modal,
  Divider,
  Snackbar,
  Alert
} from "@mui/material";
import UserSidebar from "../UserSidebar/userSidebar";
import Heading from "../headingProfile/heading";

const UserAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    clockInTime: "",
    clockInLocation: ""
  });

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(
        "http://localhost:8000/api/v1/user/attendance-list?date=2025-05-02",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setAttendanceData(response.data.attendance);
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredAttendance = () => {
    return attendanceData?.filter(
      (attendance) =>
        attendance.userName?.toLowerCase().includes(searchTerm) ||
        attendance.userId?.toLowerCase().includes(searchTerm)
    );
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // Reset form data when closing
    setFormData({
      date: new Date().toISOString().split('T')[0],
      clockInTime: "",
      clockInLocation: ""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found");
        return;
      }

      // Here you would typically send the data to your backend
      // const response = await axios.post(
      //   "http://localhost:8000/api/v1/user/mark-attendance",
      //   formData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      // For demo purposes, we'll just show a success message
      setNotification({
        open: true,
        message: "Attendance marked successfully!",
        severity: "success"
      });
      
      // Close the modal
      handleCloseModal();
      
      // Refresh attendance data
      fetchAttendanceData();
    } catch (error) {
      console.error("Error marking attendance:", error);
      setNotification({
        open: true,
        message: "Failed to mark attendance. Please try again.",
        severity: "error"
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Box
        sx={{
          width: { xs: "100%", md: "18%" },
          borderRight: { md: "1px solid #eee" },
          bgcolor: "#fff",
        }}
      >
        <UserSidebar />
      </Box>

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
              User Attendance
            </Typography>
            <Box display="flex" gap={2}>
              <Button 
                variant="contained" 
                onClick={handleOpenModal}
                sx={{ 
                  bgcolor: "#56005b",
                  "&:hover": { bgcolor: "#7a007f" }
                }}
              >
                Mark Attendance
              </Button>
              <TextField
                placeholder="Search..."
                size="small"
                onChange={handleSearch}
                sx={{ width: "250px" }}
              />
            </Box>
          </Box>

          <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: "#56005b" }}>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }}>EMPLOYEE ID</TableCell>
                  <TableCell sx={{ color: "#fff" }}>EMPLOYEE</TableCell>
                  <TableCell sx={{ color: "#fff" }}>CLOCK IN</TableCell>
                  <TableCell sx={{ color: "#fff" }}>CLOCK IN LOCATION</TableCell>
                  <TableCell sx={{ color: "#fff" }}>WORKING HOURS</TableCell>
                  <TableCell sx={{ color: "#fff" }}>DATE</TableCell>
                  <TableCell sx={{ color: "#fff" }}>CLOCK OUT</TableCell>
                  <TableCell sx={{ color: "#fff" }}>CLOCK OUT LOCATION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAttendance()?.length > 0 ? (
                  filteredAttendance().map((attendance) => (
                    <TableRow key={attendance._id}>
                      <TableCell>{attendance.userId}</TableCell>
                      <TableCell>{attendance.userName}</TableCell>
                      <TableCell>{attendance.clockIn}</TableCell>
                      <TableCell>{attendance.clockInLocation}</TableCell>
                      <TableCell>{attendance.workingHours}</TableCell>
                      <TableCell>{attendance.date}</TableCell>
                      <TableCell>{attendance.clockOut}</TableCell>
                      <TableCell>{attendance.clockOutLocation}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No User Attendance records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Mark Attendance Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Box
          sx={{
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Mark Your Attendance
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            
            <TextField
              fullWidth
              label="Clock In Time"
              type="time"
              name="clockInTime"
              value={formData.clockInTime}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300 
              }}
            />
            
            <TextField
              fullWidth
              label="Clock In Location"
              name="clockInLocation"
              value={formData.clockInLocation}
              onChange={handleChange}
              margin="normal"
            />
            
            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Button 
                variant="outlined" 
                onClick={handleCloseModal}
                sx={{ color: "#56005b", borderColor: "#56005b" }}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                onClick={handleSubmit}
                sx={{ bgcolor: "#56005b", "&:hover": { bgcolor: "#7a007f" } }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserAttendance;