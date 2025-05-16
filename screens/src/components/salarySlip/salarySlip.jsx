import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from '../../utils/baseurl';
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
  const [formData, setFormData] = useState({
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

  const [users, setUsers] = useState([]);

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
      const token = localStorage.getItem("authToken");
      const payload = {
        ...formData,
        basicSalary: Number(formData.basicSalary),
        //hra: Number(formData.hra),
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
                  <TableCell sx={{ color: "#fff" }}>Date of Joining</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Basic</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Allowances</TableCell>
                  {/* <TableCell sx={{ color: "#fff" }}>Deductions</TableCell> */}
                  <TableCell sx={{ color: "#fff" }}>Paid Days</TableCell>
                  <TableCell sx={{ color: "#fff" }}>LOP Days</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Other Benefits</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Gross Earnings</TableCell>
                  <TableCell sx={{ color: "#fff" }}>PF</TableCell>
                  <TableCell sx={{ color: "#fff" }}>TDS</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Other Deductions</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Total Deductions</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Reimbursement 1</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Reimbursement 2</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Total Reimbursements</TableCell>
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
                    <TableCell>{s.userId?.dateOfJoining?.substring(0, 10)}</TableCell>
                    <TableCell>{s.basicSalary}</TableCell>
                    <TableCell>{s.allowances}</TableCell>
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
                    <TableCell>{s.totalReimbursements}</TableCell>
                    <TableCell>{s.netSalary}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(s._id)}
                      >
                        Delete
                      </Button>
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

    </Box>
  );
};

export default SalarySlip;
