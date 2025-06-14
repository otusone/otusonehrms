import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from '../../utils/baseurl';
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

const Leave = () => {
    const [leaveData, setLeaveData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchLeaveData();
    }, []);

    const fetchLeaveData = async () => {
        try {
            const token = localStorage.getItem("authToken");

            if (!token) {
                console.error("No token found");
                return;
            }

            const response = await axiosInstance.get(
                "/admin/getAllLeaves",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setLeaveData(response.data.leaves);
            }
        } catch (error) {
            console.error("Error fetching leave data:", error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleApprove = async (id) => {
        const confirmed = window.confirm("Are you sure you want to approve this leave?");
        if (!confirmed) return;
        try {
            const token = localStorage.getItem("authToken");
            const response = await axiosInstance.patch(
                `/admin/leave/status/${id}`,
                { status: "Approved" },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            fetchLeaveData();

            // if (response.data.success) {
            //     fetchLeaveData();
            // }
        } catch (error) {
            console.error("Error approving leave:", error);
        }
    };

    const handleReject = async (id) => {
        const confirmed = window.confirm("Are you sure you want to reject this leave?");
        if (!confirmed) return;
        try {
            const token = localStorage.getItem("authToken");
            const response = await axiosInstance.patch(
                `/admin/leave/status/${id}`,
                { status: "Rejected" },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            fetchLeaveData();

            // if (response.data.success) {
            //     fetchLeaveData();
            // }
        } catch (error) {
            console.error("Error rejecting leave:", error);
        }
    };


    const filteredLeaves = () => {
        return leaveData?.filter(
            (leave) =>
                leave.userName?.toLowerCase().includes(searchTerm) ||
                leave.userId?.toLowerCase().includes(searchTerm)
        );
    };

    return (
        <Box display="flex" minHeight="100vh">
            <Box
                sx={{
                    width: { xs: "0%", md: "18%" },
                    borderRight: "1px solid #eee",
                    bgcolor: "#fff",
                }}
            >
                <Sidebar />
            </Box>

            <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
                <Heading />

                <Box px={4} py={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} flexWrap="wrap">
                        <Typography variant="h6">Manage Leave</Typography>
                    </Box>

                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        mb={2}
                        alignItems={{ xs: "flex-start", lg: "flex-end" }}
                    >
                        <TextField
                            placeholder="Search by Name..."
                            size="small"
                            value={searchTerm}
                            onChange={handleSearch}
                            sx={{ width: "250px" }}
                        />
                    </Box>


                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: "#58024b" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff" }}>S.No</TableCell>
                                    {/* <TableCell sx={{ color: "#fff" }}>EMPLOYEE ID</TableCell> */}
                                    <TableCell sx={{ color: "#fff" }}>EMPLOYEE NAME</TableCell>
                                    {/* <TableCell sx={{ color: "#fff" }}>LEAVE TYPE</TableCell> */}
                                    <TableCell sx={{ color: "#fff" }}>START DATE</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>END DATE</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>LEAVE REASON</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>STATUS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredLeaves()?.length > 0 ? (
                                    filteredLeaves().map((leave, index) => (
                                        <TableRow key={leave._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            {/* <TableCell>{leave.userId}</TableCell> */}
                                            <TableCell>{leave.userName}</TableCell>
                                            {/* <TableCell>-</TableCell> */}
                                            <TableCell>
                                                {new Date(leave.startDate).toLocaleDateString('en-GB')}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(leave.endDate).toLocaleDateString('en-GB')}
                                            </TableCell>
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

