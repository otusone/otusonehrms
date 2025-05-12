import React, { useState, useEffect } from 'react';
import axios from "axios";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from "@mui/material";
import UserSidebar from '../UserSidebar/userSidebar';
import Heading from "../headingProfile/heading";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Applyforleave = () => {
    const [leaveData, setLeaveData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [openLeaveForm, setOpenLeaveForm] = useState(false);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
    const [leaveForm, setLeaveForm] = useState({
        startDate: null,
        endDate: null,
        reason: ''
    });

    // useEffect(()=>{
    //     fetchApplyleaveData();
    // },[]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredLeave = () => {
        return leaveData?.filter(
            (leave) =>
                leave.userName?.toLowerCase().includes(searchTerm) ||
                leave.userId?.toLowerCase().includes(searchTerm)
        );
    };

    const handleOpenLeaveForm = () => {
        setOpenLeaveForm(true);
    };

    const handleCloseLeaveForm = () => {
        setOpenLeaveForm(false);
        setLeaveForm({
            startDate: null,
            endDate: null,
            reason: ''
        });
    };

    const handleLeaveFormChange = (field, value) => {
        setLeaveForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmitLeave = () => {
        // Validate form
        if (!leaveForm.startDate || !leaveForm.endDate || !leaveForm.reason) {
            setNotification({
                open: true,
                message: 'Please fill all fields',
                severity: 'error'
            });
            return;
        }

        // Submit leave request
        // Here you would typically make an API call
        console.log('Leave submitted:', leaveForm);
        
        // Show success notification
        setNotification({
            open: true,
            message: 'Leave application submitted successfully!',
            severity: 'success'
        });
        
        // Close the form
        handleCloseLeaveForm();
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    return (
        <Box display="flex" minHeight="100vh">
            <Box
                sx={{
                    width: { xs: "100%", md: "18%" }, borderRight: { md: "1px solid #eee" }, bgcolor: "#fff",
                }}
            >
                <UserSidebar />
            </Box>

            <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
                <Heading />
                <Box px={4} py={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap">
                        <Typography variant="h6" sx={{ mb: { xs: 1, sm: 0 } }}>
                            Applied Leave
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Button 
                                variant="contained" 
                                onClick={handleOpenLeaveForm}
                                sx={{ 
                                    bgcolor: "#56005b",
                                    '&:hover': { bgcolor: "#7a007f" }
                                }}
                            >
                                Apply for Leave
                            </Button>
                            <TextField 
                                placeholder="Search..." 
                                size="small" 
                                onChange={handleSearch} 
                                sx={{ width: "250px" }}
                            />
                        </Box>
                    </Box>

                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: "#56005b" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff" }}>EMPLOYEE ID</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>EMPLOYEE NAME</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>START DATE</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>END DATE</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>LEAVE REASON</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>STATUS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredLeave()?.length > 0 ? (
                                    filteredLeave().map((leave) => (
                                        <TableRow key={leave._id}>
                                            <TableCell>{leave.userId}</TableCell>
                                            <TableCell>{leave.userName}</TableCell>
                                            <TableCell>{leave.startDate}</TableCell>
                                            <TableCell>{leave.endDate}</TableCell>
                                            <TableCell>{leave.reason}</TableCell>
                                            <TableCell>{leave.status}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            No Applied leave records found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                {/* Leave Application Form Dialog */}
                <Dialog open={openLeaveForm} onClose={handleCloseLeaveForm} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ bgcolor: "#56005b", color: "#fff" }}>
                        Apply for Leave
                    </DialogTitle>
                    <DialogContent sx={{ py: 3 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Box mb={3}>
                                <DatePicker
                                    label="Start Date"
                                    value={leaveForm.startDate}
                                    onChange={(newValue) => handleLeaveFormChange('startDate', newValue)}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </Box>
                            <Box mb={3}>
                                <DatePicker
                                    label="End Date"
                                    value={leaveForm.endDate}
                                    onChange={(newValue) => handleLeaveFormChange('endDate', newValue)}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                    minDate={leaveForm.startDate}
                                />
                            </Box>
                            <TextField
                                label="Reason for Leave"
                                multiline
                                rows={4}
                                fullWidth
                                value={leaveForm.reason}
                                onChange={(e) => handleLeaveFormChange('reason', e.target.value)}
                            />
                        </LocalizationProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseLeaveForm} sx={{ color: "#56005b" }}>
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleSubmitLeave} 
                            variant="contained"
                            sx={{ bgcolor: "#56005b", '&:hover': { bgcolor: "#7a007f" } }}
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Notification Snackbar */}
                <Snackbar
                    open={notification.open}
                    autoHideDuration={6000}
                    onClose={handleCloseNotification}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert 
                        onClose={handleCloseNotification} 
                        severity={notification.severity}
                        sx={{ width: '100%' }}
                    >
                        {notification.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    )
}

export default Applyforleave;