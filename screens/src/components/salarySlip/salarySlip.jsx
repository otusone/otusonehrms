import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  MenuItem
} from "@mui/material";
import Sidebar from "../sidebar/sidebar";
import Heading from "../headingProfile/heading";

const SalarySlip = () => {
  const [slips, setSlips] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [formData, setFormData] = useState({
    userId: "",
    month: "",
    employeeRef: "",
    designation: "",
    dateOfJoining: "",
    payDate: "",
    paidDays: "",
    lopDays: "",
    basicSalary: "",
    hra: "",
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

  const [users, setUsers] = useState([]);

  const fetchAllSlips = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("http://localhost:8000/api/v1/admin/get-salary-slip", {
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
      const res = await axios.get("http://localhost:8000/api/v1/admin/get-employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.employees || []);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const payload = {
        ...formData,
        basicSalary: Number(formData.basicSalary),
        hra: Number(formData.hra),
        allowances: Number(formData.allowances),
        otherBenefits: Number(formData.otherBenefits),
        grossEarnings: Number(formData.grossEarnings),
        pf: Number(formData.pf),
        tds: Number(formData.tds),
        otherDeductions: Number(formData.otherDeductions),
        totalDeductions: Number(formData.totalDeductions),
        reimbursement1: Number(formData.reimbursement1),
        reimbursement2: Number(formData.reimbursement2),
        totalReimbursements: Number(formData.totalReimbursements),
        netSalary: Number(formData.netSalary),
        paidDays: Number(formData.paidDays),
        lopDays: Number(formData.lopDays),
      };

      await axios.post("http://localhost:8000/api/v1/admin/salary-slip", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFormData({
        userId: "",
        month: "",
        employeeRef: "",
        designation: "",
        dateOfJoining: "",
        payDate: "",
        paidDays: "",
        lopDays: "",
        basicSalary: "",
        hra: "",
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
    } catch (err) {
      console.error("Failed to generate slip", err);
    }
  };


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    fetchAllSlips();
    fetchUsers();
  }, []);

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
          <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2, alignItems: "center", mb: 2 }}>
            <Typography variant="h6" mb={2}>Salary Slip Management</Typography>
            <Button variant="outlined" onClick={() => setOpenModal(true)}>
              Generate Salary Slip
            </Button>
          </Box>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <TextField
              label="Filter by Name or Email"
              variant="outlined"
              size="small"
              sx={{ width: "250px" }}
              onChange={(e) => setFilterText(e.target.value.toLowerCase())}
            />
          </Box>

          {/* Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: "#56005b" }}>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }}>Employee</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Email</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Month</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Basic</TableCell>
                  <TableCell sx={{ color: "#fff" }}>HRA</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Allowances</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Deductions</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Net Salary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSlips.map((s) => (
                  <TableRow key={s._id}>
                    <TableCell>{s.userId?.userName || "-"}</TableCell>
                    <TableCell>{s.userId?.email || "-"}</TableCell>
                    <TableCell>{s.month}</TableCell>
                    <TableCell>{s.basicSalary}</TableCell>
                    <TableCell>{s.hra}</TableCell>
                    <TableCell>{s.allowances}</TableCell>
                    <TableCell>{s.deductions}</TableCell>
                    <TableCell>{s.netSalary}</TableCell>
                  </TableRow>
                ))}
                {filteredSlips.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center">No salary slips found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
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

          {/* Scrollable content */}
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
            {/* Place all TextFields here */}
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
                  {u.userName || u.email}
                </MenuItem>
              ))}
            </TextField>


            <TextField fullWidth label="Month" name="month" value={formData.month} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="Basic Salary" name="basicSalary" type="number" value={formData.basicSalary} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="HRA" name="hra" type="number" value={formData.hra} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="Allowances" name="allowances" type="number" value={formData.allowances} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="Deductions" name="deductions" type="number" value={formData.deductions} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="Employee Ref." name="employeeRef" value={formData.employeeRef} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="Designation" name="designation" value={formData.designation} onChange={handleChange} margin="normal" required size="small" />
            <TextField fullWidth label="Date of Joining" name="dateOfJoining" type="date" value={formData.dateOfJoining} onChange={handleChange} margin="normal" required size="small" InputLabelProps={{ shrink: true }} />
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

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

    </Box>
  );
};

export default SalarySlip;
