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
    const [showCredentials, setShowCredentials] = useState(false);
    const [submittedCredentials, setSubmittedCredentials] = useState({ employeeId: "", email: "", password: "" });

    const [formData, setFormData] = useState({
        employeeId: "",
        userName: "",
        email: "",
        password: "",
        dateOfJoining: "",
        designation: "",
        basicSalary: "",
        probationPeriodMonths: "",
        dateOfBirth: "",
        address: "",
        gender: "",
        // religion: "",
        mobile: "",
        emergencyContact: "",
    });

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [openViewModal, setOpenViewModal] = useState(false);

    const handleView = async (emp) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axiosInstance.get(`/admin/salaryslip/${emp._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const slips = response.data?.data || [];

            if (slips.length > 0) {
                const latestSlip = slips[0];
                const enrichedEmployee = { ...emp, ...latestSlip };
                setSelectedEmployee(enrichedEmployee);
            } else {
                setSelectedEmployee(emp);
            }

            setOpenViewModal(true);
        } catch (error) {
            console.error("Error fetching salary slip:", error);
            setSelectedEmployee(emp);
            setOpenViewModal(true);
        }
    };



    const handleCloseView = () => {
        setOpenViewModal(false);
        setSelectedEmployee(null);
    };



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
                basicSalary: employee.basicSalary || "",
                probationPeriodMonths: employee.probationPeriodMonths || "",
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
                baiscSalary: "",
                probationPeriodMonths: "",
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
        const requiredFields = editingEmployee
            ? ["userName", "email", "designation", "gender", "mobile", "basicSalary"]
            : ["userName", "email", "password", "designation", "gender", "mobile", "basicSalary"];

        const missingFields = requiredFields.filter(field => !formData[field]);

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
                const response = await axiosInstance.post("/admin/add-employee", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                setSubmittedCredentials({
                    employeeId: formData.employeeId,
                    email: formData.email,
                    password: formData.password,
                });
                setShowCredentials(true);
            }

            handleClose();
            fetchEmployees();
            alert("Successfully submitted!");

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
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} flexWrap="wrap">
                        <Typography variant="h6">Manage Employee</Typography>

                    </Box>
                    <Box display="flex" flexDirection="column" gap={2} mb={2} alignItems={{ xs: "flex-start", lg: "flex-end" }} >
                        <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ width: "fit-content" }}>
                            ADD EMPLOYEE
                        </Button>
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
                                    {/* <TableCell sx={{ color: "#fff" }}>MONTHLY SALARY</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>DATE OF BIRTH</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>ADDRESS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>GENDER</TableCell> */}
                                    {/* <TableCell sx={{ color: "#fff" }}>MOBILE NO.</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>EMERGENCY CONTACT NO.</TableCell> */}
                                    <TableCell sx={{ color: "#fff", textAlign: "center" }}>ACTION</TableCell>
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
                                            <TableCell>{emp.dateOfJoining ? new Date(emp.dateOfJoining).toLocaleDateString('en-GB') : "N/A"}</TableCell>
                                            <TableCell>{emp.designation}</TableCell>
                                            {/* <TableCell>{emp.monthlySalary}</TableCell>
                                            <TableCell>{emp.dateOfBirth ? new Date(emp.dateOfBirth).toLocaleDateString() : "N/A"}</TableCell>
                                            <TableCell>{emp.address || "N/A"}</TableCell>
                                            <TableCell>{emp.gender}</TableCell> */}
                                            {/* <TableCell>{emp.mobile}</TableCell>
                                            <TableCell>{emp.emergencyContact}</TableCell> */}

                                            <TableCell>
                                                <Box display="flex" gap={1}>
                                                    <Button variant="outlined" color="info" size="small" onClick={() => handleView(emp)}>View</Button>
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
                            <TextField margin="dense" label="Monthly Salary" fullWidth name="basicSalary" value={formData.basicSalary} onChange={handleChange} />
                            <TextField margin="dense" label="Probation Period (in Months)" fullWidth name="probationPeriodMonths" value={formData.probationPeriodMonths} onChange={handleChange} />
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
                            <Button onClick={handleSubmit} variant="contained" color="primary">{editingEmployee ? "Update" : "Add"}</Button>

                        </DialogActions>
                    </Dialog>


                    <Dialog open={showCredentials} onClose={() => setShowCredentials(false)}>
                        <DialogTitle>Employee Created Successfully</DialogTitle>
                        <DialogContent>
                            <p><strong>Employee ID:</strong> {submittedCredentials.employeeId}</p>
                            <p><strong>Email:</strong> {submittedCredentials.email}</p>
                            <p><strong>Password:</strong> {submittedCredentials.password}</p>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setShowCredentials(false)} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openViewModal} onClose={handleCloseView} fullWidth maxWidth="md">
                        <DialogTitle>Employee Details</DialogTitle>
                        <DialogContent dividers>
                            {selectedEmployee && (
                                <Box display="flex" flexDirection="column" gap={2}>
                                    <Typography><strong>Employee ID:</strong> {selectedEmployee.employeeId}</Typography>
                                    <Typography><strong>Name:</strong> {selectedEmployee.userName}</Typography>
                                    <Typography><strong>Email:</strong> {selectedEmployee.email}</Typography>
                                    <Typography><strong>Date of Joining:</strong> {selectedEmployee.dateOfJoining ? new Date(selectedEmployee.dateOfJoining).toLocaleDateString('en-GB') : "N/A"}</Typography>
                                    <Typography><strong>Designation:</strong> {selectedEmployee.designation}</Typography>
                                    <Typography><strong>Monthly Salary:</strong> ₹{selectedEmployee.basicSalary}</Typography>
                                    <Typography><strong>Probation Period (in Months):</strong> {selectedEmployee.probationPeriodMonths || "NA"}</Typography>
                                    <Typography><strong>Date of Birth:</strong> {selectedEmployee.dateOfBirth ? new Date(selectedEmployee.dateOfBirth).toLocaleDateString('en-GB') : "N/A"}</Typography>
                                    <Typography><strong>Last Working Day:</strong>{" "} {selectedEmployee?.lastWorkingDay ? new Date(selectedEmployee.lastWorkingDay).toLocaleDateString('en-GB') : "N/A"}</Typography>
                                    <Typography><strong>Address:</strong> {selectedEmployee.address || "N/A"}</Typography>
                                    <Typography><strong>Gender:</strong> {selectedEmployee.gender}</Typography>
                                    <Typography><strong>Mobile No:</strong> {selectedEmployee.mobile}</Typography>
                                    <Typography><strong>Emergency Contact:</strong> {selectedEmployee.emergencyContact}</Typography>
                                    {/* Add more fields if needed */}
                                </Box>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseView} variant="contained" color="primary">Close</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
        </Box>
    );
};

export default Employee;
