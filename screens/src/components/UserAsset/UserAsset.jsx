import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from '../../utils/baseurl';
import {
    Box, Typography, TextField, TableContainer, Table,
    TableHead, TableRow, TableCell, TableBody, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button,
} from "@mui/material";
import { FaEye } from "react-icons/fa";
import Sidebar from "../userSidebar/sidebar";
import Heading from "../userHeading/heading";



const UserAsset = () => {
    const [assets, setAssets] = useState([]);
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);


    const fetchUserAssets = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const userId = localStorage.getItem("userId");

            if (!userId) {
                console.error("User ID not found in localStorage");
                return;
            }

            const res = await axiosInstance.get(`/user/get-asset/${userId}`, {

                headers: { Authorization: `Bearer ${token}` }
            });

            const assignedToDetails = res.data.assignedTo;

            const userAssets = res.data.data.map(item => ({
                ...item,
                assignedToDetails: assignedToDetails
            }));
            setAssets(userAssets);
            setFilteredAssets(userAssets);
        } catch (err) {
            console.error("Failed to fetch user assets", err.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchUserAssets();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = assetsData.filter(item =>
            item.assetName?.toLowerCase().includes(value)
        );
        setFilteredAssets(filtered);
    };

    const handleView = (asset) => {
        setSelectedAsset(asset);
        setOpenDialog(true);
    };


    return (
        <Box display="flex" minHeight="100vh">
            <Box sx={{ width: { xs: "0%", md: "18%" }, borderRight: { md: "1px solid #eee" }, bgcolor: "#fff" }}>
                <Sidebar />
            </Box>
            <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
                <Heading />
                <Box px={4} py={2}>
                    <Typography variant="h6" mb={2}>My Assigned Assets</Typography>
                    <Box display="flex" justifyContent="flex-end" mb={2}>
                        {/* <TextField
                            placeholder="Search by name or type..."
                            size="small"
                            value={searchTerm}
                            onChange={handleSearch}
                            sx={{ width: "300px" }}
                        /> */}
                    </Box>
                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: "#58024B" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff" }}>S. NO.</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>ASSET NAME</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>TYPE</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>ASSIGNED DATE</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>STATUS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>REMARKS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredAssets.length > 0 ? (
                                    filteredAssets.map((asset, index) => (
                                        <TableRow key={asset._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{asset.assetName}</TableCell>
                                            <TableCell>{asset.assetType}</TableCell>
                                            <TableCell>
                                                {new Date(asset.assignedStartDate).toLocaleDateString('en-GB')}
                                            </TableCell>
                                            <TableCell>{asset.status}</TableCell>
                                            <TableCell>{asset.remarks}</TableCell>
                                            <TableCell>
                                                <FaEye style={{ cursor: "pointer" }} onClick={() => handleView(asset)} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">No assets found.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                        <DialogTitle>Asset Details</DialogTitle>
                        <DialogContent dividers>
                            {selectedAsset && (
                                <>
                                    <Typography><strong>Asset:</strong> {selectedAsset.assetName}</Typography>
                                    <Typography><strong>Type:</strong> {selectedAsset.assetType}</Typography>
                                    <Typography><strong>From:</strong> {new Date(selectedAsset.assignedStartDate).toLocaleDateString('en-GB')}</Typography>
                                    <Typography><strong>Status:</strong> {selectedAsset.status || "N/A"}</Typography>
                                    <Typography><strong>Remarks:</strong> {selectedAsset.remarks || "N/A"}</Typography>
                                    <Typography><strong>Assigned to:</strong> {selectedAsset.assignedToDetails?.userName || "N/A"}</Typography>
                                    <Typography><strong>Email:</strong> {selectedAsset.assignedToDetails?.email || "N/A"}</Typography>
                                </>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDialog(false)} color="primary">Close</Button>
                        </DialogActions>
                    </Dialog>

                </Box>
            </Box>
        </Box>
    );
};

export default UserAsset;
