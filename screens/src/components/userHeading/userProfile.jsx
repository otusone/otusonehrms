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
    const [lastWorkingDay, setLastWorkingDay] = useState(null);


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

    const fetchLastWorkingDay = async () => {
        try {
            const res = await axiosInstance.get(`/user/get-salary-slip/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const slips = res?.data?.data || [];
            if (slips.length > 0) {
                const latestSlip = slips[0];
                setLastWorkingDay(latestSlip.lastWorkingDay);
            }
        } catch (error) {
            console.error("Error fetching last working day:", error);
        }
    };





    useEffect(() => {
        fetchProfile();
        fetchLastWorkingDay();
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

                        <Box sx={{ width: "100%", maxWidth: 1200, display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, }}>

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
                                    Name: {userData.userName}
                                </Typography>

                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Designation: {userData.designation}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Employee ID: {userData.employeeId}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>Gender: {userData.gender}</Typography>

                                <Divider sx={{ my: 2, width: "100%" }} />

                                <Typography sx={{ mb: 1 }}>Phone: {userData.mobile}</Typography>

                                <Typography sx={{ mb: 1 }}>Email: {userData.email}</Typography>

                                <Typography sx={{ mb: 1 }}>Date Of Birth: {
                                    userData.dateOfBirth
                                        ? new Date(userData.dateOfBirth).toISOString().split("T")[0]
                                        : ""
                                }</Typography>


                            </Paper>




                            <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 3 }}>


                                <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                                    <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
                                        Contact Details
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        label="Mobile"
                                        name="mobile"
                                        value={userData.mobile || ""}
                                        variant="standard"
                                        InputProps={{
                                            readOnly: true,
                                            disableUnderline: true,
                                            sx: { cursor: "default" },
                                        }}
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Emergency Contact No."
                                        name="emergencyContact"
                                        value={userData.emergencyContact || ""}
                                        variant="standard"
                                        InputProps={{
                                            readOnly: true,
                                            disableUnderline: true,
                                            sx: { cursor: "default" },
                                        }}
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        name="address"
                                        value={userData.address || ""}
                                        variant="standard"
                                        InputProps={{
                                            readOnly: true,
                                            disableUnderline: true,
                                            sx: { cursor: "default" },
                                        }}
                                        sx={{ mb: 2 }}
                                    />
                                </Paper>


                                <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                                    <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
                                        Employment Information
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        label="Designation"
                                        name="designation"
                                        value={userData.designation || ""}
                                        variant="standard"
                                        InputProps={{
                                            readOnly: true,
                                            disableUnderline: true,
                                            sx: { cursor: "default" },
                                        }}
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Monthly Salary"
                                        name="basicSalary"
                                        value={userData.basicSalary || ""}
                                        variant="standard"
                                        InputProps={{
                                            readOnly: true,
                                            disableUnderline: true,
                                            sx: { cursor: "default" },
                                        }}
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
                                        variant="standard"
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                            readOnly: true,
                                            disableUnderline: true,
                                            sx: { cursor: "default" },
                                        }}
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Probation Period (in Months)"
                                        name="probationPeriodMonths"
                                        value={userData.probationPeriodMonths != null
                                            ? `${userData.probationPeriodMonths} months`
                                            : "NA"
                                        }
                                        variant="standard"
                                        InputProps={{
                                            readOnly: true,
                                            disableUnderline: true,
                                            sx: { cursor: "default" },
                                        }}
                                        sx={{ mb: 2 }}
                                    />

                                    <TextField
                                        fullWidth
                                        label="Last Working Day"
                                        value={lastWorkingDay ? new Date(lastWorkingDay).toLocaleDateString() : "NA"}
                                        variant="standard"
                                        InputProps={{
                                            readOnly: true,
                                            disableUnderline: true,
                                            sx: { cursor: "default" },
                                        }}
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
