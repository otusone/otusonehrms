import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/baseurl";
import {
    Box,
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import Sidebar from "../userSidebar/sidebar";
import Heading from "../userHeading/heading";

const Holiday = () => {
    const [holidays, setHolidays] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchHolidays();
    }, []);

    const fetchHolidays = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await axiosInstance.get("/user/get-holidays", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setHolidays(res.data.holidays || []);
        } catch (err) {
            console.error("Error fetching holidays:", err);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredHolidays = holidays.filter((holiday) =>
        holiday.title.toLowerCase().includes(searchTerm)
    );

    const isPastHoliday = (endDate) => {
        return new Date(endDate) < new Date();
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
                        <Typography variant="h6">Holidays</Typography>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        mb={2}
                        alignItems={{ xs: "flex-start", lg: "flex-end" }}
                    >

                        <TextField
                            placeholder="Search by holiday title..."
                            size="small"
                            value={searchTerm}
                            onChange={handleSearch}
                            sx={{ mb: 2, width: "250px" }}
                        />
                    </Box>


                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: "#58024b" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff" }}>S.No</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>Holiday Title</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>Start Date</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>End Date</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredHolidays.length ? (
                                    filteredHolidays.map((holiday, index) => {
                                        const isPast = isPastHoliday(holiday.endDate);
                                        return (
                                            <TableRow
                                                key={holiday._id}
                                            >
                                                <TableCell sx={{ color: isPast ? "gray" : "inherit" }}>{index + 1}</TableCell>
                                                <TableCell sx={{ color: isPast ? "gray" : "inherit" }}>{holiday.title}</TableCell>
                                                <TableCell sx={{ color: isPast ? "gray" : "inherit" }}>
                                                    {new Date(holiday.startDate).toLocaleDateString("en-GB")}
                                                </TableCell>
                                                <TableCell sx={{ color: isPast ? "gray" : "inherit" }}>
                                                    {new Date(holiday.endDate).toLocaleDateString("en-GB")}
                                                </TableCell>
                                                <TableCell sx={{ color: isPast ? "gray" : "inherit" }}>
                                                    {holiday.description?.trim() ? holiday.description : "-"}
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            No holiday records found.
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

export default Holiday;
