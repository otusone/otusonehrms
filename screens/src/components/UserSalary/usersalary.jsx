import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
    Box, Typography, TextField, TableContainer, Table, Button,
    TableHead, TableRow, TableCell, TableBody, Paper
} from "@mui/material";
import Sidebar from "../userSidebar/sidebar";
import Heading from "../headingProfile/heading";

const UserSalary = () => {
    const [salarySlips, setSalarySlips] = useState([]);
    const [filteredSlips, setFilteredSlips] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    const convertToWords = (num) => {
        const a = [
            '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
            'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
            'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
        ];
        const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        if ((num = num.toString()).length > 9) return 'Overflow';
        let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{3})$/);
        if (!n) return;
        let str = '';
        str += (Number(n[1]) !== 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + ' Crore ' : '';
        str += (Number(n[2]) !== 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + ' Lakh ' : '';
        str += (Number(n[3]) !== 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + ' Thousand ' : '';
        str += (Number(n[4]) !== 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + ' ' : '';
        return str.trim();
    };


    const handleDownloadSlip = (slip) => {
        const doc = new jsPDF();

        const netPay = (
            Number(slip.basicSalary || 0) +
            Number(slip.hra || 0) +
            Number(slip.allowances || 0) -
            Number(slip.deductions || 0)
        ).toFixed(2);

        doc.setFontSize(14);
        doc.text("OTUSONE LLP", 14, 20);
        doc.setFontSize(11);
        doc.text("H-112, Sector 63, Noida, Uttar Pradesh-201301", 14, 27);

        doc.setFontSize(13);
        doc.text(`Payslip for the Month of ${slip.month}`, 14, 37);

        autoTable(doc, {
            startY: 45,
            head: [["Employee Pay Summary"]],
            body: [],
            theme: "plain"
        });

        autoTable(doc, {
            startY: 55,
            body: [
                ["Employee Name", slip.userId?.userName || "-"],
                ["Email", slip.userId?.email || "-"],
                ["Pay Month", slip.month],
                ["Basic Salary", `₹${slip.basicSalary}`],
                ["HRA", `₹${slip.hra}`],
                ["Allowances", `₹${slip.allowances}`],
                ["Deductions", `₹${slip.deductions}`],
                ["Net Salary", `₹${netPay}`],
            ],
            theme: "grid",
            styles: { halign: 'left' },
        });

        doc.text(`Total Net Payable ₹${netPay} (${convertToWords(netPay)} only)`, 14, doc.lastAutoTable.finalY + 10);

        doc.text("Aparna Singh", 14, doc.lastAutoTable.finalY + 30);
        doc.text("HR HEAD", 14, doc.lastAutoTable.finalY + 35);
        doc.text("Email: hr@otusone.com", 14, doc.lastAutoTable.finalY + 42);
        doc.text("Website: www.otusone.com", 14, doc.lastAutoTable.finalY + 47);

        doc.save(`${slip.month}-${slip.userId?.userName || "Employee"}-salary-slip.pdf`);
    };

    const fetchUserSalarySlips = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const userId = localStorage.getItem("userId");

            if (!userId) {
                console.error("User ID not found in localStorage");
                return;
            }

            const res = await axios.get(`http://localhost:8000/api/v1/user/get-salary-slip/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSalarySlips(res.data.data);
            setFilteredSlips(res.data.data);
        } catch (err) {
            console.error("Failed to fetch salary slips", err.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchUserSalarySlips();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = salarySlips.filter(slip =>
            slip.month?.toLowerCase().includes(value)
        );
        setFilteredSlips(filtered);
    };

    return (
        <Box display="flex" minHeight="100vh">
            <Box sx={{ width: { xs: "100%", md: "18%" }, borderRight: { md: "1px solid #eee" }, bgcolor: "#fff" }}>
                <Sidebar />
            </Box>
            <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
                <Heading />
                <Box px={4} py={2}>
                    <Typography variant="h6" mb={2}>My Salary Details</Typography>
                    <Box display="flex" justifyContent="flex-end" mb={2}>
                        <TextField
                            placeholder="Search by month..."
                            size="small"
                            value={searchTerm}
                            onChange={handleSearch}
                            sx={{ width: "300px" }}
                        />
                    </Box>
                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: "#56005b" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff" }}>S. NO.</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>MONTH</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>BASIC SALARY</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>HRA</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>ALLOWANCES</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>DEDUCTIONS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>NET SALARY</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>DOWNLOAD</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredSlips.length > 0 ? (
                                    filteredSlips.map((slip, index) => (
                                        <TableRow key={slip._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{slip.month}</TableCell>
                                            <TableCell>{slip.basicSalary}</TableCell>
                                            <TableCell>{slip.hra}</TableCell>
                                            <TableCell>{slip.allowances}</TableCell>
                                            <TableCell>{slip.deductions}</TableCell>
                                            <TableCell>{slip.netSalary}</TableCell>
                                            <TableCell>
                                                <Button variant="outlined" size="small" onClick={() => handleDownloadSlip(slip)}>
                                                    Download
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">No salary slips found.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
};

export default UserSalary;
