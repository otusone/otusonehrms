import React, { useState } from 'react';
import './Dashboard.css';
import { Box, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AiOutlineTeam } from 'react-icons/ai';
import { TbTicket } from 'react-icons/tb';
import { MdAccountBalanceWallet, MdEdit, MdDelete } from 'react-icons/md';
import { RiHotspotLine } from 'react-icons/ri';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Sidebar from "../sidebar/sidebar";
import Heading from "../headingProfile/heading";

const Dashboard = ({
  announcementData, handleCreate, handleEdit, inputData,
  handleChange, handleEditModal, handleClose,
  editModal, handleModal, open, handleDelete
}) => {

  const data = [
    { id: 1, icon: <AiOutlineTeam />, heading: "Staff", number: 0, color: "#58024B" },
    { id: 2, icon: <TbTicket />, heading: "Ticket", number: 0, color: "#3EC9D6" },
    { id: 3, icon: <MdAccountBalanceWallet />, heading: "Account Balance", number: "0", color: "#6FD943" },
    { id: 4, icon: <RiHotspotLine />, heading: "Jobs", number: 0, color: "#3EC9D6" },
    { id: 5, icon: <RiHotspotLine />, heading: "Active Jobs", number: 0, color: "#6FD943" },
    { id: 6, icon: <RiHotspotLine />, heading: "Inactive Jobs", number: 0, color: "#58024B" }
  ];

  return (
    <Box display="flex" minHeight="100vh">
      <Box sx={{ width: { xs: "100%", md: "18%" }, bgcolor: "#fff", borderRight: "1px solid #eee" }}>
        <Sidebar />
      </Box>

      <Box sx={{ width: { xs: "100%", md: "82%" }, bgcolor: "#f9f9f9" }}>
        <Heading />
        <Grid className="dashboardContainer">
          <Typography variant="h2" fontWeight={500} fontSize={20}>Dashboard</Typography>

          <Grid container spacing={2}>
            {data.map(item => (
              <Grid item sm={4} key={item.id}>
                <div className="commonCard" style={{ backgroundColor: item.color }}>
                  <div className="icon">{item.icon}</div>
                  <div className="content">
                    <h3>{item.heading}</h3>
                    <p>{item.number}</p>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={2} className="dashboard2ndSection">
            <Grid item sm={7}>
              <div className="meetingScheduleContainer">
                <div className="headingSection">
                  <h2>Announcement List</h2>
                  <button className="createBtn" onClick={handleModal}>Create</button>
                </div>
                <TableContainer>
                  <Table>
                    <TableHead style={{ backgroundColor: "#58024B" }}>
                      <TableRow>
                        <TableCell style={{ color: "white" }}>TITLE</TableCell>
                        <TableCell style={{ color: "white" }}>START DATE</TableCell>
                        <TableCell style={{ color: "white" }}>START TIME</TableCell>
                        <TableCell style={{ color: "white" }}>DESCRIPTION</TableCell>
                        <TableCell style={{ color: "white" }}>ACTION</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.isArray(announcementData) && announcementData.map((item) => (

                        <TableRow key={item._id}>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>{item.start_date}</TableCell>
                          <TableCell>{item.start_time}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>
                            <MdEdit
                              fontSize={22}
                              style={{ color: "#3EC8D5", cursor: "pointer", marginRight: "10px" }}
                              onClick={() => handleEditModal(item._id)}
                            />
                            <MdDelete
                              fontSize={22}
                              style={{ color: "#FF3A6E", cursor: "pointer" }}
                              onClick={() => handleDelete(item._id)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Grid>

            <Grid item sm={5}>
              <div className="calendarContainer">
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                />
              </div>
            </Grid>
          </Grid>

          {/* You can use any modal package here. For simplicity, use native prompt as placeholder */}
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
