import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from '../../utils/baseurl';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    InputAdornment,
    IconButton,
    Box,
    Typography,
    Button,
    TextField,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem
} from "@mui/material";
import Sidebar from "../sidebar/sidebar";
import Heading from "../headingProfile/heading";

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: "",
        userName: "",
        email: "",
        password: "",
        dateOfJoining: "",
        designation: "",
        monthlySalary: "",
        dateOfBirth: "",
        address: "",
        gender: "",
        // religion: "",
        mobile: "",
        emergencyContact: "",
    });


    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await axiosInstance.get("/admin/get-employees", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEmployees(res.data.employees);
            setFilteredEmployees(res.data.employees);
        } catch (err) {
            console.error("Failed to fetch employees", err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = employees.filter(emp =>
            emp.userName.toLowerCase().includes(value) ||
            emp.email.toLowerCase().includes(value)
        );
        setFilteredEmployees(filtered);
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this employee?");
        if (!confirm) return;
        try {
            const token = localStorage.getItem("authToken");
            await axiosInstance.delete(`/admin/delete-employee/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Employee deleted successfully.");
            fetchEmployees();
        } catch (err) {
            console.error("Failed to delete employee", err);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toISOString().split("T")[0]; // "YYYY-MM-DD"
    };

    const handleOpen = (employee = null) => {
        setEditingEmployee(employee);
        if (employee) {
            //setFormData({ ...employee });
            setFormData({
                employeeId: employee.employeeId || "",
                userName: employee.userName || "",
                email: employee.email || "",
                password: employee.password || "",
                designation: employee.designation || "",
                monthlySalary: employee.monthlySalary || "",
                dateOfJoining: formatDate(employee.dateOfJoining),
                dateOfBirth: formatDate(employee.dateOfBirth),
                address: employee.address || "",
                gender: employee.gender || "",
                // religion: employee.religion || "",
                mobile: employee.mobile || "",
                emergencyContact: employee.emergencyContact || "",
            });
        } else {
            setFormData({
                employeeId: "",
                userName: "",
                email: "",
                password: "",
                designation: "",
                dateOfJoining: "",
                monthlySalary: "",
                dateOfBirth: "",
                address: "",
                gender: "",
                // religion: "",
                mobile: "",
                emergencyContact: "",
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingEmployee(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const requiredFields = ["userName", "email", "password", "designation", "gender", "mobile"];
        const missingFields = requiredFields.filter(field => !formData[field]?.trim());

        if (missingFields.length > 0) {
            alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
            return;
        }
        try {
            const token = localStorage.getItem("authToken");
            if (editingEmployee) {
                const { _id, ...updatedData } = formData;
                await axiosInstance.patch(
                    `/admin/update-employee/${editingEmployee._id}`,
                    updatedData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
            } else {
                await axiosInstance.post("/admin/add-employee", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                alert("Employee added successfully!");
            }
            handleClose();
            fetchEmployees();
        } catch (err) {
            console.error("Failed to submit employee data", err);
            if (
                err.response &&
                err.response.data &&
                err.response.data.message &&
                err.response.data.message.toLowerCase().includes("email")
            ) {
                alert("An employee with this email already exists!");
            } else {
                alert("An error occurred while submitting employee data. Please try again.");
            }
        }
    };

    return (
        <Box display="flex" minHeight="100vh">
            <Box sx={{ width: { xs: "100%", md: "18%" }, borderRight: { md: "1px solid #eee" }, bgcolor: "#fff" }}>
                <Sidebar />
            </Box>
            <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
                <Heading />
                <Box px={4} py={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap">
                        <Typography variant="h6">Manage Employee</Typography>
                        <Button variant="outlined" color="primary" onClick={() => handleOpen()} sx={{ mt: { xs: 1, sm: 0 } }}>
                            ADD EMPLOYEE
                        </Button>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" mb={2}>
                        <TextField placeholder="Search by Name or Email..." size="small" value={searchTerm} onChange={handleSearch} sx={{ width: "250px" }} />
                    </Box>
                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: "#58024B" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff" }}>S. NO.</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>EMPLOYEE ID</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>NAME</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>EMAIL</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>DATE OF JOINING</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>DESIGNATION</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>MONTHLY SALARY</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>DATE OF BIRTH</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>ADDRESS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>GENDER</TableCell>
                                    {/* <TableCell sx={{ color: "#fff" }}>RELIGION</TableCell> */}
                                    <TableCell sx={{ color: "#fff" }}>MOBILE NO.</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>EMERGENCY CONTACT NO.</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredEmployees.length > 0 ? (
                                    filteredEmployees.map((emp, index) => (
                                        <TableRow key={emp._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{emp.employeeId}</TableCell>
                                            <TableCell>{emp.userName}</TableCell>
                                            <TableCell>{emp.email}</TableCell>
                                            <TableCell>{emp.dateOfJoining ? new Date(emp.dateOfJoining).toLocaleDateString() : "N/A"}</TableCell>
                                            <TableCell>{emp.designation}</TableCell>
                                            <TableCell>{emp.monthlySalary}</TableCell>
                                            <TableCell>{emp.dateOfBirth ? new Date(emp.dateOfBirth).toLocaleDateString() : "N/A"}</TableCell>
                                            <TableCell>{emp.address || "N/A"}</TableCell>
                                            <TableCell>{emp.gender}</TableCell>
                                            {/* <TableCell>{emp.religion}</TableCell> */}
                                            <TableCell>{emp.mobile}</TableCell>
                                            <TableCell>{emp.emergencyContact}</TableCell>

                                            <TableCell>
                                                <Box display="flex" gap={1}>
                                                    <Button variant="outlined" color="primary" size="small" onClick={() => handleOpen(emp)}>Update</Button>
                                                    <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(emp._id)}>Delete</Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={10} align="center">No employees found.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Dialog open={open} onClose={handleClose} fullWidth>
                        <DialogTitle>{editingEmployee ? "Update Employee" : "Add Employee"}</DialogTitle>
                        <DialogContent>
                            <TextField margin="dense" label="Employee ID" fullWidth name="employeeId" value={formData.employeeId} onChange={handleChange} />
                            <TextField margin="dense" label="Name" fullWidth name="userName" value={formData.userName} onChange={handleChange} />
                            <TextField margin="dense" label="Email" fullWidth name="email" value={formData.email} onChange={handleChange} />
                            {/* <TextField margin="dense" label="Password" fullWidth type="password" name="password" value={formData.password} onChange={handleChange} /> */}
                            <TextField
                                margin="dense"
                                label="Password"
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField margin="dense" label="Date of Joining" fullWidth type="date" name="dateOfJoining" InputLabelProps={{ shrink: true }} value={formData.dateOfJoining} onChange={handleChange} />
                            <TextField margin="dense" label="Designation" fullWidth name="designation" value={formData.designation} onChange={handleChange} />
                            <TextField margin="dense" label="Monthly Salary" fullWidth name="monthlySalary" value={formData.monthlySalary} onChange={handleChange} />
                            <TextField margin="dense" label="Date of Birth" fullWidth type="date" name="dateOfBirth" InputLabelProps={{ shrink: true }} value={formData.dateOfBirth} onChange={handleChange} />
                            <TextField margin="dense" label="Address" fullWidth name="address" value={formData.address} onChange={handleChange} />
                            <TextField margin="dense" label="Gender" fullWidth name="gender" value={formData.gender} onChange={handleChange} select>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>
                            {/* <TextField margin="dense" label="Religion" fullWidth name="religion" value={formData.religion} onChange={handleChange} /> */}
                            <TextField margin="dense" label="Mobile No." fullWidth name="mobile" value={formData.mobile} onChange={handleChange} />
                            <TextField margin="dense" label="Emergency Contact No." fullWidth name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            {/* <Button onClick={handleSubmit} variant="contained" color="primary">{editingEmployee ? "Update" : "Add"}</Button> */}
                            <Button
                                onClick={() => setConfirmationOpen(true)}
                                variant="contained"
                                color="primary"
                            >
                                {editingEmployee ? "Update" : "Add"}
                            </Button>

                        </DialogActions>
                    </Dialog>

                    <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
                        <DialogTitle>Confirm Submission</DialogTitle>
                        <DialogContent>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <p><strong>Password:</strong> {formData.password}</p>
                            <p>Are you sure you want to proceed?</p>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setConfirmationOpen(false)}>Cancel</Button>
                            <Button
                                onClick={() => {
                                    setConfirmationOpen(false);
                                    handleSubmit();
                                }}
                                variant="contained"
                                color="primary"
                            >
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Box>
            </Box>
        </Box>
    );
};

export default Employee;
