import React from "react";
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
} from "@mui/material";
import Sidebar from "../sidebar/sidebar";
import Heading from "../headingProfile/heading";

const Leave = ({ leaveData, handleSearch, handleApprove, handleReject }) => {
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
                    {/* Title and Search */}
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                        flexWrap="wrap"
                    >
                        <Typography variant="h6" sx={{ mb: { xs: 1, sm: 0 } }}>
                            Manage Leave
                        </Typography>
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
                                    <TableCell sx={{ color: "#fff" }}>EMPLOYEE</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>LEAVE TYPE</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>START DATE</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>END DATE</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>LEAVE REASON</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>STATUS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {leaveData?.length > 0 ? (
                                    leaveData.map((leave) => (
                                        <TableRow key={leave._id}>
                                            <TableCell>{leave.employeeId}</TableCell>
                                            <TableCell>{leave.employeeName}</TableCell>
                                            <TableCell>{leave.leaveType}</TableCell>
                                            <TableCell>{leave.startDate}</TableCell>
                                            <TableCell>{leave.endDate}</TableCell>
                                            <TableCell>{leave.reason}</TableCell>
                                            <TableCell>{leave.status}</TableCell>
                                            <TableCell>
                                                {leave.status === "Pending" ? (
                                                    <Box display="flex" gap={1}>
                                                        <Button
                                                            variant="outlined"
                                                            color="success"
                                                            size="small"
                                                            onClick={() => handleApprove(leave._id)}
                                                        >
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            variant="outlined"
                                                            color="error"
                                                            size="small"
                                                            onClick={() => handleReject(leave._id)}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </Box>
                                                ) : (
                                                    "-"
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center">
                                            No leave records found.
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

export default Leave;
