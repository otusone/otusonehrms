import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from '../../utils/baseurl';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
    Box, Typography, TextField, TableContainer, Table, Button,
    TableHead, TableRow, TableCell, TableBody, Paper, Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import Sidebar from "../userSidebar/sidebar";
import Heading from "../userHeading/heading";

const UserSalary = () => {
    const [salarySlips, setSalarySlips] = useState([]);
    const [filteredSlips, setFilteredSlips] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSlip, setSelectedSlip] = useState(null);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [probationPeriodMonths, setProbationPeriodMonths] = useState(0);


    const handleView = async (slip) => {
        setSelectedSlip(slip);
        setOpenViewModal(true);

        try {
            const token = localStorage.getItem("authToken");
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            const response = await axiosInstance.get(`/user/get-employees/${slip.userId._id}`, config);
            const months = Number(response.data?.employee?.probationPeriodMonths || 0);
            setProbationPeriodMonths(months);
        } catch (error) {
            console.error("Error fetching probation period:", error);
            setProbationPeriodMonths(0);
        }
    };

    const handleCloseView = () => {
        setOpenViewModal(false);
        setSelectedSlip(null);
    };


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

    const imageToBase64 = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = url;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL("image/png"));
            };
            img.onerror = reject;
        });
    }


    const handleDownloadSlip = async (slip) => {
        const doc = new jsPDF();

        const netPay = Math.floor(Number(slip.netSalary));
        const netPayFormatted = Number(slip.netSalary).toFixed(2);
        const logoUrl = "/logo.png";
        const logoBase64 = await imageToBase64(logoUrl);


        doc.addImage(logoBase64, "PNG", (doc.internal.pageSize.getWidth() - 40) / 15, 10, 40, 25);
        doc.setFont("times", "normal");
        doc.setFontSize(16);
        doc.text("OTUSONE LLP", doc.internal.pageSize.getWidth() / 2, 35, { align: "center" });
        doc.setFontSize(11);
        doc.text("H-112, Sector 63, Noida, Uttar Pradesh-201301", doc.internal.pageSize.getWidth() / 2, 42, { align: "center" });
        doc.setFontSize(13);
        doc.text(`Payslip for the Month of ${slip.month}`, doc.internal.pageSize.getWidth() / 2, 52, { align: "center" });



        autoTable(doc, {
            startY: 60,
            body: [
                ["Employee Name", slip.userName || "-"],
                ["Employee Email", slip.email || "-"],
                ["Employee Id.", slip.employeeId || "-"],
                ["Designation", slip.designation || "-"],
                ["Date of Joining (YYYY-MM-DD)", slip.dateOfJoining.substring(0, 10) || "-"],
                ["Pay Month", `${slip.month} | Paid Days: ${slip.paidDays} | LOP Days: ${slip.lopDays}`],
                ["Pay Date", slip.payDate || "-"],
            ],
            font: "times",
            theme: "grid",
            styles: {
                halign: "left",
                fillColor: false,
                textColor: [50, 50, 50],
                lineColor: [80, 80, 80],
                lineWidth: 0.1
            },
            headStyles: {
                fillColor: [88, 2, 75],
                textColor: [255, 255, 255],
                halign: "center",
                fontStyle: "bold",
            },
            didParseCell: (data) => {
                if (data.section !== 'head') {
                    data.cell.styles.fillColor = false;
                }
            },
            didDrawPage: () => {
                doc.setGState(new doc.GState({ opacity: 0.04 }));
                doc.addImage(
                    logoBase64,
                    "PNG",
                    (doc.internal.pageSize.getWidth() - 150) / 2,
                    (doc.internal.pageSize.getHeight() - 100) / 2,
                    150,
                    100
                );
                doc.setGState(new doc.GState({ opacity: 1 }));
            },
        });


        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [["EARNINGS", "AMOUNT", "DEDUCTIONS", "AMOUNT"]],
            body: [
                ["Monthly Salary", "Rs. " + slip.basicSalary, "PF", "Rs. " + slip.pf],
                ["Allowances", "Rs. " + slip.allowances, "TDS", "Rs. " + slip.tds],
                ["Other Benefits", "Rs. " + slip.otherBenefits, "Other Deduction", "Rs. " + slip.otherDeductions],
                ["Gross Earnings", "Rs. " + slip.grossEarnings, "Total Deductions", "Rs. " + slip.totalDeductions],
            ],
            font: "times",
            theme: "grid",
            styles: {
                halign: "left",
                fillColor: false,
                textColor: [50, 50, 50],
                lineColor: [80, 80, 80],
                lineWidth: 0.1
            },
            headStyles: {
                fillColor: false,
                textColor: [88, 2, 75],
                halign: "center",
                fontStyle: "bold",
                lineWidth: 0.1,
                lineColor: [88, 2, 75],
            },
            didParseCell: (data) => {
                if (data.section !== 'head') {
                    data.cell.styles.fillColor = false;
                }
            },
            didDrawPage: () => {
                doc.setGState(new doc.GState({ opacity: 0.04 }));
                doc.addImage(
                    logoBase64,
                    "PNG",
                    (doc.internal.pageSize.getWidth() - 150) / 2,
                    (doc.internal.pageSize.getHeight() - 100) / 2,
                    150,
                    100
                );
                doc.setGState(new doc.GState({ opacity: 1 }));
            },
        });


        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [["REIMBURSEMENTS", "AMOUNT"]],
            body: [
                ["Reimbursement 1", "Rs. " + slip.reimbursement1],
                ["Reimbursement 2", "Rs. " + slip.reimbursement2],
                ["Total Reimbursements", "Rs. " + slip.totalReimbursements],
            ],
            font: "times",
            theme: "grid",
            styles: {
                halign: "left",
                fillColor: false,
                textColor: [50, 50, 50],
                lineColor: [80, 80, 80],
                lineWidth: 0.1
            },
            headStyles: {
                fillColor: false,
                textColor: [88, 2, 75],
                halign: "center",
                fontStyle: "bold",
                lineWidth: 0.1,
                lineColor: [88, 2, 75],
            },
            didParseCell: (data) => {
                if (data.section !== 'head') {
                    data.cell.styles.fillColor = false;
                }
            },
            didDrawPage: () => {
                doc.setGState(new doc.GState({ opacity: 0.04 }));
                doc.addImage(
                    logoBase64,
                    "PNG",
                    (doc.internal.pageSize.getWidth() - 150) / 2,
                    (doc.internal.pageSize.getHeight() - 100) / 2,
                    150,
                    100
                );
                doc.setGState(new doc.GState({ opacity: 1 }));
            },
        });



        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [["NET PAYABLE", "AMOUNT"]],
            body: [
                ["Total Net Payable", "Rs. " + netPayFormatted + ` (${convertToWords(netPay)} only)`],
            ],
            font: "times",
            theme: "grid",
            styles: {
                halign: "left",
                fontStyle: "bold",
                fillColor: false,
                textColor: [80, 80, 80],
                lineColor: [80, 80, 80],
                lineWidth: 0.1
            },
            headStyles: {
                fillColor: false,
                textColor: [88, 2, 75],
                halign: "center",
                fontStyle: "bold",
                lineWidth: 0.1,
                lineColor: [88, 2, 75],
            },
            didParseCell: (data) => {
                if (data.section !== 'head') {
                    data.cell.styles.fillColor = false;
                }
            },
            didDrawPage: () => {
                doc.setGState(new doc.GState({ opacity: 0.04 }));
                doc.addImage(
                    logoBase64,
                    "PNG",
                    (doc.internal.pageSize.getWidth() - 150) / 2,
                    (doc.internal.pageSize.getHeight() - 100) / 2,
                    150,
                    100
                );
                doc.setGState(new doc.GState({ opacity: 1 }));
            },
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
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} >
                        <Typography variant="h6" mb={2}>My Salary Details</Typography>
                    </Box>
                    <Box display="flex"
                        flexDirection="column"
                        gap={2}
                        mb={2}
                        alignItems={{ xs: "flex-start", lg: "flex-end" }}>
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
                            <TableHead sx={{ bgcolor: "#58024B" }}>
                                <TableRow>
                                    <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>S. NO.</TableCell>
                                    <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>MONTH</TableCell>
                                    <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>PAID DAYS</TableCell>
                                    <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>MONTHLY SALARY</TableCell>
                                    {/* <TableCell sx={{ color: "#fff" }}>ALLOWANCES</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>OTHER BENEFITS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>GROSS EARNINGS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>PF</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>TDS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>OTHER DEDUCTIONS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>TOTAL DEDUCTIONS</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>REIMBURSEMENTS 1</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>REIMBURSEMENTS 2</TableCell> */}
                                    <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>NET SALARY</TableCell>
                                    <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>VIEW</TableCell>
                                    <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>DOWNLOAD</TableCell>

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
                                            {/* <TableCell>{slip.allowances}</TableCell>
                                            <TableCell>{slip.otherBenefits}</TableCell>
                                            <TableCell>{slip.grossEarnings}</TableCell>
                                            <TableCell>{slip.pf}</TableCell>
                                            <TableCell>{slip.tds}</TableCell>
                                            <TableCell>{slip.otherDeductions}</TableCell>
                                            <TableCell>{slip.totalDeductions}</TableCell>
                                            <TableCell>{slip.reimbursement1}</TableCell>
                                            <TableCell>{slip.reimbursement2}</TableCell> */}
                                            <TableCell>{slip.netSalary}</TableCell>
                                            <TableCell>
                                                <Box display="flex" gap={1}>
                                                    <Button
                                                        variant="outlined"
                                                        color="info"
                                                        size="small"
                                                        onClick={() => handleView(slip)}
                                                    >
                                                        View
                                                    </Button>
                                                </Box>
                                            </TableCell>
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

            <Dialog open={openViewModal} onClose={handleCloseView} fullWidth maxWidth="md">
                <DialogTitle>Salary Slip Details</DialogTitle>
                <DialogContent dividers>
                    {selectedSlip && (
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Typography><strong>Employee ID:</strong> {selectedSlip.userId?.employeeId}</Typography>
                            <Typography><strong>Name:</strong> {selectedSlip.userId?.userName}</Typography>
                            <Typography><strong>Email:</strong> {selectedSlip.userId?.email}</Typography>
                            <Typography><strong>Month:</strong> {selectedSlip.month}</Typography>
                            <Typography><strong>Pay Date:</strong> {selectedSlip.payDate?.substring(0, 10)}</Typography>
                            <Typography><strong>Designation:</strong> {selectedSlip.userId?.designation}</Typography>
                            <Typography><strong>Date of Joining:</strong> {selectedSlip.userId?.dateOfJoining?.substring(0, 10)}</Typography>
                            <Typography><strong>Last Working Day:</strong> {selectedSlip.lastWorkingDay?.substring(0, 10) || "NA"}</Typography>
                            <Typography><strong>Probation Period:</strong> {probationPeriodMonths || "NA"}</Typography>
                            <Typography><strong>Monthly Salary:</strong> ₹{selectedSlip.basicSalary}</Typography>
                            <Typography><strong>Allowances:</strong> ₹{selectedSlip.allowances}</Typography>
                            <Typography><strong>Paid Days:</strong> {selectedSlip.paidDays}</Typography>
                            <Typography><strong>LOP Days:</strong> {selectedSlip.lopDays}</Typography>
                            <Typography><strong>Other Benefits:</strong> ₹{selectedSlip.otherBenefits}</Typography>
                            <Typography><strong>Gross Earnings:</strong> ₹{selectedSlip.grossEarnings}</Typography>
                            <Typography><strong>PF:</strong> ₹{selectedSlip.pf}</Typography>
                            <Typography><strong>TDS:</strong> ₹{selectedSlip.tds}</Typography>
                            <Typography><strong>Other Deductions:</strong> ₹{selectedSlip.otherDeductions}</Typography>
                            <Typography><strong>Total Deductions:</strong> ₹{selectedSlip.totalDeductions}</Typography>
                            <Typography><strong>Reimbursement 1:</strong> ₹{selectedSlip.reimbursement1}</Typography>
                            <Typography><strong>Reimbursement 2:</strong> ₹{selectedSlip.reimbursement2}</Typography>
                            <Typography><strong>Total Reimbursements:</strong> ₹{selectedSlip.totalReimbursements}</Typography>
                            <Typography><strong>Net Salary:</strong> ₹{selectedSlip.netSalary}</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseView} variant="contained" color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
};

export default UserSalary;
