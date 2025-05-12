import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem
} from "@mui/material";
import Sidebar from "../sidebar/sidebar";
import Heading from "../headingProfile/heading";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const fetchStaff = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("http://localhost:8000/api/v1/admin/get-staff", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStaff(res.data.employees);
    } catch (err) {
      console.error("Failed to fetch staff", err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  };




  const filteredStaff = staff.filter((emp) =>
    emp.userName.toLowerCase().includes(searchTerm) || emp.email.toLowerCase().includes(searchTerm)
  );

  return (
    <Box display="flex" minHeight="100vh">
      <Box sx={{ width: { xs: "100%", md: "18%" }, borderRight: { md: "1px solid #eee" }, bgcolor: "#fff" }}>
        <Sidebar />
      </Box>
      <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
        <Heading />
        <Box px={4} py={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap">
            <Typography variant="h6">Staff Directory</Typography>
            {/* <Button variant="outlined" color="primary" onClick={handleOpen} sx={{ mt: { xs: 1, sm: 0 } }}>
              ADD STAFF
            </Button> */}
          </Box>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <TextField placeholder="Search..." size="small" value={searchTerm} onChange={handleSearch} sx={{ width: "250px" }} />
          </Box>
          <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: "#56005b" }}>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }}>S. NO.</TableCell>
                  <TableCell sx={{ color: "#fff" }}>NAME</TableCell>
                  <TableCell sx={{ color: "#fff" }}>EMAIL</TableCell>
                  <TableCell sx={{ color: "#fff" }}>ROLE</TableCell>
                  <TableCell sx={{ color: "#fff" }}>DOB</TableCell>
                  <TableCell sx={{ color: "#fff" }}>DESIGNATION</TableCell>
                  <TableCell sx={{ color: "#fff" }}>ADDRESS</TableCell>
                  <TableCell sx={{ color: "#fff" }}>GENDER</TableCell>
                  <TableCell sx={{ color: "#fff" }}>RELIGION</TableCell>
                  <TableCell sx={{ color: "#fff" }}>MOBILE</TableCell>


                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((emp, index) => (
                    <TableRow key={emp._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{emp.userName}</TableCell>
                      <TableCell>{emp.email}</TableCell>
                      <TableCell>{emp.role}</TableCell>
                      <TableCell>{emp.dateOfBirth ? new Date(emp.dateOfBirth).toLocaleDateString() : "N/A"}</TableCell>
                      <TableCell>{emp.designation}</TableCell>
                      <TableCell>{emp.address || "N/A"}</TableCell>
                      <TableCell>{emp.gender}</TableCell>
                      <TableCell>{emp.religion}</TableCell>
                      <TableCell>{emp.mobile}</TableCell>

                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center">No staff found.</TableCell>
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

export default Staff;
