import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from '../../utils/baseurl';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
    Box, Typography, TextField, TableContainer, Table, Button,
    TableHead, TableRow, TableCell, TableBody, Paper
} from "@mui/material";
import Sidebar from "../userSidebar/sidebar";
import Heading from "../userHeading/heading";

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

        num = Math.floor(Number(num));
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

        const netPay = Math.floor(Number(slip.netSalary));
        const netPayFormatted = Number(slip.netSalary).toFixed(2);


        doc.setFont("times", "normal");
        doc.setFontSize(16);
        doc.text("OTUSONE LLP", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });
        doc.setFontSize(11);
        doc.text("H-112, Sector 63, Noida, Uttar Pradesh-201301", doc.internal.pageSize.getWidth() / 2, 27, { align: "center" });
        doc.setFontSize(13);
        doc.text(`Payslip for the Month of ${slip.month}`, doc.internal.pageSize.getWidth() / 2, 37, { align: "center" });



        autoTable(doc, {
            startY: 45,
            body: [
                ["Employee Name", slip.userName || "-"],
                ["Employee Email", slip.email || "-"],
                ["Employee Id.", slip.employeeId || "-"],
                ["Designation", slip.designation || "-"],
                ["Date of Joining", slip.dateOfJoining || "-"],
                ["Pay Month", `${slip.month} | Paid Days: ${slip.paidDays} | LOP Days: ${slip.lopDays}`],
                ["Pay Date", slip.payDate || "-"],
            ],
            theme: "grid",
            font: "times",
            styles: { halign: "left" },
        });


        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [["EARNINGS", "AMOUNT", "DEDUCTIONS", "AMOUNT"]],
            body: [
                ["Basic Salary", `₹${slip.basicSalary}`, "PF", `₹${slip.pf}`],
                ["Allowances", `₹${slip.allowances}`, "TDS", `₹${slip.tds}`],
                ["Other Benefits", `₹${slip.otherBenefits}`, "Other Deduction", `₹${slip.otherDeductions}`],
                ["Gross Earnings", `₹${slip.grossEarnings}`, "Total Deductions", `₹${slip.totalDeductions}`],
            ],
            font: "times",
            styles: { halign: "left" },
        });


        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [["REIMBURSEMENTS", "AMOUNT"]],
            body: [
                ["Reimbursement 1", `₹${slip.reimbursement1}`],
                ["Reimbursement 2", `₹${slip.reimbursement2}`],
                ["Total Reimbursements", `₹${slip.totalReimbursements}`],
            ],
            font: "times",
            styles: { halign: "left" },
        });



        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [["NET PAYABLE", "AMOUNT"]],
            body: [
                ["Total Net Payable", `₹${netPayFormatted} (${convertToWords(netPay)} only)`],
            ],
            font: "times",
            styles: { halign: "left", fontStyle: "bold" },
        });

        doc.setFont("times", "normal");
        doc.text("Aparna Singh", 14, doc.lastAutoTable.finalY + 45);
        doc.text("HR HEAD", 14, doc.lastAutoTable.finalY + 50);
        doc.text("Email: hr@otusone.com", 14, doc.lastAutoTable.finalY + 57);
        doc.text("Website: www.otusone.com", 14, doc.lastAutoTable.finalY + 62);

        doc.save(`${slip.month}-${slip.user?.name || "Employee"}-salary-slip.pdf`);


    };


    const fetchUserSalarySlips = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const userId = localStorage.getItem("userId");

            if (!userId) {
                console.error("User ID not found in localStorage");
                return;
            }

            const res = await axiosInstance.get(`/user/get-salary-slip/${userId}`, {
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
            <Box sx={{ width: { xs: "0%", md: "18%" }, borderRight: { md: "1px solid #eee" }, bgcolor: "#fff" }}>
                <Sidebar />
            </Box>
            <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
                <Heading />
                <Box px={4} py={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} >
                        <Typography variant="h6" mb={2}>My Salary Details</Typography>
                        <Box display="flex" gap={2}>
                            <TextField
                                placeholder="Search by month..."
                                size="small"
                                value={searchTerm}
                                onChange={handleSearch}
                                sx={{ width: "300px" }}
                            />
                        </Box>
                    </Box>
                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: "#58024B" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff" }}>S. NO.</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>MONTH</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>PAID DAYS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>BASIC SALARY</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>ALLOWANCES</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>OTHER BENEFITS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>GROSS EARNINGS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>PF</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>TDS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>OTHER DEDUCTIONS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>TOTAL DEDUCTIONS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>REIMBURSEMENTS 1</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>REIMBURSEMENTS 2</TableCell>
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
                                            <TableCell>{slip.paidDays}</TableCell>
                                            <TableCell>{slip.basicSalary}</TableCell>
                                            <TableCell>{slip.allowances}</TableCell>
                                            <TableCell>{slip.otherBenefits}</TableCell>
                                            <TableCell>{slip.grossEarnings}</TableCell>
                                            <TableCell>{slip.pf}</TableCell>
                                            <TableCell>{slip.tds}</TableCell>
                                            <TableCell>{slip.otherDeductions}</TableCell>
                                            <TableCell>{slip.totalDeductions}</TableCell>
                                            <TableCell>{slip.reimbursement1}</TableCell>
                                            <TableCell>{slip.reimbursement2}</TableCell>
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
