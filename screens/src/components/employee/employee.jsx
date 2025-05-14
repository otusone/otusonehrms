import React, { useEffect, useState } from "react";
import axios from "axios";
import {
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
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        designation: "",
        dateOfBirth: "",
        address: "",
        gender: "",
        religion: "",
        mobile: ""
    });

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await axios.get("http://localhost:8000/api/v1/admin/get-employees", {
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
            await axios.delete(`http://localhost:8000/api/v1/admin/delete-employee/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Employee deleted successfully.");
            fetchEmployees();
        } catch (err) {
            console.error("Failed to delete employee", err);
        }
    };

    const handleOpen = (employee = null) => {
        setEditingEmployee(employee);
        if (employee) {
            setFormData({ ...employee });
        } else {
            setFormData({
                userName: "",
                email: "",
                password: "",
                designation: "",
                dateOfBirth: "",
                address: "",
                gender: "",
                religion: "",
                mobile: ""
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
        try {
            const token = localStorage.getItem("authToken");
            if (editingEmployee) {
                const { _id, ...updatedData } = formData;
                await axios.patch(
                    `http://localhost:8000/api/v1/admin/update-employee/${editingEmployee._id}`,
                    updatedData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
            } else {
                await axios.post("http://localhost:8000/api/v1/admin/add-employee", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
            }
            handleClose();
            fetchEmployees();
        } catch (err) {
            console.error("Failed to submit employee data", err);
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
                        <TextField placeholder="Search..." size="small" value={searchTerm} onChange={handleSearch} sx={{ width: "250px" }} />
                    </Box>
                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: "#56005b" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff" }}>S. NO.</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>EMPLOYEE NAME</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>EMAIL</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>DESIGNATION</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>DATE OF BIRTH</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>ADDRESS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>GENDER</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>RELIGION</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>MOBILE NO.</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredEmployees.length > 0 ? (
                                    filteredEmployees.map((emp, index) => (
                                        <TableRow key={emp._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{emp.userName}</TableCell>
                                            <TableCell>{emp.email}</TableCell>
                                            <TableCell>{emp.designation}</TableCell>
                                            <TableCell>{emp.dateOfBirth ? new Date(emp.dateOfBirth).toLocaleDateString() : "N/A"}</TableCell>
                                            <TableCell>{emp.address || "N/A"}</TableCell>
                                            <TableCell>{emp.gender}</TableCell>
                                            <TableCell>{emp.religion}</TableCell>
                                            <TableCell>{emp.mobile}</TableCell>
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
                            <TextField margin="dense" label="Name" fullWidth name="userName" value={formData.userName} onChange={handleChange} />
                            <TextField margin="dense" label="Email" fullWidth name="email" value={formData.email} onChange={handleChange} />
                            <TextField margin="dense" label="Password" fullWidth type="password" name="password" value={formData.password} onChange={handleChange} />
                            <TextField margin="dense" label="Designation" fullWidth name="designation" value={formData.designation} onChange={handleChange} />
                            <TextField margin="dense" label="Date of Birth" fullWidth type="date" name="dateOfBirth" InputLabelProps={{ shrink: true }} value={formData.dateOfBirth} onChange={handleChange} />
                            <TextField margin="dense" label="Address" fullWidth name="address" value={formData.address} onChange={handleChange} />
                            <TextField margin="dense" label="Gender" fullWidth name="gender" value={formData.gender} onChange={handleChange} select>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>
                            <TextField margin="dense" label="Religion" fullWidth name="religion" value={formData.religion} onChange={handleChange} />
                            <TextField margin="dense" label="Mobile No." fullWidth name="mobile" value={formData.mobile} onChange={handleChange} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSubmit} variant="contained" color="primary">{editingEmployee ? "Update" : "Add"}</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
        </Box>
    );
};

export default Employee;
