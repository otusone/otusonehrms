import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from '../../utils/baseurl';
import {
    Box, Typography, Button, TextField, TableContainer, Table,
    TableHead, TableRow, TableCell, TableBody, Paper,
    Dialog, DialogTitle, DialogContent, DialogActions, MenuItem
} from "@mui/material";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "../sidebar/sidebar";
import Heading from "../headingProfile/heading";


const Asset = () => {
    const [assetsData, setAssetsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [open, setOpen] = useState(false);
    const [viewAsset, setViewAsset] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: "",
        assetName: "",
        assetType: "",
        assignedStartDate: "",
        //assignedEndDate: "",
        status: "",
        remarks: ""
    });
    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await axiosInstance.get("/admin/get-employees", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEmployees(res.data.employees);
        } catch (err) {
            console.error("Failed to fetch employees", err);
        }
    };


    const fetchAssets = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await axiosInstance.get("/admin/get-asset/", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const enrichedAssets = res.data.data.map(item => ({
                ...item,
                assignedToDetails: item.assignedTo
            }));

            setAssetsData(enrichedAssets || []);
            setFilteredAssets(enrichedAssets || []);
        } catch (err) {
            console.error("Failed to fetch assets", err);
        }
    };


    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        if (employees.length > 0) {
            fetchAssets();
        }
    }, [employees]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = assetsData.filter(item =>
            item.assignedToDetails?.userName?.toLowerCase().includes(value) ||
            item.assignedToDetails?.email?.toLowerCase().includes(value)
        );
        setFilteredAssets(filtered);
    };

    const handleOpen = () => {
        setFormData({
            employeeId: "",
            assetName: "",
            assetType: "",
            assignedStartDate: "",
            //assignedEndDate: "",
            status: "",
            remarks: ""
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleView = (asset) => {
        setViewAsset(asset);
        setViewOpen(true);
    };

    const handleEdit = (asset, employeeId) => {
        setFormData({
            employeeId: employeeId,
            assetName: asset.assetName,
            assetType: asset.assetType,
            assignedStartDate: asset.assignedStartDate.split("T")[0],
            //assignedEndDate: asset.assignedEndDate.split("T")[0],
            status: asset.status,
            remarks: asset.remarks,
            assetId: asset._id,
        });
        setOpen(true);
    };

    const handleDelete = async (assetId, userId) => {
        console.log("Deleting asset with ID:", assetId);
        console.log("User ID:", userId);

        const confirm = window.confirm("Are you sure you want to delete this asset?");
        if (!confirm) return;

        try {
            const token = localStorage.getItem("authToken");

            await axiosInstance.delete(`/admin/delete-asset/${assetId}`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { userId },
            });

            fetchAssets();
        } catch (err) {
            console.error("Failed to delete asset", err.response?.data || err.message);
        }
    };




    const handleSubmit = async () => {
        try {
            const {
                employeeId,
                assetName,
                assetType,
                assignedStartDate,
                //assignedEndDate,
                status,
                remarks,
                assetId,
            } = formData;

            const token = localStorage.getItem("authToken");

            if (!employeeId || !assetName || !assetType || !assignedStartDate || !status) {
                alert("Please fill in all required fields.");
                return;
            }

            if (assetId) {
                // Update existing asset
                await axiosInstance.patch(
                    `/admin/update-asset/${assetId}`,
                    {
                        userId: employeeId,
                        assetName,
                        assetType,
                        assignedStartDate,
                        //assignedEndDate,
                        status,
                        remarks,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
            } else {

                await axiosInstance.post(
                    "/admin/asset/",
                    {
                        assignedTo: employeeId,
                        assets: [
                            {
                                assetName,
                                assetType,
                                assignedStartDate,
                                //assignedEndDate,
                                status,
                                remarks,
                            }
                        ]
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
            }

            handleClose();
            fetchAssets();
        } catch (err) {
            console.error("Failed to save asset", err.response?.data || err.message);
        }
    };




    return (
        <Box display="flex" minHeight="100vh">
            <Box sx={{ width: { xs: "0%", md: "18%" }, borderRight: { md: "1px solid #eee" }, bgcolor: "#fff" }}>
                <Sidebar />
            </Box>
            <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
                <Heading />
                <Box px={4} py={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} flexWrap="wrap">
                        <Typography variant="h6">Manage Assets</Typography>

                    </Box>
                    <Box display="flex" flexDirection="column"
                        gap={2}
                        mb={2}
                        alignItems={{ xs: "flex-start", lg: "flex-end" }}>
                        <Button variant="outlined" color="primary" onClick={handleOpen}>ASSIGN ASSET</Button>
                        <TextField placeholder="Search..." size="small" value={searchTerm} onChange={handleSearch} sx={{ width: "250px" }} />
                    </Box>
                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: "#58024B" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff" }}>S. NO.</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>EMPLOYEE NAME</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>EMAIL</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>ASSETS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredAssets.length > 0 ? (
                                    filteredAssets.map((item, index) => (
                                        <TableRow key={item._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.assignedToDetails?.userName || "N/A"}</TableCell>
                                            <TableCell>{item.assignedToDetails?.email || "N/A"}</TableCell>
                                            <TableCell>
                                                {item.assets.map((asset, idx) => (
                                                    <Box key={asset._id} mb={1}>
                                                        <Box display="flex" alignItems="center" >
                                                            <Typography variant="body2" style={{ flex: 0.6 }}>
                                                                <strong>{idx + 1}. {asset.assetName}</strong> ({asset.assetType})
                                                            </Typography>
                                                            <Box>
                                                                <FaEye style={{ cursor: "pointer", marginRight: 10 }} onClick={() => handleView(asset)} />
                                                                <FaEdit style={{ cursor: "pointer", marginRight: 10 }} onClick={() => handleEdit(asset, item.assignedTo._id)} />
                                                                <FaTrash style={{ cursor: "pointer", color: "red" }} onClick={() => handleDelete(asset._id, item.assignedTo._id)} />
                                                            </Box>
                                                        </Box>
                                                        {/* <Typography variant="caption">
                                                            From: {new Date(asset.assignedStartDate).toLocaleDateString()} - To: {new Date(asset.assignedEndDate).toLocaleDateString()}
                                                        </Typography><br /> */}
                                                        <Typography variant="body2" style={{ flex: 0.6 }}>
                                                            Status: <strong>{asset.status}</strong>
                                                        </Typography>

                                                        <Typography variant="caption">Remarks: {asset.remarks}</Typography>
                                                    </Box>

                                                ))}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">No asset records found.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Dialog open={open} onClose={handleClose} fullWidth>
                        <DialogTitle>Assign Asset</DialogTitle>
                        <DialogContent>
                            <TextField select label="Employee" fullWidth margin="dense" name="employeeId" value={formData.employeeId} onChange={handleChange}>
                                {employees.map(emp => (
                                    <MenuItem key={emp._id} value={emp._id}>
                                        {emp.userName} ({emp.email})
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField margin="dense" label="Asset Name" fullWidth name="assetName" value={formData.assetName} onChange={handleChange} />
                            <TextField margin="dense" label="Asset Type" fullWidth name="assetType" value={formData.assetType} onChange={handleChange} />
                            <TextField margin="dense" label="Start Date" fullWidth type="date" name="assignedStartDate" InputLabelProps={{ shrink: true }} value={formData.assignedStartDate} onChange={handleChange} />
                            {/* <TextField margin="dense" label="End Date" fullWidth type="date" name="assignedEndDate" InputLabelProps={{ shrink: true }} value={formData.assignedEndDate} onChange={handleChange} /> */}
                            <TextField margin="dense" label="Status" fullWidth name="status" value={formData.status} onChange={handleChange} select>
                                <MenuItem value="Assigned">Assigned</MenuItem>
                                <MenuItem value="Returned">Returned</MenuItem>
                            </TextField>
                            <TextField margin="dense" label="Remarks" fullWidth name="remarks" value={formData.remarks} onChange={handleChange} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSubmit} variant="contained" color="primary">Assign</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={viewOpen} onClose={() => setViewOpen(false)} fullWidth>
                        <DialogTitle>Asset Details</DialogTitle>
                        <DialogContent dividers>
                            <TextField
                                label="Asset Name"
                                fullWidth
                                margin="dense"
                                value={viewAsset?.assetName || ""}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                label="Asset Type"
                                fullWidth
                                margin="dense"
                                value={viewAsset?.assetType || ""}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                label="Assigned From"
                                fullWidth
                                margin="dense"
                                value={viewAsset?.assignedStartDate ? new Date(viewAsset.assignedStartDate).toLocaleDateString() : ""}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                label="Status"
                                fullWidth
                                margin="dense"
                                value={viewAsset?.status || ""}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                label="Remarks"
                                fullWidth
                                margin="dense"
                                multiline
                                value={viewAsset?.remarks || ""}
                                InputProps={{ readOnly: true }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setViewOpen(false)} color="primary">Close</Button>
                        </DialogActions>
                    </Dialog>

                </Box>
            </Box>
        </Box>
    );
};

export default Asset;
