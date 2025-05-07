import React from "react";
import {
    Box,
    Grid,
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

const Employee = ({ employees, handleAdd, handleSearch, handleDelete }) => {
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

            {/* Main content */}
            <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
                <Heading />

                <Box px={4} py={2}>
                    {/* Title and Add Button */}
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

                    {/* Search Input */}
                    <Box display="flex" justifyContent="flex-end" mb={2}>
                        <TextField
                            placeholder="Search..."
                            size="small"
                            onChange={handleSearch}
                            sx={{ width: "250px" }}
                        />
                    </Box>

                    {/* Table */}
                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: "#56005b" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff" }}>EMPLOYEE ID</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>NAME</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>EMAIL</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>BRANCH</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>DEPARTMENT</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>DESIGNATION</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>DATE OF JOINING</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees?.length > 0 ? (
                                    employees.map((emp) => (
                                        <TableRow key={emp._id}>
                                            <TableCell>{emp.employeeId}</TableCell>
                                            <TableCell>{emp.name}</TableCell>
                                            <TableCell>{emp.email}</TableCell>
                                            <TableCell>{emp.branch}</TableCell>
                                            <TableCell>{emp.department}</TableCell>
                                            <TableCell>{emp.designation}</TableCell>
                                            <TableCell>{emp.dateOfJoining}</TableCell>
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
                                        <TableCell colSpan={8} align="center">
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
