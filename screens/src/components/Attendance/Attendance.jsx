import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import Sidebar from "../sidebar/sidebar";
import Heading from "../headingProfile/heading";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("http://localhost:8000/api/v1/admin/get-attendance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Safely handle the case where data might be undefined
      const attendanceArray = res.data?.attendance || [];

      setAttendance(attendanceArray);
    } catch (err) {
      console.error("Failed to fetch attendance", err);
      setAttendance([]); // fallback in case of error
    }
  };


  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredAttendance = attendance.filter(
    (a) =>
      (a.userName || "").toLowerCase().includes(searchTerm) ||
      (a.userId || "").toLowerCase().includes(searchTerm)
  );

  return (
    <Box display="flex" minHeight="100vh">
      <Box sx={{ width: { xs: "100%", md: "18%" }, borderRight: "1px solid #eee", bgcolor: "#fff" }}>
        <Sidebar />
      </Box>

      <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
        <Heading />
        <Box px={4} py={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Attendance Records</Typography>
            <TextField placeholder="Search..." size="small" value={searchTerm} onChange={handleSearch} sx={{ width: "250px" }} />
          </Box>

          <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: "#56005b" }}>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }}>S. NO.</TableCell>
                  <TableCell sx={{ color: "#fff" }}>EMPLOYEE ID</TableCell>
                  <TableCell sx={{ color: "#fff" }}>NAME</TableCell>
                  <TableCell sx={{ color: "#fff" }}>CLOCK IN</TableCell>
                  <TableCell sx={{ color: "#fff" }}>CLOCK OUT</TableCell>
                  <TableCell sx={{ color: "#fff" }}>WORKING HOURS</TableCell>
                  <TableCell sx={{ color: "#fff" }}>DATE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAttendance.length > 0 ? (
                  filteredAttendance.map((a, index) => (
                    <TableRow key={a._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{a.userId}</TableCell>
                      <TableCell>{a.userName || "N/A"}</TableCell>
                      <TableCell>{a.clockIn ? new Date(a.clockIn).toLocaleString() : "N/A"}</TableCell>
                      <TableCell>{a.clockOut ? new Date(a.clockOut).toLocaleString() : "N/A"}</TableCell>
                      <TableCell>{a.workingHours || 0}</TableCell>
                      <TableCell>{a.date}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">No attendance records found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Attendance;
