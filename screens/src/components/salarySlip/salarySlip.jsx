import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from '../../utils/baseurl';
import {
  Box, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, MenuItem, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Sidebar from "../sidebar/sidebar";
import Heading from "../headingProfile/heading";
import { calculatePaidAndLopDays } from "./salaySlipCalculator";



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
    payDate: "",
    paidDays: 0,
    lopDays: 0,
    basicSalary: "",
    allowances: "",
    otherBenefits: "",
    grossEarnings: "",
    pf: "",
    tds: "",
    otherDeductions: "",
    totalDeductions: "",
    reimbursement1: "",
    reimbursement2: "",
    totalReimbursements: "",
    netSalary: 0,
  });

  const [users, setUsers] = useState([]);

  const [selectedSlip, setSelectedSlip] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);

  const handleView = (slip) => {
    setSelectedSlip(slip);
    setOpenViewModal(true);
  };

  const handleCloseView = () => {
    setOpenViewModal(false);
    setSelectedSlip(null);
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
      const selectedMonthName = formData.month; // e.g., "May"
      const month = monthNames.findIndex(m => m.toLowerCase() === selectedMonthName.toLowerCase());
      const year = new Date().getFullYear();

      const { paidDays, lopDays } = await calculatePaidAndLopDays(formData.userId, year, month);

      const basicSalary = Number(formData.basicSalary);
      const allowances = Number(formData.allowances);
      const otherBenefits = Number(formData.otherBenefits);
      const pf = Number(formData.pf);
      const tds = Number(formData.tds);
      const otherDeductions = Number(formData.otherDeductions);
      const reimbursement1 = Number(formData.reimbursement1);
      const reimbursement2 = Number(formData.reimbursement2);


      const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();
      const perDaySalary = basicSalary / numberOfDaysInMonth;
      const grossEarnings = (basicSalary - perDaySalary * lopDays) + allowances + otherBenefits;
      const totalReimbursements = reimbursement1 + reimbursement2;
      const totalDeductions = pf + tds + otherDeductions;
      const netSalary = grossEarnings + totalReimbursements - totalDeductions;

      const token = localStorage.getItem("authToken");

      const payload = {
        ...formData,
        month: `${monthNames[month]} ${year}`,
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
        payDate: "",
        paidDays: "",
        lopDays: "",
        basicSalary: "",
        allowances: "",
        otherBenefits: "",
        grossEarnings: "",
        pf: "",
        tds: "",
        otherDeductions: "",
        totalDeductions: "",
        reimbursement1: "",
        reimbursement2: "",
        totalReimbursements: "",
        netSalary: "",
      });

      setOpenModal(false);
      fetchAllSlips();
      alert("Successfully submitted the form!");

    } catch (err) {
      console.error("Failed to generate slip", err);
      alert("Error in submitting the form!");
    }
  };


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    fetchAllSlips();
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchAttendanceDataAndCalculateSalary = async () => {
      const { userId, month, basicSalary, allowances, otherBenefits, pf, tds, otherDeductions, reimbursement1, reimbursement2 } = formData;

      if (!userId || !month || !basicSalary) return;

      const monthIndex = monthNames.findIndex(m => m.toLowerCase() === month.toLowerCase());
      const year = new Date().getFullYear();

      if (monthIndex === -1) return;

      try {
        const { paidDays, lopDays } = await calculatePaidAndLopDays(userId, year, monthIndex);

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

        const grossEarnings = (numBasic - perDaySalary * lopDays) + numAllowances + numOtherBenefits;
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
          <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" mb={2}>Salary Slip Management</Typography>
            <Button variant="outlined" onClick={() => setOpenModal(true)}>
              Generate Salary Slip
            </Button>
          </Box>
          <Box display="flex" justifyContent={{ xs: "flex-end", sm: "flex-end" }} mb={2}>
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
                  <TableCell sx={{ color: "#fff" }}>S. No.</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Employee ID</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Email</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Month</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Pay Date</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Designation</TableCell>
                  {/* <TableCell sx={{ color: "#fff" }}>Date of Joining</TableCell> */}
                  <TableCell sx={{ color: "#fff" }}>Basic</TableCell>
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
                  <TableCell sx={{ color: "#fff" }}>Net Salary</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Action</TableCell>


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


            <TextField fullWidth label="Month" name="month" value={formData.month} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="Basic Salary" name="basicSalary" type="number" value={formData.basicSalary} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="Allowances" name="allowances" type="number" value={formData.allowances} onChange={handleChange} margin="normal" required size="small" />
            {/* <TextField fullWidth label="Date of Joining" name="dateOfJoining" type="date" value={formData.dateOfJoining} onChange={handleChange} margin="normal" required size="small" InputLabelProps={{ shrink: true }} /> */}
            <TextField fullWidth label="Pay Date" name="payDate" type="date" value={formData.payDate} onChange={handleChange} margin="normal" required size="small" InputLabelProps={{ shrink: true }} />
            <TextField fullWidth label="Paid Days" name="paidDays" type="number" value={formData.paidDays} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="LOP Days" name="lopDays" type="number" value={formData.lopDays} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="Other Benefits" name="otherBenefits" type="number" value={formData.otherBenefits} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="Gross Earnings" name="grossEarnings" type="number" value={formData.grossEarnings} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="PF" name="pf" type="number" value={formData.pf} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="TDS" name="tds" type="number" value={formData.tds} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="Other Deductions" name="otherDeductions" type="number" value={formData.otherDeductions} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="Total Deductions" name="totalDeductions" type="number" value={formData.totalDeductions} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="Reimbursement 1" name="reimbursement1" type="number" value={formData.reimbursement1} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="Reimbursement 2" name="reimbursement2" type="number" value={formData.reimbursement2} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="Total Reimbursements" name="totalReimbursements" type="number" value={formData.totalReimbursements} onChange={handleChange} margin="normal" required size="small" />
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
              <Typography><strong>Basic:</strong> ₹{selectedSlip.basicSalary}</Typography>
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


    </Box>
  );
};

export default SalarySlip;
