import React from 'react';
import './Userdashboard.css';
import {
  Box,
  Grid,
  Typography,
  Divider,
  Modal,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { AiOutlineTeam, AiOutlineCalendar } from 'react-icons/ai';
import { TbTicket } from 'react-icons/tb';
import { MdAccountBalanceWallet, MdEdit, MdDelete, MdCheckCircle, MdCancel } from 'react-icons/md';
import { RiHotspotLine } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Sidebar from '../sidebar/sidebar';

// Common Components
const CommonCard = ({ icon, heading, number, backgroundColor, color }) => (
  <Grid className="commonCardContainer">
    <Box>
      <Grid style={{ backgroundColor }}>{icon}</Grid>
      <Box>
        <Typography>Total</Typography>
        <Typography variant='h5'>{heading}</Typography>
      </Box>
    </Box>
    <Box>
      <Typography style={{ color }} variant='h5' fontSize={21}>{number}</Typography>
    </Box>
  </Grid>
);

const HeadingText = ({ heading, name, handleClick, IsAction }) => (
  <Grid className="headingTextContainer">
    <Typography variant='h4' fontWeight={500} fontSize={25}>{heading}</Typography>
    {IsAction && <CommonButton name={name} onClick={handleClick} />}
  </Grid>
);

const CommonButton = ({ name, onClick, variant = 'outlined', color = '#58024B' }) => (
  <Grid className="commonButtonContainer">
    <Button onClick={onClick} variant={variant} style={{ borderColor: color, color }}>
      {name}
    </Button>
  </Grid>
);

const InputField = ({ label, name, placeholder, value, handleChange, type, multiline, rows }) => (
  <Grid className="inputFieldContainer">
    <Typography>{label}</Typography>
    <TextField
      type={type}
      name={name}
      value={value || ''}
      placeholder={placeholder}
      onChange={handleChange}
      fullWidth
      multiline={multiline}
      rows={rows}
    />
  </Grid>
);

// Modals
const AnnouncementModal = ({
  open,
  name,
  inputData = {},
  handleChange,
  handleClose,
  heading,
  handleClick
}) => (
  <Modal open={open} sx={{ width: 600, height: 'fit-content', margin: "auto" }}>
    <Grid className="announcementModal">
      <Box>
        <Typography variant='h4' fontSize={22} fontWeight={500}>{heading}</Typography>
        <RxCross2 fontSize={22} cursor={"pointer"} onClick={handleClose} />
      </Box>
      <Divider />
      <Grid container className="announcementDetails">
        <Grid xs={12} sm={6}>
          <InputField
            label='Title'
            name='title'
            placeholder='Enter Title'
            value={inputData.title}
            handleChange={handleChange}
            type='text'
          />
          <InputField
            label='Description'
            name='description'
            placeholder='Enter Description'
            value={inputData.description}
            handleChange={handleChange}
            multiline
            rows={4}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <InputField
            label='Start Date'
            name='start_date'
            value={inputData.start_date}
            handleChange={handleChange}
            type='date'
          />
          <InputField
            label='Start Time'
            name='start_time'
            value={inputData.start_time}
            handleChange={handleChange}
            type='time'
          />
        </Grid>
      </Grid>
      <Box>
        <CommonButton name="Close" onClick={handleClose} />
        <CommonButton name={name} onClick={handleClick} />
      </Box>
    </Grid>
  </Modal>
);

const LeaveModal = ({
  open,
  handleClose,
  leaveData,
  handleLeaveChange,
  handleLeaveSubmit,
  isEdit = false
}) => (
  <Modal open={open} sx={{ width: 600, height: 'fit-content', margin: "auto" }}>
    <Grid className="announcementModal" style={{marginLeft:"500px"}}>
      <Box style={{marginLeft:"500px"}}>
        <Typography variant='h4' fontSize={22} fontWeight={500}>
          {isEdit ? 'Edit Leave Request' : 'Apply for Leave'}
        </Typography>
        <RxCross2 fontSize={22} cursor={"pointer"} onClick={handleClose} />
      </Box>
      <Divider />
      <Grid container spacing={2} className="announcementDetails" style={{marginLeft:"500px"}}>
        <Grid item xs={12}>
          <InputField
            label='Leave Type'
            name='leaveType'
            placeholder='Select Leave Type'
            // value={leaveData.leaveType}
            handleChange={handleLeaveChange}
            type='text'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            label='Start Date'
            name='startDate'
            // value={leaveData.startDate}
            handleChange={handleLeaveChange}
            type='date'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            label='End Date'
            name='endDate'
            // value={leaveData.endDate}
            handleChange={handleLeaveChange}
            type='date'
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            label='Reason'
            name='reason'
            placeholder='Enter reason for leave'
            // value={leaveData.reason}
            handleChange={handleLeaveChange}
            type='text'
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
      <Box style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <CommonButton name="Cancel" onClick={handleClose} />
        <CommonButton
          name={isEdit ? 'Update' : 'Submit'}
          onClick={handleLeaveSubmit}
          variant="contained"
          color="#58024B"
        />
      </Box>
    </Grid>
  </Modal>
);

// Main Components
const AttendanceStatus = ({ status }) => {
  let icon, color;
  switch (status) {
    case 'Present':
      icon = <MdCheckCircle />;
      color = '#6FD943';
      break;
    case 'Absent':
      icon = <MdCancel />;
      color = '#FF3A6E';
      break;
    case 'Late':
      icon = <AiOutlineCalendar />;
      color = '#FFA500';
      break;
    case 'On Leave':
      icon = <AiOutlineCalendar />;
      color = '#3EC9D6';
      break;
    default:
      icon = <AiOutlineCalendar />;
      color = '#58024B';
  }

  return (
    <Box display="flex" alignItems="center">
      <Box style={{ color, marginRight: '0.5rem' }}>{icon}</Box>
      <Typography>{status}</Typography>
    </Box>
  );
};

const MeetingSchedule = ({ data, handleClick, handleEdit, handleDelete }) => (
  <Grid className="meetingScheduleContainer">
    <HeadingText heading='Announcement List' IsAction={true} name='Create' handleClick={handleClick} />
    <TableContainer component={Paper}>
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
          {data && data.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.start_date}</TableCell>
              <TableCell>{item.start_time}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <MdEdit
                  fontSize={22}
                  cursor={"pointer"}
                  style={{ color: "#3EC8D5", marginRight: '10px' }}
                  onClick={() => handleEdit(item._id)}
                />
                <MdDelete
                  fontSize={22}
                  cursor={"pointer"}
                  style={{ color: "#FF3A6E" }}
                  onClick={() => handleDelete(item._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Grid>
);

const Calender = () => (
  <Grid className="calenderContainer">
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      }}
      height="100%"
    />
  </Grid>
);

const LeaveAndAttendanceSection = ({
  attendanceData,
  leaveData = [],  // Default to empty array if undefined
  handleMarkAttendance,
  handleApplyLeave,
  handleEditLeave,
  handleCancelLeave
}) => {
  return (
    <Grid container spacing={3} className="attendanceLeaveContainer" style={{marginLeft:"200px"}}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} className="sectionPaper">
          <HeadingText heading="Today's Attendance" />
          <Box textAlign="center" py={4}>
            <Typography variant="h6" gutterBottom>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
            <Box my={3}>
              <Typography variant="h5" gutterBottom>
                Current Status
              </Typography>
              <AttendanceStatus status={attendanceData?.status || 'Not Marked'} />
            </Box>
            <Box mt={4}>
              <CommonButton 
                name="Mark Attendance" 
                onClick={handleMarkAttendance} 
                variant="contained" 
                color="#58024B"
              />
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={3} className="sectionPaper" style={{marginLeft:"250px"}}>
          <HeadingText heading="My Leave Requests" IsAction={true} name="Apply Leave" handleClick={handleApplyLeave} />
          <TableContainer>
            <Table>
              <TableHead style={{ backgroundColor: "#58024B" }}>
                <TableRow>
                  <TableCell style={{ color: "white" }}>Leave Type</TableCell>
                  <TableCell style={{ color: "white" }}>Dates</TableCell>
                  <TableCell style={{ color: "white" }}>Status</TableCell>
                  <TableCell style={{ color: "white" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveData.map((leave, index) => (
                  <TableRow key={index}>
                    <TableCell>{leave.leaveType}</TableCell>
                    <TableCell>{leave.startDate} to {leave.endDate}</TableCell>
                    <TableCell>
                      <Box style={{ 
                        color: leave.status === 'Approved' ? '#6FD943' : 
                              leave.status === 'Rejected' ? '#FF3A6E' : '#FFA500',
                        fontWeight: 'bold'
                      }}>
                        {leave.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {leave.status === 'Pending' && (
                        <>
                          <MdEdit 
                            fontSize={22} 
                            cursor={"pointer"} 
                            style={{ color: "#3EC8D5", marginRight: '10px' }} 
                            onClick={() => handleEditLeave(leave)} 
                          />
                          <MdDelete 
                            fontSize={22} 
                            cursor={"pointer"} 
                            style={{ color: "#FF3A6E" }} 
                            onClick={() => handleCancelLeave(leave.id)} 
                          />
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

// Main Dashboard Component
const Dashboard = ({
  announcementData,
  handleCreate,
  handleEdit,
  inputData,
  handleChange,
  handleEditModal,
  handleClose,
  editModal,
  handleModal,
  open,
  handleDelete,
  // Leave and Attendance props
  attendanceData,
  leaveData = [],  // Default to empty array if undefined
  handleMarkAttendance,
  handleApplyLeave,
  leaveModalOpen,
  handleLeaveClose,
  leaveFormData,
  handleLeaveChange,
  handleLeaveSubmit,
  handleEditLeave,
  handleCancelLeave
}) => {
  const data = [
    { id: 1, icon: <AiOutlineTeam />, heading: "Team", number: 5, color: "#58024B" },
    { id: 2, icon: <TbTicket />, heading: "Tickets", number: 3, color: "#3EC9D6" },
    { id: 3, icon: <MdAccountBalanceWallet />, heading: "Account Balance", number: "$2,500", color: "#6FD943" },
    { id: 4, icon: <RiHotspotLine />, heading: "Projects", number: 7, color: "#3EC9D6" },
    { id: 5, icon: <AiOutlineCalendar />, heading: "Leaves Taken", number: 2, color: "#FFA500" },
    { id: 6, icon: <AiOutlineCalendar />, heading: "Leaves Remaining", number: 18, color: "#58024B" },
  ];

  return (
    <div className="dashboardLayout" style={{ display: "flex" }}>
      <Sidebar />
      <Grid className="dashboardContainer">
        <Typography variant='h2' fontWeight={500} fontSize={20}>Employee Dashboard</Typography>
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <CommonCard {...item} backgroundColor={item.color} />
            </Grid>
          ))}
        </Grid>

        <LeaveAndAttendanceSection
          attendanceData={attendanceData}
          leaveData={leaveData}
          handleMarkAttendance={handleMarkAttendance}
          handleApplyLeave={handleApplyLeave}
          handleEditLeave={handleEditLeave}
          handleCancelLeave={handleCancelLeave}
        />
        
        <Grid container spacing={2} className="dashboard2ndSection">
          <Grid item xs={12} md={8}>
            <MeetingSchedule
              data={announcementData}
              handleClick={handleModal}
              handleEdit={handleEditModal}
              handleDelete={handleDelete}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Calender />
          </Grid>
        </Grid>

        <AnnouncementModal
          open={open}
          name="Create"
          heading="Create New Announcement"
          handleClose={handleClose}
          inputData={inputData}
          handleChange={handleChange}
          handleClick={handleCreate}
        />
        <AnnouncementModal
          open={editModal}
          name="Edit"
          heading="Edit Announcement"
          handleClose={handleClose}
          inputData={inputData}
          handleChange={handleChange}
          handleClick={handleEdit}
        />
        
        <LeaveModal
          open={leaveModalOpen}
          handleClose={handleLeaveClose}
          leaveData={leaveFormData}
          handleLeaveChange={handleLeaveChange}
          handleLeaveSubmit={handleLeaveSubmit}
        />
      </Grid>
    </div>
  );
};

export default Dashboard;