import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/baseurl";
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
} from "@mui/material";
import Sidebar from "../userSidebar/sidebar";
import Heading from "../userHeading/heading";

const Holiday = () => {
    const [holidays, setHolidays] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [newHoliday, setNewHoliday] = useState({ date: "", title: "", description: "" });

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
                                    <TableCell sx={{ color: "#fff" }}>Date</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>Desription</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredHolidays.length ? (
                                    filteredHolidays.map((holidays, index) => (
                                        <TableRow key={holidays._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{holidays.title}</TableCell>
                                            <TableCell>
                                                {new Date(holidays.date).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>{holidays.description?.trim() ? holidays.description : "-"}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
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
