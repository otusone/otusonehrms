import React from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid
} from "@mui/material";
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
    handleSearch = () => {},
    handleApprove = () => {},
    handleReject = () => {},
    handleChange = () => {},
    handleClick = () => {},
    handleEdit = () => {},
    handleDelete = () => {}
}) => {
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

                    {/* Billed By Section */}
                    <Grid container spacing={2} mb={3}>
                        <Grid item xs={12}>
                            <Typography variant="h5" fontSize={20} fontWeight={500}>
                                {heading}
                                <span style={{ fontSize: 15, color: "#617183", paddingInline: 5 }}>
                                    (Your Details)
                                </span>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h5" fontSize={18} fontWeight={500}>
                                Business details
                            </Typography>
                            {/* <CommonButton name={"Add New Client"} onClick={handleClick} /> */}
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

                    {/* Rest of your component remains the same... */}
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
        </Box>
    );
};

export default Invoice;