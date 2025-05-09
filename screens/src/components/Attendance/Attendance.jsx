import React, { useEffect, useState } from "react";
import axios from "axios";
import {Box,Typography,TextField,Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from "@mui/material";
import Sidebar from "../sidebar/sidebar";
import Heading from "../headingProfile/heading";

const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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

    return (
        <Box display="flex" minHeight="100vh">
            <Box
                sx={{
                    width: { xs: "100%", md: "18%" },
                    borderRight: { md: "1px solid #eee" },
                    bgcolor: "#fff",
                }}
            >
                <Sidebar />
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
                            Attendance
                        </Typography>
                        <TextField
                            placeholder="Search..."
                            size="small"
                            onChange={handleSearch}
                            sx={{ width: "250px" }}
                        />
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
                                            <TableCell>-</TableCell>
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
                                            No Attendance records found.
                                        </TableCell>
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

