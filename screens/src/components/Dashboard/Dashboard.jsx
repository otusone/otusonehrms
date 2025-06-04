import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios';
import axiosInstance from '../../utils/baseurl';
import { Box, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AiOutlineTeam } from 'react-icons/ai';
import { TbTicket } from 'react-icons/tb';
import { MdAccountBalanceWallet, MdEdit, MdDelete } from 'react-icons/md';
import { RiHotspotLine } from 'react-icons/ri';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Sidebar from "../sidebar/sidebar";
import Heading from "../headingProfile/heading";
import { useNavigate } from "react-router-dom";

const Dashboard = ({
  announcementData, handleCreate, handleEdit, inputData,
  handleChange, handleEditModal, handleClose,
  editModal, handleModal, open, handleDelete
}) => {

  const [employeeCount, setEmployeeCount] = useState(0);
  const [todaysLeaveCount, setTodaysLeaveCount] = useState(0);
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const [assignedAssetCount, setAssignedAssetCount] = useState(0);
  const [todaysAttendance, setTodaysAttendance] = useState([]);
  const navigate = useNavigate();



  const data = [
    { id: 1, icon: <AiOutlineTeam />, heading: "Staff", number: employeeCount, color: "#58024B", path: "/employee" },
    { id: 2, icon: <TbTicket />, heading: "Active Leaves", number: todaysLeaveCount, color: "#3EC9D6", path: "/manage-leave" },
    { id: 3, icon: <MdAccountBalanceWallet />, heading: "Pending Leaves", number: pendingLeaveCount, color: "#6FD943", path: "/manage-leave?status=pending" },
    { id: 4, icon: <RiHotspotLine />, heading: "Assigned Assets", number: assignedAssetCount, color: "#3EC9D6", path: "/asset" },
  ];


  useEffect(() => {
    const fetchDashboardStats = async () => {
      const token = localStorage.getItem("authToken");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const [
          employeesRes,
          leavesRes,
          assetsRes,
          attendanceRes
        ] = await Promise.all([
          axiosInstance.get("/admin/get-employees", { headers }),
          axiosInstance.get("/admin/getAllLeaves", { headers }),
          axiosInstance.get("/admin/get-asset", { headers }),
          axiosInstance.get("/admin/get-attendance", { headers })
        ]);

        const employees = employeesRes.data.employees || [];
        const leaves = leavesRes.data.leaves || [];
        const assets = assetsRes.data.data || [];
        const attendance = attendanceRes.data.data || [];

        // Get today's date in YYYY-MM-DD format
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];


        const todaysAttendance = attendance.filter(item => item.date === todayString);

        console.log("Filtered Today's Attendance:", todaysAttendance);

        const formatDate = (date) => new Date(date).toISOString().split("T")[0];

        const activeTodayLeaves = leaves.filter((leave) => {
          const start = formatDate(leave.startDate);
          const end = formatDate(leave.endDate);
          const todayFormatted = formatDate(today);

          return start <= todayFormatted && end >= todayFormatted && leave.status.toLowerCase() === "approved";
        });



        const pendingLeaves = leaves.filter((leave) => leave.status === "Pending");

        const totalAssets = assets.reduce((count, item) => {
          return count + (item.assets?.length || 0);
        }, 0);

        setEmployeeCount(employees.length);
        setTodaysLeaveCount(activeTodayLeaves.length);
        setPendingLeaveCount(pendingLeaves.length);
        setAssignedAssetCount(totalAssets);
        setTodaysAttendance(todaysAttendance);
      } catch (err) {
        console.error("Error loading dashboard stats", err);
      }
    };



    fetchDashboardStats();
  }, []);



  return (
    <Box display="flex" minHeight="100vh">
      <Box sx={{ width: { xs: "100%", md: "18%" }, bgcolor: "#fff", borderRight: "1px solid #eee" }}>
        <Sidebar />
      </Box>

      <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
        <Heading />
        <Grid className="dashboardContainer">
          <Grid>
            <Typography variant="h2" fontWeight={500} fontSize={20}>Dashboard</Typography>

            <Grid container spacing={2}>
              {data.map(item => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} style={{ display: 'flex' }}>
                  <div
                    className="commonCardWrapper"
                    onClick={() => navigate(item.path)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="commonCard" style={{ backgroundColor: item.color }}>
                      <div className="header">
                        <div className="icon">{item.icon}</div>
                        <h3>{item.heading}</h3>
                      </div>
                      <div className="content">
                        <p>{item.number}</p>
                      </div>
                    </div>
                  </div>
                </Grid>

              ))}
            </Grid>


          </Grid>

          <Grid container spacing={3} className="dashboard2ndSection" sx={{ width: "100%" }}>
            <Grid item sm={7}>
              <div className="meetingScheduleContainer">
                <div className="headingSection">
                  <h2>Today's Attendance List</h2>
                </div>
                <TableContainer sx={{ overflowX: 'auto' }}>
                  <Table>
                    <TableHead style={{ backgroundColor: "#58024B" }}>
                      <TableRow>
                        <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>S. NO.</TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>Name</TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>EMAIL</TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>DATE</TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>CLOCK IN</TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>CLOCK OUT</TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>CLOCK IN LOCATION</TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>CLOCK OUT LOCATION</TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap", color: "#fff" }}>WORKING HOURS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.isArray(todaysAttendance) && todaysAttendance.map((item, index) => (
                        <TableRow key={item._id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.userId?.userName}</TableCell>
                          <TableCell>{item.userId?.email || "N/A"}</TableCell>
                          <TableCell>
                            {item.date
                              ? new Date(item.date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric"
                              })
                              : "-"}
                          </TableCell>
                          <TableCell>
                            {item.clockIn
                              ? new Date(item.clockIn.replace("Z", "")).toLocaleString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true
                              })
                              : "-"}
                          </TableCell>

                          <TableCell>
                            {item.clockOut
                              ? new Date(item.clockOut.replace("Z", "")).toLocaleString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true
                              })
                              : "-"}
                          </TableCell>


                          <TableCell>
                            {item.clockInLocation
                              ? `${item.clockInLocation.latitude}, ${item.clockInLocation.longitude}`
                              : "N/A"}
                          </TableCell>
                          <TableCell>
                            {item.clockOutLocation
                              ? `${item.clockOutLocation.latitude}, ${item.clockOutLocation.longitude}`
                              : "N/A"}
                          </TableCell>
                          <TableCell>{item.workingHours || 0}</TableCell>

                        </TableRow>
                      ))}
                    </TableBody>

                  </Table>
                </TableContainer>
              </div>
            </Grid>

          </Grid>

          {open && (
            alert("Open Create Modal - Hook up a proper modal component here.")
          )}
          {editModal && (
            alert("Open Edit Modal - Hook up a proper modal component here.")
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
