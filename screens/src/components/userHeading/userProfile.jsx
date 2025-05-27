import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    Divider,
    TextField,
    Modal,
    MenuItem,
    Button
} from "@mui/material";
import Sidebar from "../userSidebar/sidebar";
import Heading from "../userHeading/heading";
import axiosInstance from "../../utils/baseurl";
import { FaUserAlt } from "react-icons/fa";


const UserProfile = () => {
    const [userData, setUserData] = useState({});
    const [open, setOpen] = useState(false);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("authToken");

    const fetchProfile = async () => {
        try {
            if (!token || !userId || userId === "null") return;
            const res = await axiosInstance.get(`/user/profile/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res?.data) setUserData(res.data);
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        }
    };




    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <Box display="flex" minHeight="100vh" bgcolor="#f0f2f5">
            {/* Sidebar */}
            <Box sx={{ width: { xs: "0%", md: "18%" }, borderRight: "1px solid #eee", bgcolor: "#fff", }}>
                <Sidebar />
            </Box>

            {/* Main Content */}
            <Box sx={{ width: { xs: "100%", md: "82%" }, backgroundColor: "#f5f7fa", minHeight: "100vh", }}>
                <Heading />

                <Box px={4} py={2}>
                    <Typography variant="h6" mb={2}>My Profile Details</Typography>

                    <Box display="flex" justifyContent="center" mt={4} px={2}>

                        <Box
                            sx={{
                                width: "100%",
                                maxWidth: 1200,
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                gap: 4,
                            }}
                        >

                            {/* Left - Profile Summary */}

                            <Paper
                                elevation={3}
                                sx={{
                                    flex: { xs: "unset", md: 1 },
                                    width: { xs: "100%", md: "auto" },
                                    p: 3,
                                    borderRadius: 3,
                                    textAlign: "center",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    alignSelf: { xs: "center", md: "flex-start" },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        mb: 2,
                                        borderRadius: "50%",
                                        backgroundColor: "rgb(188, 18, 94)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <FaUserAlt size={40} color="#ffff" />
                                </Box>


                                <Typography variant="h6" gutterBottom>
                                    {userData.userName}
                                </Typography>

                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    {userData.designation}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    {userData.employeeId}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>{userData.gender}</Typography>

                                <Divider sx={{ my: 2, width: "100%" }} />

                                <Typography variant="body2" color="textSecondary">
                                    Phone
                                </Typography>
                                <Typography sx={{ mb: 1 }}>{userData.mobile}</Typography>

                                <Typography variant="body2" color="textSecondary">
                                    Email
                                </Typography>
                                <Typography sx={{ mb: 1 }}>{userData.email}</Typography>

                                <Typography variant="body2" color="textSecondary">
                                    Date Of Birth
                                </Typography>
                                <Typography sx={{ mb: 1 }}>{
                                    userData.dateOfBirth
                                        ? new Date(userData.dateOfBirth).toISOString().split("T")[0]
                                        : ""
                                }</Typography>


                            </Paper>



                            {/* Right - Form in Cards */}
                            <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 3 }}>

                                {/* Card 2 - Contact Details */}
                                <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Contact Details
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        label="Mobile"
                                        name="mobile"
                                        value={userData.mobile || ""}

                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Emergency Contact No."
                                        name="emergencyContact"
                                        value={userData.emergencyContact || ""}

                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        name="address"
                                        value={userData.address || ""}

                                        sx={{ mb: 2 }}
                                    />
                                </Paper>

                                {/* Card 3 - Employment Info */}
                                <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Employment Information
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        label="Designation"
                                        name="designation"
                                        value={userData.designation || ""}

                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Monthly Salary"
                                        name="monthlySalary"
                                        value={userData.monthlySalary || ""}

                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Date of Joining"
                                        name="dateOfJoining"
                                        value={
                                            userData.dateOfJoining
                                                ? new Date(userData.dateOfJoining).toISOString().split("T")[0]
                                                : ""
                                        }

                                        InputLabelProps={{ shrink: true }}
                                        sx={{ mb: 2 }}
                                    />
                                </Paper>


                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );

};

export default UserProfile;
