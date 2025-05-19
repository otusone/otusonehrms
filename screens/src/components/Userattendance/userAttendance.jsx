import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from '../../utils/baseurl';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import Sidebar from "../userSidebar/sidebar";
import Heading from "../userHeading/heading";

const UserAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [clockOutModal, setClockOutModal] = useState(false);
  const [selectedAttendanceId, setSelectedAttendanceId] = useState(null);
  const [clockOutForm, setClockOutForm] = useState({
    date: new Date().toISOString().split("T")[0],
    clockOut: "",
    latitude: "",
    longitude: "",
  });


  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    clockIn: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  useEffect(() => {
    if (openModal) {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${hours}:${minutes}`;
      setFormData((prev) => ({
        ...prev,
        clockIn: currentTime,
        latitude: '',
        longitude: '',
      }));

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }));
        },
        (error) => {
          console.error("Geolocation error:", error);
          setNotification({
            open: true,
            message: "Unable to get location. Please allow location access.",
            severity: "error",
          });
        }
      );
    }
  }, [openModal]);

  const fetchAttendanceData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) return;

      const response = await axiosInstance.get(
        `/user/attendance/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const attendanceArray = response.data?.data || [];

      const enrichedAttendance = attendanceArray.map((item) => ({
        ...item,
        userDetails: item.userId,
      }));

      setAttendanceData(enrichedAttendance);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredAttendance = () => {
    return attendanceData?.filter(
      (attendance) =>
        attendance.date?.toLowerCase().includes(searchTerm)
    );
  };

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({
      date: new Date().toISOString().split("T")[0],
      clockIn: "",
      latitude: "",
      longitude: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) return;

      const requestBody = {
        date: formData.date,
        clockIn: formData.clockIn,
        clockInLocation: {
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
        },
        userId,
      };

      const response = await axiosInstance.post(
        "/user/clockinattendance",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setNotification({
          open: true,
          message: "Attendance marked successfully!",
          severity: "success",
        });
        handleCloseModal();
        fetchAttendanceData();
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      setNotification({
        open: true,
        message: "Failed to mark attendance. Please try again.",
        severity: "error",
      });
    }
  };

  const handleOpenClockOutModal = (attendanceId) => {
    setSelectedAttendanceId(attendanceId);
    setClockOutModal(true);

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    setClockOutForm((prev) => ({
      ...prev,
      clockOut: currentTime,
      latitude: '',
      longitude: '',
    }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setClockOutForm((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }));
      },
      (error) => {
        console.error("Geolocation error:", error);
        setNotification({
          open: true,
          message: "Unable to get location. Please allow location access.",
          severity: "error",
        });
      }
    );
  };

  const handleClockOutSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      if (!token || !userId || !selectedAttendanceId) return;

      const requestBody = {
        userId,
        date: clockOutForm.date,
        clockOut: clockOutForm.clockOut,
        clockOutLocation: {
          latitude: parseFloat(clockOutForm.latitude),
          longitude: parseFloat(clockOutForm.longitude),
        },
      };

      const response = await axiosInstance.patch(
        `/user/clockoutattendance/${selectedAttendanceId}`,
        requestBody,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setNotification({
          open: true,
          message: "Clock-out marked successfully!",
          severity: "success",
        });
        setClockOutModal(false);
        fetchAttendanceData();
      }
    } catch (error) {
      console.error("Clock-out error:", error);
      setNotification({
        open: true,
        message: "Failed to mark clock-out.",
        severity: "error",
      });
    }
  };


  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Box
        sx={{
          width: { xs: "0%", md: "18%" },
          borderRight: { md: "1px solid #eee" },
          bgcolor: "#fff",
        }}
      >
        <Sidebar />
      </Box>

      <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
        <Heading />

        <Box px={4} py={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            flexWrap="wrap"
            gap={2}
          >
            <Typography variant="h6">User Attendance</Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              <Button
                variant="contained"
                onClick={handleOpenModal}
                sx={{
                  bgcolor: "#58024B",
                  fontSize: { xs: "0.7rem", sm: "0.875rem" },
                  px: { xs: 1.5, sm: 2 },
                  py: { xs: 0.5, sm: 1 },
                  minWidth: "unset",
                  "&:hover": { bgcolor: "#7a007f" },
                }}
              >
                Mark Attendance
              </Button>
              <TextField
                placeholder="Search..."
                size="small"
                onChange={handleSearch}
                sx={{
                  width: { xs: "100%", sm: "250px" },
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                }}
              />
            </Box>
          </Box>

          <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: "#58024B" }}>
                <TableRow>
                  {/* <TableCell sx={{ color: "#fff" }}>EMPLOYEE NAME</TableCell>
                  <TableCell sx={{ color: "#fff" }}>EMAIL</TableCell> */}
                  <TableCell sx={{ color: "#fff" }}>DATE</TableCell>
                  <TableCell sx={{ color: "#fff" }}>CLOCK IN</TableCell>
                  <TableCell sx={{ color: "#fff" }}>CLOCK IN LOCATION</TableCell>
                  <TableCell sx={{ color: "#fff" }}>WORKING HOURS</TableCell>
                  <TableCell sx={{ color: "#fff" }}>CLOCK OUT</TableCell>
                  <TableCell sx={{ color: "#fff" }}>CLOCK OUT LOCATION</TableCell>
                  <TableCell sx={{ color: "#fff" }}>ACTION</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAttendance()?.length > 0 ? (
                  filteredAttendance().map((attendance) => (
                    <TableRow key={attendance._id}>
                      <TableCell>{attendance.date}</TableCell>
                      <TableCell>{attendance.clockIn || "-"}</TableCell>
                      <TableCell>
                        {attendance.clockInLocation
                          ? `Lat: ${attendance.clockInLocation.latitude}, Lng: ${attendance.clockInLocation.longitude}`
                          : "-"}
                      </TableCell>
                      <TableCell>{attendance.workingHours || "-"}</TableCell>
                      <TableCell>{attendance.clockOut || "-"}</TableCell>
                      <TableCell>
                        {attendance.clockOutLocation
                          ? `Lat: ${attendance.clockOutLocation.latitude}, Lng: ${attendance.clockOutLocation.longitude}`
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {!attendance.clockOut ? (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleOpenClockOutModal(attendance._id)}
                            sx={{ color: "#58024B", borderColor: "#58024B" }}
                          >
                            Mark Clock Out
                          </Button>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No User Attendance records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Modal */}
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
            Mark Your Attendance
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              margin="normal"
              readOnly
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth
              label="Clock In Time"
              type="time"
              name="clockIn"
              value={formData.clockIn}
              margin="normal"
              readOnly
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
            />

            <TextField
              fullWidth
              label="Latitude"
              name="latitude"
              value={formData.latitude}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Longitude"
              name="longitude"
              value={formData.longitude}
              // onChange={handleChange}
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

      <Modal
        open={clockOutModal}
        onClose={() => setClockOutModal(false)}
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
            Mark Clock Out
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <TextField
            fullWidth
            label="Date"
            type="date"
            name="date"
            value={clockOutForm.date}
            //onChange={(e) => setClockOutForm({ ...clockOutForm, date: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Clock Out Time"
            type="time"
            name="clockOut"
            value={clockOutForm.clockOut}
            //onChange={(e) => setClockOutForm({ ...clockOutForm, clockOut: e.target.value })}
            margin="normal"
            inputProps={{ step: 300 }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Latitude"
            name="latitude"
            value={clockOutForm.latitude}
            //onChange={(e) => setClockOutForm({ ...clockOutForm, latitude: e.target.value })}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Longitude"
            name="longitude"
            value={clockOutForm.longitude}
            //onChange={(e) => setClockOutForm({ ...clockOutForm, longitude: e.target.value })}
            margin="normal"
          />

          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              onClick={() => setClockOutModal(false)}
              sx={{ color: "#58024B", borderColor: "#58024B" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleClockOutSubmit}
              sx={{ bgcolor: "#58024B", "&:hover": { bgcolor: "#7a007f" } }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>


      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserAttendance;
