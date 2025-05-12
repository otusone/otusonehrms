import React, { useState } from "react";
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@mui/material";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import Sidebar from "../sidebar/sidebar";
import Heading from "../headingProfile/heading";

const Invoice = ({
    invoiceData = [],
    data = {
        invoiceNo: '',
        date: '',
        items: []
    },
    heading = "Invoice Details",
    handleSearch = () => { },
    handleApprove = () => { },
    handleReject = () => { },
    handleChange = () => { },
    handleClick = () => { },
    handleEdit = () => { },
    handleDelete = () => { }
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [clientData, setClientData] = useState({
        businessName: '',
        address: ''
    });
    const [selectedClient, setSelectedClient] = useState(null);

    const handleAddClient = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleClientSubmit = () => {
        setSelectedClient(clientData);
        setOpenModal(false);
    };

    const handleClientChange = (e) => {
        const { name, value } = e.target;
        setClientData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Box display="flex" minHeight="100vh">
            {/* Sidebar */}
            <Box sx={{
                width: { xs: "100%", md: "18%" },
                borderRight: { md: "1px solid #eee" },
                bgcolor: "#fff",
            }}>
                <Sidebar />
            </Box>

            {/* Main Content */}
            <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
                <Heading />

                <Box px={4} py={2}>
                    {/* Invoice Info Section */}
                    <Grid container spacing={2} mb={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" mb={1}>Invoice No*</Typography>
                            <TextField
                                fullWidth
                                placeholder='00001'
                                name='invoiceNo'
                                value={data?.invoiceNo || ''}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" mb={1}>Invoice Date *</Typography>
                            <TextField
                                fullWidth
                                type='date'
                                name='date'
                                value={data?.date || ''}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    {/* Billing and Client Cards */}
                    <Grid container spacing={2} mb={3}>
                        {/* Billed By Card */}
                        <Grid item xs={12} md={6}>
                            <Box className="billedByContainer">
                                <Typography variant='h5' fontSize={20} fontWeight={500}>
                                    Billed By
                                    <span style={{ fontSize: 15, color: "#617183", paddingInline: 5 }}>(Your Details)</span>
                                </Typography>
                                <Box className="billedCardContainer">
                                    <Box display="flex" flexDirection="column" gap={1} style={{
                                        border: "1px solid #58024B",
                                        borderRadius: "8px",
                                        padding: "16px",
                                        bgcolor: "#ffffff"
                                    }}>
                                        <Typography variant='body1' sx={{ color: "#51618A", fontSize: 15 }}>
                                            <strong>Business Name:</strong> Your Business
                                        </Typography>
                                        <Typography variant='body1' sx={{ color: "#51618A", fontSize: 15 }}>
                                            <strong>Address:</strong> Your Address
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>


                        <Grid item xs={12} md={6}>
                            <Box className="billedByContainer">
                                <Typography variant='h5' fontSize={20} fontWeight={500}>
                                    Billed To
                                    <span style={{ fontSize: 15, color: "#617183", paddingInline: 5 }}>(Client Details)</span>
                                </Typography>
                                {selectedClient ? (
                                    <Box className="billedCardContainer">
                                        <Box display="flex" justifyContent="space-between">
                                            <Typography variant='h6' fontSize={18} fontWeight={500}>Business details</Typography>
                                            <MdEdit fontSize={20} cursor="pointer" onClick={handleAddClient} />
                                        </Box>
                                        <Box sx={{
                                            border: "1px solid #58024B",
                                            borderRadius: "8px",
                                            padding: "16px",
                                            bgcolor: "#ffffff",
                                            marginTop: 2
                                        }}>
                                            <Typography sx={{ color: "#51618A", fontSize: 15, paddingBlock: 1 }}>
                                                Business Name <span style={{ color: "#000000", paddingInlineStart: 12 }}>{selectedClient?.businessName || '-'}</span>
                                            </Typography>
                                            <Typography sx={{ color: "#51618A", fontSize: 15 }}>
                                                Address <span style={{ color: "#000000", paddingInlineStart: 12 }}>{selectedClient?.address || '-'}</span>
                                            </Typography>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box className="selectClientCardContainer">
                                        <Typography textAlign="center">Select a Client/Business from list</Typography>
                                        <Typography textAlign="center" marginBlock={2}>OR</Typography>
                                        <Box display="flex" justifyContent="center">
                                            <Button
                                                variant="outlined"
                                                onClick={handleAddClient}
                                                sx={{
                                                    border: "1px solid #58024B",
                                                    color: "#58024B",
                                                    '&:hover': {
                                                        backgroundColor: "#58024B",
                                                        color: "#fff",
                                                    }
                                                }}
                                            >
                                                Add New Client
                                            </Button>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Title and Search */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap">
                        <Typography variant="h6" sx={{ mb: { xs: 1, sm: 0 } }}>
                            Invoice Items
                        </Typography>
                        <TextField
                            placeholder="Search..."
                            size="small"
                            onChange={handleSearch}
                            sx={{ width: "250px" }}
                        />
                    </Box>

                    {/* Table */}
                    <TableContainer component={Paper} sx={{ boxShadow: 2, mb: 2 }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: "#58024B" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>ITEM</TableCell>
                                    <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>QUANTITY</TableCell>
                                    <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>GST</TableCell>
                                    <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>AMOUNT</TableCell>
                                    <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.items?.length > 0 ? (
                                    data.items.map((item) => (
                                        <TableRow key={item._id || Math.random()}>
                                            <TableCell sx={{ textAlign: "center" }}>{item.item || '-'}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>{item.quantity || '-'}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>{item.gst ? `${item.gst}%` : '-'}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>{item.amount ? `Rs.${item.amount}/-` : '-'}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>
                                                <MdEdit
                                                    fontSize={20}
                                                    cursor="pointer"
                                                    onClick={() => handleEdit(item._id)}
                                                    style={{ marginRight: 10 }}
                                                />
                                                <MdDelete
                                                    fontSize={20}
                                                    cursor="pointer"
                                                    onClick={() => handleDelete(item._id)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            No items found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Add Item Button */}
                    <Box display="flex" justifyContent="center" mb={3}>
                        <Button
                            variant="outlined"
                            startIcon={<MdAdd />}
                            onClick={handleClick}
                            sx={{
                                border: "1px dashed #58024B",
                                color: "#58024B",
                                '&:hover': {
                                    backgroundColor: "#58024B",
                                    color: "#fff",
                                }
                            }}
                        >
                            Add Item
                        </Button>
                    </Box>

                    {/* Additional Options */}
                    <Grid container spacing={2} mb={4}>
                        {['Terms & Conditions', 'Notes', 'Contact Details', 'Signature'].map((option) => (
                            <Grid item xs={12} sm={6} md={3} key={option}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        color: "#58024B",
                                        borderColor: "#58024B",
                                        '&:hover': {
                                            backgroundColor: "#58024B",
                                            color: "#fff",
                                        }
                                    }}
                                >
                                    Add {option}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Save Buttons */}
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button
                            variant="outlined"
                            sx={{
                                color: "#58024B",
                                borderColor: "#58024B",
                                '&:hover': {
                                    backgroundColor: "#58024B",
                                    color: "#fff",
                                }
                            }}
                        >
                            Save as Draft
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#58024B",
                                color: "#fff",
                                '&:hover': {
                                    backgroundColor: "#450049",
                                }
                            }}
                        >
                            Save & Continue
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Add Client Modal */}
            {openModal && (
                <Box className="modalOverlay">
                    <Box className="addClientModalContainer">
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant='h5' fontSize={22} fontWeight={500}>Add New Client</Typography>
                            <span className="closeIcon" onClick={handleCloseModal}>×</span>
                        </Box>
                        <Box className="modalDivider"></Box>

                        <Box className="modalSection">
                            <Typography variant='h5' fontSize={18} fontWeight={500}>
                                Basic Information
                            </Typography>
                            <Box className="basicInfoContainer">
                                <Box className="basicInfo">
                                    <Box display="flex" justifyContent="center">
                                        <MdAdd fontSize={26} />
                                    </Box>
                                    <Typography textAlign="center" marginBlock={1} fontSize={15}>Upload Logo</Typography>
                                    <Typography textAlign="center" fontSize={14}>JPG or PNG, Dimensions 1080*1080 and file size upto 20MB</Typography>
                                </Box>
                                <Box>
                                    <TextField
                                        label="Business Name*"
                                        name="businessName"
                                        fullWidth
                                        value={clientData.businessName}
                                        onChange={handleClientChange}
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Address"
                                        name="address"
                                        fullWidth
                                        value={clientData.address}
                                        onChange={handleClientChange}
                                        margin="normal"
                                    />
                                </Box>
                            </Box>
                        </Box>

                        <Box className="modalActions">
                            <Button
                                variant="outlined"
                                onClick={handleCloseModal}
                                sx={{
                                    color: "#58024B",
                                    borderColor: "#58024B",
                                    marginRight: 2,
                                    '&:hover': {
                                        backgroundColor: "#58024B",
                                        color: "#fff",
                                    }
                                }}
                            >
                                Close
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleClientSubmit}
                                sx={{
                                    backgroundColor: "#58024B",
                                    color: "#fff",
                                    '&:hover': {
                                        backgroundColor: "#450049",
                                    }
                                }}
                            >
                                Create
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Invoice;