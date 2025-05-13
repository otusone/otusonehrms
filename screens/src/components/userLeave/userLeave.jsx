// import React, { useEffect, useState } from 'react';
// import {
//     Box, Typography, TextField, Button, Table, TableBody, TableCell,
//     TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle,
//     DialogContent, DialogActions, Snackbar, Alert
// } from "@mui/material";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import axios from 'axios';

// const UserLeave = () => {
//     const [leaves, setLeaves] = useState([]);
//     const [openForm, setOpenForm] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [editingLeaveId, setEditingLeaveId] = useState(null);
//     const [formData, setFormData] = useState({
//         startDate: null,
//         endDate: null,
//         reason: ''
//     });
//     const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

//     const userId = localStorage.getItem('userId');
//     const token = localStorage.getItem('token');

//     const fetchUserLeaves = async () => {
//         try {
//             const res = await axios.get('http://localhost:8000/api/v1/user/my-leaves', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setLeaves(res.data.leaves || []);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         fetchUserLeaves();
//     }, []);

//     const handleFormChange = (field, value) => {
//         setFormData(prev => ({ ...prev, [field]: value }));
//     };

//     const handleOpenForm = (leave = null) => {
//         if (leave) {
//             setEditMode(true);
//             setEditingLeaveId(leave._id);
//             setFormData({
//                 startDate: new Date(leave.startDate),
//                 endDate: new Date(leave.endDate),
//                 reason: leave.reason
//             });
//         } else {
//             setEditMode(false);
//             setFormData({ startDate: null, endDate: null, reason: '' });
//         }
//         setOpenForm(true);
//     };

//     const handleCloseForm = () => {
//         setOpenForm(false);
//         setEditMode(false);
//         setEditingLeaveId(null);
//     };

//     const handleSubmit = async () => {
//         if (!formData.startDate || !formData.endDate || !formData.reason) {
//             setNotification({ open: true, message: 'Please fill all fields.', severity: 'error' });
//             return;
//         }

//         const payload = {
//             startDate: formData.startDate.toISOString(),
//             endDate: formData.endDate.toISOString(),
//             reason: formData.reason,
//             userId,
//         };

//         try {
//             if (editMode) {
//                 await axios.patch(`http://localhost:8000/api/v1/user/leave/${editingLeaveId}`, payload, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setNotification({ open: true, message: 'Leave updated successfully.', severity: 'success' });
//             } else {
//                 await axios.post(`http://localhost:8000/api/v1/user/leave`, payload, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setNotification({ open: true, message: 'Leave applied successfully.', severity: 'success' });
//             }

//             fetchUserLeaves();
//             handleCloseForm();
//         } catch (err) {
//             console.error(err);
//             setNotification({ open: true, message: 'An error occurred.', severity: 'error' });
//         }
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this leave?")) return;

//         try {
//             await axios.delete(`http://localhost:8000/api/v1/user/delete-leave/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setNotification({ open: true, message: 'Leave deleted successfully.', severity: 'success' });
//             fetchUserLeaves();
//         } catch (err) {
//             console.error(err);
//             setNotification({ open: true, message: 'Failed to delete leave.', severity: 'error' });
//         }
//     };

//     const handleCloseNotification = () => {
//         setNotification({ ...notification, open: false });
//     };

//     return (
//         <Box p={3}>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Typography variant="h6">My Leaves</Typography>
//                 <Button variant="contained" onClick={() => handleOpenForm()} sx={{ bgcolor: "#56005b" }}>
//                     Apply for Leave
//                 </Button>
//             </Box>

//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead sx={{ bgcolor: "#56005b" }}>
//                         <TableRow>
//                             <TableCell sx={{ color: "#fff" }}>Start Date</TableCell>
//                             <TableCell sx={{ color: "#fff" }}>End Date</TableCell>
//                             <TableCell sx={{ color: "#fff" }}>Reason</TableCell>
//                             <TableCell sx={{ color: "#fff" }}>Status</TableCell>
//                             <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {leaves.length > 0 ? (
//                             leaves.map((leave) => (
//                                 <TableRow key={leave._id}>
//                                     <TableCell>{new Date(leave.startDate).toLocaleDateString()}</TableCell>
//                                     <TableCell>{new Date(leave.endDate).toLocaleDateString()}</TableCell>
//                                     <TableCell>{leave.reason}</TableCell>
//                                     <TableCell>{leave.status || "Pending"}</TableCell>
//                                     <TableCell>
//                                         <Button size="small" onClick={() => handleOpenForm(leave)}>Edit</Button>
//                                         <Button size="small" color="error" onClick={() => handleDelete(leave._id)}>Delete</Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell colSpan={5} align="center">No leave records found.</TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Dialog open={openForm} onClose={handleCloseForm} maxWidth="sm" fullWidth>
//                 <DialogTitle>{editMode ? "Edit Leave" : "Apply for Leave"}</DialogTitle>
//                 <DialogContent sx={{ py: 3 }}>
//                     <LocalizationProvider dateAdapter={AdapterDateFns}>
//                         <Box mb={3}>
//                             <DatePicker
//                                 label="Start Date"
//                                 value={formData.startDate}
//                                 onChange={(date) => handleFormChange('startDate', date)}
//                                 renderInput={(params) => <TextField {...params} fullWidth />}
//                             />
//                         </Box>
//                         <Box mb={3}>
//                             <DatePicker
//                                 label="End Date"
//                                 value={formData.endDate}
//                                 onChange={(date) => handleFormChange('endDate', date)}
//                                 renderInput={(params) => <TextField {...params} fullWidth />}
//                                 minDate={formData.startDate}
//                             />
//                         </Box>
//                         <TextField
//                             label="Reason"
//                             multiline
//                             rows={4}
//                             fullWidth
//                             value={formData.reason}
//                             onChange={(e) => handleFormChange('reason', e.target.value)}
//                         />
//                     </LocalizationProvider>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseForm}>Cancel</Button>
//                     <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: "#56005b" }}>
//                         {editMode ? "Update" : "Submit"}
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Snackbar
//                 open={notification.open}
//                 autoHideDuration={4000}
//                 onClose={handleCloseNotification}
//                 anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             >
//                 <Alert severity={notification.severity} onClose={handleCloseNotification}>
//                     {notification.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };

// export default UserLeave;

import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Button, TextField, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Snackbar, Alert
} from "@mui/material";
import Sidebar from "../userSidebar/sidebar";
import Heading from "../userHeading/heading";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from "axios";

const UserLeave = () => {
    const [leaveData, setLeaveData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [leaveForm, setLeaveForm] = useState({
        startDate: null,
        endDate: null,
        reason: '',
        id: null,
    });
    const [openForm, setOpenForm] = useState(false);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        fetchUserLeaves();
    }, []);

    const fetchUserLeaves = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await axios.get('http://localhost:8000/api/v1/user/my-leaves', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.success) setLeaveData(res.data.leaves);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredLeave = () =>
        leaveData.filter(leave =>
            leave.reason.toLowerCase().includes(searchTerm)
        );

    const handleOpenForm = (leave = null) => {
        if (leave) {
            setLeaveForm({
                startDate: new Date(leave.startDate),
                endDate: new Date(leave.endDate),
                reason: leave.reason,
                id: leave._id
            });
        } else {
            setLeaveForm({ startDate: null, endDate: null, reason: '', id: null });
        }
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setLeaveForm({ startDate: null, endDate: null, reason: '', id: null });
        setOpenForm(false);
    };

    const handleFormChange = (field, value) => {
        setLeaveForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");
        const payload = {
            userId,
            startDate: leaveForm.startDate,
            endDate: leaveForm.endDate,
            reason: leaveForm.reason
        };

        try {
            if (leaveForm.id) {
                await axios.patch(`http://localhost:8000/api/v1/user/leave/${leaveForm.id}`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setNotification({ open: true, message: "Leave updated!", severity: "success" });
            } else {
                await axios.post(`http://localhost:8000/api/v1/user/leave`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setNotification({ open: true, message: "Leave submitted!", severity: "success" });
            }
            fetchUserLeaves();
            handleCloseForm();
        } catch (err) {
            console.error(err);
            setNotification({ open: true, message: "Something went wrong", severity: "error" });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this leave?")) return;
        try {
            const token = localStorage.getItem("authToken");
            await axios.delete(`http://localhost:8000/api/v1/user/delete-leave/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNotification({ open: true, message: "Leave deleted", severity: "info" });
            fetchUserLeaves();
        } catch (err) {
            console.error(err);
        }
    };

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };

    return (
        <Box display="flex" minHeight="100vh">
            <Box sx={{ width: { xs: "100%", md: "18%" }, borderRight: "1px solid #eee" }}>
                <Sidebar />
            </Box>
            <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
                <Heading />
                <Box px={4} py={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">My Leaves</Typography>
                        <Box display="flex" gap={2}>
                            <Button variant="contained" onClick={() => handleOpenForm()} sx={{ bgcolor: "#56005b" }}>
                                Apply Leave
                            </Button>
                            {/* <TextField placeholder="Search..." size="small" onChange={handleSearch} /> */}
                        </Box>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead sx={{ bgcolor: "#56005b" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff" }}>Start</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>End</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>Reason</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredLeave()?.length ? filteredLeave().map((leave) => (
                                    <TableRow key={leave._id}>
                                        <TableCell>{new Date(leave.startDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(leave.endDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{leave.reason}</TableCell>
                                        <TableCell>{leave.status}</TableCell>
                                        <TableCell>
                                            {leave.status === "Pending" && (
                                                <Box display="flex" gap={1}>
                                                    <Button variant="outlined" color="primary" size="small" onClick={() => handleOpenForm(leave)}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(leave._id)}>
                                                        Delete
                                                    </Button>
                                                </Box>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">No leaves found</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                {/* Form Modal */}
                <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
                    <DialogTitle sx={{ bgcolor: "#56005b", color: "#fff" }}>
                        {leaveForm.id ? "Update Leave" : "Apply for Leave"}
                    </DialogTitle>
                    <DialogContent>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Box mt={2}>
                                <DatePicker
                                    label="Start Date"
                                    value={leaveForm.startDate}
                                    onChange={(val) => handleFormChange('startDate', val)}
                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                />
                            </Box>
                            <Box mt={2}>
                                <DatePicker
                                    label="End Date"
                                    value={leaveForm.endDate}
                                    onChange={(val) => handleFormChange('endDate', val)}
                                    minDate={leaveForm.startDate}
                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                />
                            </Box>
                            <TextField
                                label="Reason"
                                multiline
                                rows={4}
                                fullWidth
                                margin="normal"
                                value={leaveForm.reason}
                                onChange={(e) => handleFormChange('reason', e.target.value)}
                            />
                        </LocalizationProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseForm}>Cancel</Button>
                        <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: "#56005b" }}>
                            {leaveForm.id ? "Update" : "Submit"}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Snackbar */}
                <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
                    <Alert severity={notification.severity} onClose={handleCloseNotification}>
                        {notification.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default UserLeave;
