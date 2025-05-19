import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/baseurl";
import {
  Box,
  Typography,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";
import Sidebar from "../sidebar/sidebar";
import Heading from "../headingProfile/heading";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // "all" or "today"

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axiosInstance.get("/admin/get-attendance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const attendanceArray = res.data?.data || [];
      const enrichedAttendance = attendanceArray.map((item) => ({
        ...item,
        userDetails: item.userId,
      }));

      setAttendance(enrichedAttendance);
    } catch (err) {
      console.error("Failed to fetch attendance", err);
      setAttendance([]);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const isToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const filteredAttendance = attendance.filter((a) => {
    const matchesSearch = (a.userDetails?.userName || "")
      .toLowerCase()
      .includes(searchTerm);

    const matchesFilter =
      filter === "all" ? true : isToday(a.clockIn || a.clockOut || a.date);

    return matchesSearch && matchesFilter;
  });

  return (
    <Box display="flex" minHeight="100vh">
      <Box
        sx={{
          width: { xs: "100%", md: "18%" },
          borderRight: "1px solid #eee",
          bgcolor: "#fff",
        }}
      >
        <Sidebar />
      </Box>

      <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
        <Heading />
        <Box px={4} py={2}>
          <Box mb={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">Attendance Records</Typography>
              <Box
                display="flex"
                gap={1.5}
                flexWrap="wrap"
                justifyContent="flex-start"
              >
                <Button
                  variant={filter === "all" ? "contained" : "outlined"}
                  onClick={() => setFilter("all")}
                  size="small"
                  fullWidth
                  sx={{
                    fontSize: { xs: "0.7rem", sm: "0.875rem" },
                    flex: { xs: "1 1 48%", sm: "0 0 auto" },
                  }}
                >
                  All Attendance
                </Button>

                <Button
                  variant={filter === "today" ? "contained" : "outlined"}
                  onClick={() => setFilter("today")}
                  size="small"
                  fullWidth
                  sx={{
                    fontSize: { xs: "0.7rem", sm: "0.875rem" },
                    flex: { xs: "1 1 48%", sm: "0 0 auto" },
                  }}
                >
                  Today Only
                </Button>
              </Box>

            </Box>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <TextField
                placeholder="Search..."
                size="small"
                value={searchTerm}
                onChange={handleSearch}
                sx={{ width: "250px" }}
              />
            </Box>
          </Box>


          <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: "#58024B" }}>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }}>S. NO.</TableCell>
                  <TableCell sx={{ color: "#fff" }}>EMPLOYEE Name</TableCell>
                  <TableCell sx={{ color: "#fff" }}>EMAIL</TableCell>
                  <TableCell sx={{ color: "#fff" }}>CLOCK IN</TableCell>
                  <TableCell sx={{ color: "#fff" }}>CLOCK OUT</TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    CLOCK IN LOCATION
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    CLOCK OUT LOCATION
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>WORKING HOURS</TableCell>
                  <TableCell sx={{ color: "#fff" }}>DATE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAttendance.length > 0 ? (
                  filteredAttendance.map((a, index) => (
                    <TableRow key={a._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{a.userDetails?.userName}</TableCell>
                      <TableCell>{a.userDetails?.email || "N/A"}</TableCell>
                      <TableCell>
                        {a.clockIn
                          ? new Date(a.clockIn).toLocaleString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {a.clockOut
                          ? new Date(a.clockOut).toLocaleString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {a.clockInLocation
                          ? `${a.clockInLocation.latitude}, ${a.clockInLocation.longitude}`
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {a.clockOutLocation
                          ? `${a.clockOutLocation.latitude}, ${a.clockOutLocation.longitude}`
                          : "N/A"}
                      </TableCell>
                      <TableCell>{a.workingHours || 0}</TableCell>
                      <TableCell>{a.date}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      No attendance records found.
                    </TableCell>
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

export default Attendance;
