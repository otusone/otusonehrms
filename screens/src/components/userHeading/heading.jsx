import React, { useState, useEffect } from 'react';
import './Heading.css';
import { Typography, IconButton, Modal, Box, TextField, Button, MenuItem } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';
//import { MdManageAccounts } from 'react-icons/md';
import { MdAdminPanelSettings } from "react-icons/md";
import axios from 'axios';
import axiosInstance from '../../utils/baseurl';
import { useNavigate } from 'react-router-dom';


const Heading = () => {
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const userId = localStorage.getItem("userId");

    const navigate = useNavigate();

    <IconButton onClick={() => navigate('/profile')}>
        <FaUserCircle className="user-icon" />
    </IconButton>


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
            //console.log(userId);

            if (!token || !userId || userId === "null") {
                console.error("No valid token or userId found");
                return;
            }

            const res = await axiosInstance.get(`/user/profile/${userId}`, {
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
            const res = await axiosInstance.patch(`/user/updateprofile/${userId}`, userData, {
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
        fetchProfile();
    }, []);


    return (
        <div className="heading-container">
            <div className="left-section">
                <MdAdminPanelSettings className="user-icon" />
                <div>
                    <Typography variant="h6" className="welcome-text">
                        Welcome, {userData.userName || "User"}
                    </Typography>
                    <Typography variant="body2" className="date-text">
                        {today}
                    </Typography>
                </div>
            </div>

            <IconButton onClick={() => navigate('/user-profile')}>
                <FaUserCircle className="user-icon" />
            </IconButton>
        </div>
    );
};

export default Heading;
