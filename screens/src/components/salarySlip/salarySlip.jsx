import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from '../../utils/baseurl';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Box, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, MenuItem, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Sidebar from "../sidebar/sidebar";
import Heading from "../headingProfile/heading";
import { calculateSalary } from "./salaySlipCalculator";




const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const SalarySlip = () => {
  const [slips, setSlips] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    month: "",
    dateOfJoining: "",
    lastWorkingDay: null,
    payDate: "",
    paidDays: 0,
    lopDays: 0,
    basicSalary: 0,
    allowances: 0,
    otherBenefits: 0,
    grossEarnings: 0,
    pf: 0,
    tds: 0,
    otherDeductions: 0,
    totalDeductions: 0,
    reimbursement1: 0,
    reimbursement2: 0,
    totalReimbursements: 0,
    netSalary: 0,
  });

  const [users, setUsers] = useState([]);

  const [selectedSlip, setSelectedSlip] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [probationPeriodMonths, setProbationPeriodMonths] = useState(0);

  const handleEdit = (slip) => {
    setEditData(slip);
    setEditOpen(true);
  };


  const handleView = async (slip) => {
    setSelectedSlip(slip);
    setOpenViewModal(true);

    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axiosInstance.get(`/admin/get-employees/${slip.userId._id}`, config);
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

  const fetchAllSlips = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axiosInstance.get("/admin/get-salary-slip", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSlips(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch slips", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axiosInstance.get("/admin/get-employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.employees || []);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this salary slip?")) return;
    try {
      const token = localStorage.getItem("authToken");
      await axiosInstance.delete(`/admin/delete-slip/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAllSlips();
    } catch (err) {
      console.error("Failed to delete salary slip", err);
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedMonthName = formData.month;
      const month = monthNames.findIndex(m => m.toLowerCase() === selectedMonthName.toLowerCase());
      const year = new Date().getFullYear();

      const { paidDays, lopDays, finalSalary } = await calculateSalary(formData.userId, year, month, formData.basicSalary, formData.dateOfJoining, formData.lastWorkingDay || null);
      //console.log(finalSalary)
      const basicSalary = Number(formData.basicSalary);
      const allowances = Number(formData.allowances || 0);
      const otherBenefits = Number(formData.otherBenefits || 0);
      const pf = Number(formData.pf || 0);
      const tds = Number(formData.tds || 0);
      const otherDeductions = Number(formData.otherDeductions || 0);
      const reimbursement1 = Number(formData.reimbursement1 || 0);
      const reimbursement2 = Number(formData.reimbursement2 || 0);


      const grossEarnings = finalSalary + allowances + otherBenefits;
      const totalReimbursements = reimbursement1 + reimbursement2;
      const totalDeductions = pf + tds + otherDeductions;
      const netSalary = grossEarnings + totalReimbursements - totalDeductions;

      const token = localStorage.getItem("authToken");

      const payload = {
        ...formData,
        month: `${monthNames[month]} ${year}`,
        lastWorkingDay: formData.lastWorkingDay || null,
        paidDays,
        lopDays,
        basicSalary,
        allowances,
        otherBenefits,
        grossEarnings,
        pf,
        tds,
        otherDeductions,
        totalDeductions,
        reimbursement1,
        reimbursement2,
        totalReimbursements,
        netSalary,
      };

      await axiosInstance.post("/admin/salary-slip", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFormData({
        userId: "",
        month: "",
        lastWorkingDay: "",
        payDate: "",
        paidDays: 0,
        lopDays: 0,
        basicSalary: 0,
        allowances: 0,
        otherBenefits: 0,
        grossEarnings: 0,
        pf: 0,
        tds: 0,
        otherDeductions: 0,
        totalDeductions: 0,
        reimbursement1: 0,
        reimbursement2: 0,
        totalReimbursements: 0,
        netSalary: 0,
      });

      setOpenModal(false);
      fetchAllSlips();
      alert("Successfully submitted the form!");

    } catch (err) {
      console.error("Failed to generate slip", err);
      alert("Error in submitting the form!");
    }
  };

  const handleUpdateSalary = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const { _id, ...updateData } = editData;

      const res = await axiosInstance.patch(
        `/admin/update-salary-slip/${_id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Salary slip updated successfully!");
      setEditOpen(false);
      fetchAllSlips();
    } catch (err) {
      alert("Failed to update salary slip");
      console.error(err);
    }
  };


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchUserSalary = async (userId) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axiosInstance.get(`/admin/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res?.data?.basicSalary) {
        setFormData(prev => ({
          ...prev,
          basicSalary: res.data.basicSalary,
          dateOfJoining: res.data.dateOfJoining,

        }));
      }
    } catch (err) {
      console.error("Error fetching user salary:", err);
    }
  };



  useEffect(() => {
    fetchAllSlips();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (formData.userId) {
      fetchUserSalary(formData.userId);
    }
  }, [formData.userId]);


  useEffect(() => {
    const fetchAttendanceDataAndCalculateSalary = async () => {
      const { userId, month, dateOfJoining, lastWorkingDay, basicSalary, allowances, otherBenefits, pf, tds, otherDeductions, reimbursement1, reimbursement2 } = formData;

      if (!userId || !month || !basicSalary) return;

      const monthIndex = monthNames.findIndex(m => m.toLowerCase() === month.toLowerCase());
      const year = new Date().getFullYear();

      if (monthIndex === -1) return;

      try {
        const { paidDays, lopDays, finalSalary } = await calculateSalary(userId, year, monthIndex, basicSalary, dateOfJoining, lastWorkingDay || null);

        const numBasic = Number(basicSalary);
        const numAllowances = Number(allowances || 0);
        const numOtherBenefits = Number(otherBenefits || 0);
        const numPf = Number(pf || 0);
        const numTds = Number(tds || 0);
        const numOtherDeductions = Number(otherDeductions || 0);
        const numReimbursement1 = Number(reimbursement1 || 0);
        const numReimbursement2 = Number(reimbursement2 || 0);

        const numberOfDaysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const perDaySalary = numBasic / numberOfDaysInMonth;

        const grossEarnings = finalSalary + numAllowances + numOtherBenefits;
        const totalReimbursements = numReimbursement1 + numReimbursement2;
        const totalDeductions = numPf + numTds + numOtherDeductions;
        const netSalary = grossEarnings + totalReimbursements - totalDeductions;

        setFormData(prev => ({
          ...prev,
          paidDays,
          lopDays,
          grossEarnings: grossEarnings.toFixed(2),
          totalReimbursements: totalReimbursements.toFixed(2),
          totalDeductions: totalDeductions.toFixed(2),
          netSalary: netSalary.toFixed(2),
        }));
      } catch (error) {
        console.error("Error calculating salary:", error);
      }
    };

    fetchAttendanceDataAndCalculateSalary();
  }, [
    formData.userId,
    formData.month,
    formData.dateOfJoining,
    formData.lastWorkingDay,
    formData.basicSalary,
    formData.allowances,
    formData.otherBenefits,
    formData.pf,
    formData.tds,
    formData.otherDeductions,
    formData.reimbursement1,
    formData.reimbursement2,
  ]);



  const filteredSlips = slips.filter(
    (s) =>
      s.userId?.userName?.toLowerCase().includes(filterText) ||
      s.userId?.email?.toLowerCase().includes(filterText)
  );


  return (
    <Box display="flex" minHeight="100vh">
      <Box sx={{ width: { xs: "100%", md: "18%" }, bgcolor: "#fff", borderRight: "1px solid #eee" }}>
        <Sidebar />
      </Box>

      <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
        <Heading />
        <Box px={4} py={2}>
          <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", alignItems: "center", mb: 1 }}>
            <Typography variant="h6" mb={1}>Salary Slip Management</Typography>

          </Box>
          <Box display="flex" flexDirection="column"
            gap={2}
            mb={2}
            alignItems={{ xs: "flex-start", lg: "flex-end" }}>
            <Button variant="contained" onClick={() => setOpenModal(true)}>
              Generate Salary Slip
            </Button>
            <TextField
              label="Filter by Name or Email"
              variant="outlined"
              size="small"
              sx={{ width: "250px" }}
              onChange={(e) => setFilterText(e.target.value.toLowerCase())}
            />
          </Box>


          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: "#58024B" }}>
                <TableRow>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>S. No.</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>Employee ID</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>Name</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>Email</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>Month</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>Pay Date</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>Designation</TableCell>
                  {/* <TableCell sx={{ color: "#fff" }}>Date of Joining</TableCell> */}
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>Monthly Salary</TableCell>
                  {/* <TableCell sx={{ color: "#fff" }}>Allowances</TableCell> */}
                  {/* <TableCell sx={{ color: "#fff" }}>Deductions</TableCell> */}
                  {/* <TableCell sx={{ color: "#fff" }}>Paid Days</TableCell>
                  <TableCell sx={{ color: "#fff" }}>LOP Days</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Other Benefits</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Gross Earnings</TableCell>
                  <TableCell sx={{ color: "#fff" }}>PF</TableCell>
                  <TableCell sx={{ color: "#fff" }}>TDS</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Other Deductions</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Total Deductions</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Reimbursement 1</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Reimbursement 2</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Total Reimbursements</TableCell> */}
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>Net Salary</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff", textAlign: "center" }}>Action</TableCell>


                </TableRow>
              </TableHead>

              <TableBody>
                {filteredSlips.map((s, index) => (
                  <TableRow key={s._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{s.userId?.employeeId || "-"}</TableCell>
                    <TableCell>{s.userId?.userName || "-"}</TableCell>
                    <TableCell>{s.userId?.email || "-"}</TableCell>
                    <TableCell>{s.month}</TableCell>
                    <TableCell>{s.payDate?.substring(0, 10)}</TableCell>
                    <TableCell>{s.userId?.designation}</TableCell>
                    {/* <TableCell>{s.userId?.dateOfJoining?.substring(0, 10)}</TableCell> */}
                    <TableCell>{s.basicSalary}</TableCell>
                    {/* <TableCell>{s.allowances}</TableCell>
                    <TableCell>{s.paidDays}</TableCell>
                    <TableCell>{s.lopDays}</TableCell>
                    <TableCell>{s.otherBenefits}</TableCell>
                    <TableCell>{s.grossEarnings}</TableCell>
                    <TableCell>{s.pf}</TableCell>
                    <TableCell>{s.tds}</TableCell>
                    <TableCell>{s.otherDeductions}</TableCell>
                    <TableCell>{s.totalDeductions}</TableCell>
                    <TableCell>{s.reimbursement1}</TableCell>
                    <TableCell>{s.reimbursement2}</TableCell>
                    <TableCell>{s.totalReimbursements}</TableCell> */}
                    <TableCell>{s.netSalary}</TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Button
                          variant="outlined"
                          color="info"
                          size="small"
                          onClick={() => handleView(s)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outlined"
                          color="warning"
                          size="small"
                          onClick={() => handleEdit(s)}
                        >
                          Update
                        </Button>

                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDownloadSlip(s)}
                        >
                          Download
                        </Button>


                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(s._id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredSlips.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={23} align="center">No salary slips found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

        </Box>
      </Box>


      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: '90vw', sm: 500 },
            maxHeight: "90vh",
            bgcolor: "#fff",
            boxShadow: 24,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" sx={{ p: 2, borderBottom: "1px solid #ddd" }}>
            Generate Salary Slip
          </Typography>


          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              px: 3,
              py: 2,
              overflowY: "auto",
              flexGrow: 1,
            }}
          >

            <TextField
              select
              fullWidth
              label="Select Employee"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              margin="normal"
              required
              size="small"
            >
              {users.map((u) => (
                <MenuItem key={u._id} value={u._id}>
                  {u.email}
                </MenuItem>
              ))}
            </TextField>


            <TextField fullWidth select label="Month" name="month" value={formData.month} onChange={handleChange} margin="normal" required size="small">
              {monthNames.map((month, index) => (
                <MenuItem key={index} value={month}>
                  {month}
                </MenuItem>
              ))}</TextField>
            <TextField fullWidth label="Monthly Salary" name="basicSalary" type="number" value={formData.basicSalary} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="Last Working Day (Optional)" name="lastWorkingDay" type="date" value={formData.lastWorkingDay} onChange={handleChange} margin="normal" size="small" InputLabelProps={{ shrink: true }} />
            <TextField fullWidth label="Allowances" name="allowances" type="number" value={formData.allowances} onChange={handleChange} margin="normal" size="small" />
            {/* <TextField fullWidth label="Date of Joining" name="dateOfJoining" type="date" value={formData.dateOfJoining} onChange={handleChange} margin="normal" required size="small" InputLabelProps={{ shrink: true }} /> */}
            <TextField fullWidth label="Pay Date" name="payDate" type="date" value={formData.payDate} onChange={handleChange} margin="normal" required size="small" InputLabelProps={{ shrink: true }} />
            <TextField fullWidth label="Paid Days" name="paidDays" type="number" value={formData.paidDays} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="LOP Days" name="lopDays" type="number" value={formData.lopDays} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="Other Benefits" name="otherBenefits" type="number" value={formData.otherBenefits} onChange={handleChange} margin="normal" size="small" />
            <TextField fullWidth label="Gross Earnings" name="grossEarnings" type="number" value={formData.grossEarnings} onChange={handleChange} margin="normal" size="small" />
            <TextField fullWidth label="PF" name="pf" type="number" value={formData.pf} onChange={handleChange} margin="normal" size="small" />
            <TextField fullWidth label="TDS" name="tds" type="number" value={formData.tds} onChange={handleChange} margin="normal" size="small" />
            <TextField fullWidth label="Other Deductions" name="otherDeductions" type="number" value={formData.otherDeductions} onChange={handleChange} margin="normal" size="small" />
            <TextField fullWidth label="Total Deductions" name="totalDeductions" type="number" value={formData.totalDeductions} onChange={handleChange} margin="normal" size="small" />
            <TextField fullWidth label="Reimbursement 1" name="reimbursement1" type="number" value={formData.reimbursement1} onChange={handleChange} margin="normal" size="small" />
            <TextField fullWidth label="Reimbursement 2" name="reimbursement2" type="number" value={formData.reimbursement2} onChange={handleChange} margin="normal" size="small" />
            <TextField fullWidth label="Total Reimbursements" name="totalReimbursements" type="number" value={formData.totalReimbursements} onChange={handleChange} margin="normal" size="small" />
            <TextField fullWidth label="Net Salary" name="netSalary" type="number" value={formData.netSalary} onChange={handleChange} margin="normal" required size="small" />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

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
              <Typography><strong>Last Working Day:</strong> {selectedSlip.lastWorkingDay?.substring(0, 10)}</Typography>
              <Typography><strong>Probation Period:</strong> {probationPeriodMonths || "NA"} months</Typography>
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

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth>
        <DialogTitle>Update Salary Slip</DialogTitle>
        <DialogContent>
          <TextField
            label="Month"
            value={editData?.month || ''}
            onChange={(e) => setEditData({ ...editData, month: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Last Working Day"
            type="date"
            value={editData?.lastWorkingDay?.substring(0, 10) || ''}
            onChange={(e) => setEditData({ ...editData, lastWorkingDay: e.target.value })}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Pay Date"
            type="date"
            value={editData?.payDate?.substring(0, 10) || ''}
            onChange={(e) => setEditData({ ...editData, payDate: e.target.value })}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Paid Days"
            type="number"
            value={editData?.paidDays || ''}
            onChange={(e) => setEditData({ ...editData, paidDays: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="LOP Days"
            type="number"
            value={editData?.lopDays || ''}
            onChange={(e) => setEditData({ ...editData, lopDays: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Monthly Salary"
            type="number"
            value={editData?.basicSalary ?? ''}
            onChange={(e) => setEditData({ ...editData, basicSalary: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Allowances"
            type="number"
            value={editData?.allowances ?? ''}
            onChange={(e) => setEditData({ ...editData, allowances: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            fullWidth
            label="Other Benefits"
            type="number"
            value={editData?.otherBenefits ?? ''}
            onChange={(e) => setEditData({ ...editData, otherBenefits: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Gross Earnings"
            type="number"
            value={editData?.grossEarnings ?? ''}
            onChange={(e) => setEditData({ ...editData, grossEarnings: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="PF"
            type="number"
            value={editData?.pf ?? ''}
            onChange={(e) => setEditData({ ...editData, pf: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="TDS"
            type="number"
            value={editData?.tds ?? ''}
            onChange={(e) => setEditData({ ...editData, tds: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Other Deductions"
            type="number"
            value={editData?.otherDeductions ?? ''}
            onChange={(e) => setEditData({ ...editData, otherDeductions: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Total Deductions"
            type="number"
            value={editData?.totalDeductions ?? ''}
            onChange={(e) => setEditData({ ...editData, totalDeductions: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Reimbursement 1"
            type="number"
            value={editData?.reimbursement1 ?? ''}
            onChange={(e) => setEditData({ ...editData, reimbursement1: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Reimbursement 2"
            type="number"
            value={editData?.reimbursement2 ?? ''}
            onChange={(e) => setEditData({ ...editData, reimbursement2: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Total Reimbursements"
            type="number"
            value={editData?.totalReimbursements ?? ''}
            onChange={(e) => setEditData({ ...editData, totalReimbursements: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Net Salary"
            type="number"
            value={editData?.netSalary || ''}
            onChange={(e) => setEditData({ ...editData, netSalary: e.target.value })}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleUpdateSalary}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalarySlip;
