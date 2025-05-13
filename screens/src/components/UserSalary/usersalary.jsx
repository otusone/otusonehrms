import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box, Typography, TextField, TableContainer, Table,
    TableHead, TableRow, TableCell, TableBody, Paper
} from "@mui/material";
import Sidebar from "../userSidebar/sidebar";
import Heading from "../headingProfile/heading";

const UserSalary = () => {
    const [salarySlips, setSalarySlips] = useState([]);
    const [filteredSlips, setFilteredSlips] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUserSalarySlips = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const userId = localStorage.getItem("userId");

            if (!userId) {
                console.error("User ID not found in localStorage");
                return;
            }

            const res = await axios.get(`http://localhost:8000/api/v1/user/get-salary-slip/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSalarySlips(res.data.data);
            setFilteredSlips(res.data.data);
        } catch (err) {
            console.error("Failed to fetch salary slips", err.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchUserSalarySlips();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = salarySlips.filter(slip =>
            slip.month?.toLowerCase().includes(value)
        );
        setFilteredSlips(filtered);
    };

    return (
        <Box display="flex" minHeight="100vh">
            <Box sx={{ width: { xs: "100%", md: "18%" }, borderRight: { md: "1px solid #eee" }, bgcolor: "#fff" }}>
                <Sidebar />
            </Box>
            <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
                <Heading />
                <Box px={4} py={2}>
                    <Typography variant="h6" mb={2}>My Salary Details</Typography>
                    <Box display="flex" justifyContent="flex-end" mb={2}>
                        <TextField
                            placeholder="Search by month..."
                            size="small"
                            value={searchTerm}
                            onChange={handleSearch}
                            sx={{ width: "300px" }}
                        />
                    </Box>
                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: "#56005b" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff" }}>S. NO.</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>MONTH</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>BASIC SALARY</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>HRA</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>ALLOWANCES</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>DEDUCTIONS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>NET SALARY</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredSlips.length > 0 ? (
                                    filteredSlips.map((slip, index) => (
                                        <TableRow key={slip._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{slip.month}</TableCell>
                                            <TableCell>{slip.basicSalary}</TableCell>
                                            <TableCell>{slip.hra}</TableCell>
                                            <TableCell>{slip.allowances}</TableCell>
                                            <TableCell>{slip.deductions}</TableCell>
                                            <TableCell>{slip.netSalary}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">No salary slips found.</TableCell>
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

export default UserSalary;
