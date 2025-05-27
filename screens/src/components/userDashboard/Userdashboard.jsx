import React, { useState, useEffect } from 'react';
import './UserDashboard.css';
import axios from 'axios';
import axiosInstance from '../../utils/baseurl';
import { Box, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AiOutlineTeam } from 'react-icons/ai';
import { TbTicket } from 'react-icons/tb';
import { MdAccountBalanceWallet, MdEdit, MdDelete } from 'react-icons/md';
import { RiHotspotLine } from 'react-icons/ri';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Sidebar from "../userSidebar/sidebar";
import Heading from "../userHeading/heading";
import { useNavigate } from "react-router-dom";


const Dashboard = ({
  announcementData, handleCreate, handleEdit, inputData,
  handleChange, handleEditModal, handleClose,
  editModal, handleModal, open, handleDelete
}) => {

  const [todaysAttendance, setTodaysAttendance] = useState([]);
  const [todaysLeaveCount, setTodaysLeaveCount] = useState(0);
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const [assignedAssetCount, setAssignedAssetCount] = useState(0);
  const [dateOfJoining, setDateOfJoining] = useState("N/A");
  const navigate = useNavigate();


  const data = [
    { id: 1, icon: <AiOutlineTeam />, heading: "Joining Date", number: dateOfJoining, color: "#58024B" },
    { id: 2, icon: <TbTicket />, heading: "This Month Leaves", number: todaysLeaveCount, color: "#3EC9D6", path: "/user-leave" },
    { id: 3, icon: <MdAccountBalanceWallet />, heading: "Pending Leaves", number: pendingLeaveCount, color: "#6FD943", path: "/user-leave?status=pending" },
    { id: 4, icon: <RiHotspotLine />, heading: "Assigned Assets", number: assignedAssetCount, color: "#3EC9D6", path: "/user-asset" },
  ];



  useEffect(() => {
    const fetchDashboardStats = async () => {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const [
          profileRes,
          leavesRes,
          assetsRes,
          attendanceRes
        ] = await Promise.all([
          axiosInstance.get(`/user/profile/${userId}`, { headers }),
          axiosInstance.get("/user/my-leaves", { headers }),
          axiosInstance.get(`/user/get-asset/${userId}`, { headers }),
          // axiosInstance.get(`/user/get-attendance/${userId}`, { headers })
        ]);

        const profile = profileRes.data;
        const leaves = leavesRes.data.leaves || [];
        const assets = assetsRes?.data?.data || [];
        //const attendance = attendanceRes.data.data || [];
        console.log(profile);

        const joiningDate = profile.dateOfJoining ? new Date(profile.dateOfJoining).toLocaleDateString() : "N/A";


        const today = new Date();
        const thisMonth = today.getMonth();
        const thisYear = today.getFullYear();


        const leavesThisMonth = leaves.filter((leave) => {
          const leaveDate = new Date(leave.startDate);
          return leaveDate.getMonth() === thisMonth && leaveDate.getFullYear() === thisYear;
        });


        const pendingLeaves = leaves.filter((leave) => leave.status === "Pending");
        const totalAssets = assets.length;



        // const todayString = today.toISOString().split('T')[0];
        // const todaysAttendance = attendance.filter(item => item.date === todayString);

        setDateOfJoining(joiningDate);
        setTodaysLeaveCount(leavesThisMonth.length);
        setPendingLeaveCount(pendingLeaves.length);
        setAssignedAssetCount(totalAssets);
        //setTodaysAttendance(todaysAttendance);

        // console.log("Date of Joining:", joiningDate);
        // console.log("Leaves This Month:", leavesThisMonth);
        // console.log("Pending Leaves:", pendingLeaves);

      } catch (err) {
        console.error("Error loading dashboard stats", err);
      }
    };

    fetchDashboardStats();
  }, []);




  return (
    <Box display="flex" minHeight="100vh">
      <Box
        sx={{
          width: { md: "18%" },
          borderRight: { md: "1px solid #eee" },
          bgcolor: "#fff",
        }}
      >
        <Sidebar />
      </Box>

      <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
        <Heading />
        <Grid className="dashboardContainer" sx={{ ml: { xs: 5, md: 3 } }}
        >
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

          <Grid container spacing={3} className="dashboard2ndSection" >
            <Grid item xs={10}>
              <div className="calendarContainer enhancedCalendar" style={{ width: "70%" }}>
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  height="auto"
                />
              </div>
            </Grid>
          </Grid>


        </Grid>
      </Box>
    </Box >
  );
};

export default Dashboard;
