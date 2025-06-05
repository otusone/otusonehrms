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
    Snackbar,
    Alert,
} from "@mui/material";
import Sidebar from "../sidebar/sidebar";
import Heading from "../headingProfile/heading";

const Holiday = () => {
    const [holidays, setHolidays] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [newHoliday, setNewHoliday] = useState({ date: "", title: "", description: "" });
    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    useEffect(() => {
        fetchHolidays();
    }, []);

    const fetchHolidays = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await axiosInstance.get("/admin/get-holidays", {
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

    const handleCloseNotification = () => {
        setNotification((prev) => ({ ...prev, open: false }));
    };


    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this holiday?")) return;
        try {
            const token = localStorage.getItem("authToken");
            await axiosInstance.delete(`/admin/delete-holiday/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setNotification({
                open: true,
                message: "Holiday deleted successfully!",
                severity: "success",
            });

            fetchHolidays();
        } catch (err) {
            console.error("Error deleting holiday:", err);
            setNotification({
                open: true,
                message: "Failed to delete holiday",
                severity: "error",
            });
        }
    };


    const handleAddHoliday = async () => {
        if (!newHoliday.date || !newHoliday.title) {
            setNotification({
                open: true,
                message: "Please fill all the fields",
                severity: "error",
            });
            return;
        }

        try {
            const token = localStorage.getItem("authToken");
            const response = await axiosInstance.post("/admin/add-holiday", newHoliday, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.data?.success) {
                setNotification({
                    open: true,
                    message: "Holiday added successfully!",
                    severity: "success",
                });
            }

            fetchHolidays();
            setOpen(false);
            setNewHoliday({ date: "", title: "", description: "" });
        } catch (err) {
            console.error("Error adding holiday:", err);
            setNotification({
                open: true,
                message: "Failed to add holiday",
                severity: "error",
            });
        }
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
                        <Typography variant="h6">Manage Holidays</Typography>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        mb={2}
                        alignItems={{ xs: "flex-start", lg: "flex-end" }}
                    >
                        <Button variant="contained" onClick={() => setOpen(true)}>
                            Add Holiday
                        </Button>

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


                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleDelete(holidays._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
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


            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    p={3}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "#fff",
                        boxShadow: 24,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" mb={2}>
                        Add New Holiday
                    </Typography>
                    <TextField
                        fullWidth
                        label="Holiday Title"
                        value={newHoliday.title}
                        onChange={(e) =>
                            setNewHoliday((prev) => ({ ...prev, title: e.target.value }))
                        }
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        type="date"
                        label="Date"
                        InputLabelProps={{ shrink: true }}
                        value={newHoliday.date}
                        onChange={(e) =>
                            setNewHoliday((prev) => ({ ...prev, date: e.target.value }))
                        }
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Description (Optional)"
                        value={newHoliday.description}
                        onChange={(e) =>
                            setNewHoliday((prev) => ({ ...prev, description: e.target.value }))
                        }
                        sx={{ mb: 2 }}
                    />

                    <Button variant="contained" onClick={handleAddHoliday}>
                        Save
                    </Button>
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
                    sx={{ width: "100%" }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Holiday;
