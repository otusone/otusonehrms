import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/baseurl";
import {
  Box,
  Modal,
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
  Snackbar,
  Alert,
} from "@mui/material";
import Sidebar from "../sidebar/sidebar";
import Heading from "../headingProfile/heading";




const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    date: "",
    clockIn: "",
    latitude: "",
    longitude: "",
  });
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");


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
      filter === "all" ? true : isToday(a.clockIn || a.clockOut);

    return matchesSearch && matchesFilter;
  });

  const handleOpenModal = () => {
    const now = new Date();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            userId: "",
            date: now.toISOString().slice(0, 10),
            clockIn: now.toTimeString().slice(0, 5),
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          setFormData({
            userId: "",
            date: now.toISOString().slice(0, 10),
            clockIn: now.toTimeString().slice(0, 5),
            latitude: "",
            longitude: "",
          });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setFormData({
        userId: "",
        date: now.toISOString().slice(0, 10),
        clockIn: now.toTimeString().slice(0, 5),
        latitude: "",
        longitude: "",
      });
    }

    setOpenModal(true);
  };


  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.post(
        "/admin/clockinattendance",
        {
          ...formData,
          clockInLocation: {
            latitude: formData.latitude,
            longitude: formData.longitude,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMsg(response.data.message);
      setErrorMsg("");
      handleCloseModal();
      fetchAttendance();
    } catch (err) {
      console.error("Error marking attendance", err);
      const msg =
        err.response?.data?.message || "Failed to mark attendance. Please try again.";
      setErrorMsg(msg);
      setSuccessMsg("");
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axiosInstance.get("/admin/get-employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.employees)
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


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
              mb={1}
            >
              {/* <Typography variant="h6">Attendance Records</Typography> */}
              <Typography variant="h6">Attendance Records</Typography>


            </Box>

            <Box
              display="flex"
              flexDirection="column"
              alignItems={{ xs: "flex-start", lg: "flex-end" }}
              gap={2}
              mb={2}
            >
              <Box
                display="flex"
                gap={1.5}
                flexWrap="wrap"
                justifyContent="flex-start"
              >
                <Box sx={{ flex: { xs: "1 1 48%", sm: "0 0 auto" } }}>
                  <Button
                    variant={filter === "all" ? "contained" : "outlined"}
                    onClick={() => setFilter("all")}
                    size="small"
                    fullWidth
                    sx={{
                      width: "100%",
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Box component="span" display={{ xs: "none", sm: "inline" }}>
                      All Attendance
                    </Box>
                    <Box component="span" display={{ xs: "inline", sm: "none" }}>
                      All
                    </Box>
                  </Button>
                </Box>

                <Box
                  sx={{
                    flex: { xs: "1 1 48%", sm: "0 0 auto" },
                  }}
                >
                  <Button
                    variant={filter === "today" ? "contained" : "outlined"}
                    onClick={() => setFilter("today")}
                    size="small"
                    sx={{
                      width: "100%",
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Box component="span" display={{ xs: "none", sm: "inline" }}>
                      Today Only
                    </Box>
                    <Box component="span" display={{ xs: "inline", sm: "none" }}>
                      Today
                    </Box>
                  </Button>
                </Box>
              </Box>

              <TextField
                placeholder="Search By Name..."
                size="small"
                value={searchTerm}
                onChange={handleSearch}
                sx={{
                  width: { sm: "270px", md: "270px" },
                }}
              />

              <Button
                variant="contained"
                sx={{ bgcolor: "#58024B", mb: 2 }}
                onClick={handleOpenModal}
              >
                Mark Attendance
              </Button>

            </Box>

          </Box>


          <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: "#58024B" }}>
                <TableRow>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>S. NO.</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>EMPLOYEE Name</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>EMAIL</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>DATE</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>CLOCK IN</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>
                    CLOCK IN LOCATION
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>CLOCK OUT</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>
                    CLOCK OUT LOCATION
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>WORKING HOURS</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>STATUS</TableCell>

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
                        {a.date
                          ? new Date(a.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                          })
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {a.clockIn
                          ? new Date(a.clockIn.replace("Z", "")).toLocaleString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                          })
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {a.clockInLocation
                          ? `Lat: ${a.clockInLocation.latitude}, Lng: ${a.clockInLocation.longitude}`
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {a.clockOut
                          ? new Date(a.clockOut.replace("Z", "")).toLocaleString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                          })
                          : "-"}
                      </TableCell>

                      <TableCell>
                        {a.clockOutLocation
                          ? `Lat: ${a.clockOutLocation.latitude}, Lng: ${a.clockOutLocation.longitude}`
                          : "N/A"}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{a.workingHours || 0}</TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap", color: a.attendanceType === "Half Day" ? "orange" : a.attendanceType === "Full Day" ? "green" : "gray", fontWeight: "bold", }}>
                        {a.attendanceType || "-"}
                      </TableCell>
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
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Mark Attendance
          </Typography>
          {/* {errorMsg && (
            <Typography variant="body2" color="error" mb={2}>
              {errorMsg}
            </Typography>
          )}

          {successMsg && (
            <Typography variant="body2" color="primary" mb={2}>
              {successMsg}
            </Typography>
          )} */}


          <Box component="form" noValidate autoComplete="off">
            <TextField
              select
              fullWidth
              label="Select Employee"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              SelectProps={{ native: true }}
              margin="normal"
              InputLabelProps={{ shrink: true }}

            >
              <option value="">-- Select Employee --</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.email}
                </option>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              margin="normal"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth
              label="Clock In Time"
              type="time"
              name="clockIn"
              value={formData.clockIn}
              margin="normal"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
            />

            <TextField
              fullWidth
              label="Latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              margin="normal"
            />

            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="outlined"
                onClick={handleCloseModal}
                sx={{ color: "#58024B", borderColor: "#58024B" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ bgcolor: "#58024B", "&:hover": { bgcolor: "#7a007f" } }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={!!errorMsg}
        autoHideDuration={6000}
        onClose={() => setErrorMsg("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setErrorMsg("")} severity="error" sx={{ width: "100%" }}>
          {errorMsg}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!successMsg}
        autoHideDuration={6000}
        onClose={() => setSuccessMsg("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSuccessMsg("")} severity="success" sx={{ width: "100%" }}>
          {successMsg}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default Attendance;
