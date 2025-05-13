import React, { useState, useEffect } from 'react';
import './Heading.css';
import { Typography, IconButton, Modal, Box, TextField, Button, MenuItem } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';
import { MdManageAccounts } from 'react-icons/md';
import axios from 'axios';

const Heading = () => {
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const userId = localStorage.getItem("userId");

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const userId = localStorage.getItem("userId");
            console.log(userId);

            if (!token || !userId || userId === "null") {
                console.error("No valid token or userId found");
                return;
            }

            const res = await axios.get(`http://localhost:8000/api/v1/user/profile/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res?.data) {
                setUserData(res.data);
            }
        } catch (err) {
            console.error("Failed to fetch profile:", err);
        }
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("authToken");

            if (!token) {
                console.error("No token found");
                return;
            }
            const res = await axios.patch(`http://localhost:8000/api/v1/user/updateprofile/${userId}`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Profile updated successfully");
            setOpen(false);
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    useEffect(() => {
        if (open) fetchProfile();
    }, [open]);

    return (
        <div className="heading-container">
            <div className="left-section">
                <FaUserCircle className="user-icon" />
                <div>
                    <Typography variant="h6" className="welcome-text">
                        Welcome, {userData.userName || "User"}
                    </Typography>
                    <Typography variant="body2" className="date-text">
                        {today}
                    </Typography>
                </div>
            </div>

            <IconButton onClick={() => setOpen(true)}>
                <MdManageAccounts className="profile-icon" />
            </IconButton>

            {/* Modal for full profile form */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper', p: 4, borderRadius: 2, width: 450, maxHeight: '90vh', overflowY: 'auto'
                }}>
                    <Typography variant="h6" gutterBottom>Edit Profile</Typography>

                    <TextField fullWidth label="Name" name="userName" value={userData.userName || ''} onChange={handleChange} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Email" name="email" value={userData.email || ''} onChange={handleChange} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Mobile" name="mobile" value={userData.mobile || ''} onChange={handleChange} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Designation" name="designation" value={userData.designation || ''} onChange={handleChange} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Religion" name="religion" value={userData.religion || ''} onChange={handleChange} sx={{ mb: 2 }} />

                    <TextField
                        select
                        fullWidth
                        label="Gender"
                        name="gender"
                        value={userData.gender || ''}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </TextField>

                    <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={userData.address || ''}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    <Button fullWidth variant="contained" onClick={handleUpdate}>Update</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default Heading;
