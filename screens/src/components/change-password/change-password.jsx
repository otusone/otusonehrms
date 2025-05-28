import React, { useState } from "react";
import {
    InputAdornment,
    IconButton,
    Modal,
    Box,
    TextField,
    Button,
    Typography
} from "@mui/material";
import { styled } from "@mui/system";
import axiosInstance from '../../utils/baseurl';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const StyledBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    boxShadow: 24,
    borderRadius: 10,
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
        width: "80%",
        padding: theme.spacing(2),
    },
    maxHeight: "90vh",
    overflowY: "auto",
}));

const GradientButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    background: "linear-gradient(to right, #58024B, rgb(188, 18, 94))",
    color: "white",
    padding: theme.spacing(1.2),
    fontWeight: "bold",
    borderRadius: 20,
    fontSize: "0.9rem",
    ":hover": {
        background: "linear-gradient(to right, rgb(188, 18, 94), #58024B)",
    },
}));

const ChangePassword = ({ open, handleClose }) => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = async () => {
        if (formData.newPassword !== formData.confirmPassword) {
            alert("New passwords do not match!");
            return;
        }

        try {
            const token = localStorage.getItem("authToken");
            await axiosInstance.patch("/admin/change-password", {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Password changed successfully");
            handleClose();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to change password");
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <StyledBox>
                <Typography variant="h6" textAlign="center" gutterBottom>
                    Change Password
                </Typography>

                <TextField
                    label="Current Password"
                    name="currentPassword"
                    type={showPassword.current ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    value={formData.currentPassword}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => togglePasswordVisibility("current")} edge="end">
                                    {showPassword.current ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    label="New Password"
                    name="newPassword"
                    type={showPassword.new ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    value={formData.newPassword}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => togglePasswordVisibility("new")} edge="end">
                                    {showPassword.new ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showPassword.confirm ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => togglePasswordVisibility("confirm")} edge="end">
                                    {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <GradientButton fullWidth onClick={handleSubmit}>
                    CHANGE PASSWORD
                </GradientButton>
            </StyledBox>
        </Modal>
    );
};

export default ChangePassword;
