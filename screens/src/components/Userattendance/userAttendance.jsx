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
  const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [clockOutModal, setClockOutModal] = useState(false);
  const [selectedAttendanceId, setSelectedAttendanceId] = useState(null);

  const localDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  const [clockOutForm, setClockOutForm] = useState({
    date: localDate,
    clockOut: "",
    latitude: "",
    longitude: "",
  });

  const [formData, setFormData] = useState({
    date: localDate,
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

      let success = false;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          success = true;
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }));
        },
        (error) => {
          if (!success) {
            console.error("Geolocation error:", error);
            setNotification({
              open: true,
              message: "Unable to get location. Please allow location access.",
              severity: "error",
            });
          }
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

      const todayMarked = attendanceArray.some((item) => {
        const itemDate = new Date(item.date).toISOString().split("T")[0];
        return itemDate === localDate;
      });

      setIsAttendanceMarked(todayMarked);

    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filteredAttendance = () => {
    return attendanceData?.filter((attendance) =>
      formatDate(attendance.date).includes(searchTerm)
    );
  };


  const handleOpenModal = () => {
    if (isAttendanceMarked) {
      setNotification({
        open: true,
        message: "Attendance for today has already been marked.",
        severity: "info",
      });
      return;
    }
    setOpenModal(true);
  };


  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({
      date: localDate,
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
    const OFFICE_LAT = 28.626118095021997;
    const OFFICE_LNG = 77.37859426749372;
    const MAX_DISTANCE_METERS = 100;

    const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
      const R = 6371e3;
      const toRad = (value) => (value * Math.PI) / 180;

      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    try {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) return;

      const latitude = parseFloat(formData.latitude);
      const longitude = parseFloat(formData.longitude);

      if (isNaN(latitude) || isNaN(longitude)) {
        alert("Invalid coordinates.");
        return;
      }

      const distance = getDistanceFromLatLonInMeters(
        latitude,
        longitude,
        OFFICE_LAT,
        OFFICE_LNG
      );

      if (distance > MAX_DISTANCE_METERS) {
        alert("You are not within 100 meters of the office. Attendance cannot be marked.");
        return;
      }

      const requestBody = {
        date: formData.date,
        clockIn: formData.clockIn,
        clockInLocation: {
          latitude,
          longitude,
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
        setIsAttendanceMarked(true);
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

    let success = false;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        success = true;
        setClockOutForm((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }));
      },
      (error) => {
        if (!success) {
          console.error("Geolocation error:", error);
          setNotification({
            open: true,
            message: "Unable to get location. Please allow location access.",
            severity: "error",
          });
        }
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
          </Box>
          <Box display="flex" flexDirection="column"
            gap={2}
            mb={2}
            alignItems={{ xs: "flex-start", lg: "flex-end" }}
          >
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
            >{isAttendanceMarked}
              {isAttendanceMarked ? "Already Marked" : "Mark Attendance"}
            </Button>
            {/* <TextField
              placeholder="Search..."
              size="small"
              onChange={handleSearch}
              sx={{
                width: { xs: "100%", sm: "250px" },
                fontSize: { xs: "0.8rem", sm: "1rem" },
              }}
            /> */}
          </Box>


          <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: "#58024B" }}>
                <TableRow>
                  {/* <TableCell sx={{ color: "#fff" }}>EMPLOYEE NAME</TableCell>
                  <TableCell sx={{ color: "#fff" }}>EMAIL</TableCell> */}
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>DATE</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>CLOCK IN</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>CLOCK IN LOCATION</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>WORKING HOURS</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>CLOCK OUT</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>CLOCK OUT LOCATION</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>STATUS</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>ACTION</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAttendance()?.length > 0 ? (
                  filteredAttendance().map((attendance) => (
                    <TableRow key={attendance._id}>
                      <TableCell>
                        {attendance.date
                          ? new Date(attendance.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                          })
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {attendance.clockIn
                          ? new Date(attendance.clockIn.replace("Z", "")).toLocaleString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                          })
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {attendance.clockInLocation
                          ? `Lat: ${attendance.clockInLocation.latitude}, Lng: ${attendance.clockInLocation.longitude}`
                          : "-"}
                      </TableCell>
                      <TableCell>{attendance.workingHours || "-"}</TableCell>
                      <TableCell>
                        {attendance.clockOut
                          ? new Date(attendance.clockOut.replace("Z", "")).toLocaleString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                          })
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {attendance.clockOutLocation
                          ? `Lat: ${attendance.clockOutLocation.latitude}, Lng: ${attendance.clockOutLocation.longitude}`
                          : "-"}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap", color: attendance.attendanceType === "Half Day" ? "orange" : attendance.attendanceType === "Full Day" ? "green" : "gray", fontWeight: "bold", }}>
                        {attendance.attendanceType || "-"}
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
    </Box >
  );
};

export default UserAttendance;
