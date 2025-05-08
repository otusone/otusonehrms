import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Button,
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

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await axios.get(
                "http://localhost:8000/api/v1/admin/get-employees",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setEmployees(res.data.employees);
            setFilteredEmployees(res.data.employees);
        } catch (err) {
            console.error("Failed to fetch employees", err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleAdd = () => {
        // Add employee logic here (e.g., open modal)
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = employees.filter(emp =>
            emp.name.toLowerCase().includes(value) ||
            emp.email.toLowerCase().includes(value)
        );
        setFilteredEmployees(filtered);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/delete-employee/${id}`);
            fetchEmployees();
        } catch (err) {
            console.error("Failed to delete employee", err);
        }
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
                        <Typography variant="h6">Manage Employee</Typography>

                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleAdd}
                            sx={{ mt: { xs: 1, sm: 0 } }}
                        >
                            ADD EMPLOYEE
                        </Button>
                    </Box>

                    <Box display="flex" justifyContent="flex-end" mb={2}>
                        <TextField
                            placeholder="Search..."
                            size="small"
                            value={searchTerm}
                            onChange={handleSearch}
                            sx={{ width: "250px" }}
                        />
                    </Box>

                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: "#56005b" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff" }}>EMPLOYEE NAME</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>EMAIL</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>GENDER</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>RELIGION</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>MOBILE NO.</TableCell>
                                    {/* <TableCell sx={{ color: "#fff" }}>DATE OF JOINING</TableCell> */}
                                    <TableCell sx={{ color: "#fff" }}>ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredEmployees.length > 0 ? (
                                    filteredEmployees.map((emp) => (
                                        <TableRow key={emp._id}>
                                            <TableCell>{emp.userName}</TableCell>
                                            <TableCell>{emp.email}</TableCell>
                                            <TableCell>{emp.gender}</TableCell>
                                            <TableCell>{emp.religion}</TableCell>
                                            <TableCell>{emp.mobile}</TableCell>
                                            {/* <TableCell>{emp.dateOfJoining}</TableCell> */}
                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleDelete(emp._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            No employees found.
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

export default Employee;
