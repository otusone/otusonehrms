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
import Sidebar from '../userSidebar/sidebar';

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
      <Typography style={{ color }} variant='h5'>{number}</Typography>
    </Box>
  </Grid>
);

const HeadingText = ({ heading, name, handleClick, IsAction }) => (
  <Grid className="headingTextContainer">
    <Typography variant='h4' fontWeight={500}>{heading}</Typography>
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
  <Modal open={open}>
    <Grid className="announcementModal">
      <Box>
        <Typography variant='h4' fontWeight={500}>{heading}</Typography>
        <RxCross2 fontSize={22} cursor={"pointer"} onClick={handleClose} />
      </Box>
      <Divider />
      <Grid container className="announcementDetails">
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
  leaveData = {},
  handleLeaveChange,
  handleLeaveSubmit,
  isEdit = false
}) => {
  // Set default values if leaveData is undefined or null
  const {
    leaveType = '',
    startDate = '',
    endDate = '',
    reason = ''
  } = leaveData;

  return (
    <Modal open={open}>
      <Grid className="announcementModal">
        <Box>
          <Typography variant='h4' fontWeight={500}>
            {isEdit ? 'Edit Leave Request' : 'Apply for Leave'}
          </Typography>
          <RxCross2 fontSize={22} cursor={"pointer"} onClick={handleClose} />
        </Box>
        <Divider />
        <Grid container spacing={2} className="announcementDetails">
          <Grid item xs={12}>
            <InputField
              label='Leave Type'
              name='leaveType'
              placeholder='Select Leave Type'
              value={leaveType}
              handleChange={handleLeaveChange}
              type='text'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              label='Start Date'
              name='startDate'
              value={startDate}
              handleChange={handleLeaveChange}
              type='date'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              label='End Date'
              name='endDate'
              value={endDate}
              handleChange={handleLeaveChange}
              type='date'
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              label='Reason'
              name='reason'
              placeholder='Enter reason for leave'
              value={reason}
              handleChange={handleLeaveChange}
              type='text'
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <Box>
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
};

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
    <Box className="attendanceStatus">
      <Box style={{ color }}>{icon}</Box>
      <Typography variant="h5">{status}</Typography>
    </Box>
  );
};

const MeetingSchedule = ({ data, handleClick, handleEdit, handleDelete }) => (
  <Grid className="meetingScheduleContainer">
    <HeadingText heading='Announcement List' IsAction={true} name='Create' handleClick={handleClick} />
    <TableContainer component={Paper} className="tableContainer">
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
    />
  </Grid>
);

const LeaveAndAttendanceSection = ({
  attendanceData,
  leaveData = [],
  handleMarkAttendance,
  handleApplyLeave,
  handleEditLeave,
  handleCancelLeave
}) => {
  return (
    <Grid container spacing={3} className="attendanceLeaveContainer">
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
        <Paper elevation={3} className="sectionPaper">
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
                      <Box className={`leaveStatus ${leave.status.toLowerCase()}`}>
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
const Dashboard = () => {
  // State for announcements
  const [announcementData, setAnnouncementData] = React.useState([]);
  const [inputData, setInputData] = React.useState({
    title: '',
    description: '',
    start_date: '',
    start_time: ''
  });
  const [editModal, setEditModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);

  // State for attendance and leave
  const [attendanceData, setAttendanceData] = React.useState({});
  const [leaveData, setLeaveData] = React.useState([]);
  const [leaveModalOpen, setLeaveModalOpen] = React.useState(false);
  const [leaveFormData, setLeaveFormData] = React.useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [editingLeaveId, setEditingLeaveId] = React.useState(null);

  // Sample data for cards
  const data = [
    { id: 1, icon: <AiOutlineTeam />, heading: "Team", number: 5, color: "#58024B" },
    { id: 2, icon: <TbTicket />, heading: "Tickets", number: 3, color: "#3EC9D6" },
    { id: 3, icon: <MdAccountBalanceWallet />, heading: "Account Balance", number: "$2,500", color: "#6FD943" },
    { id: 4, icon: <RiHotspotLine />, heading: "Projects", number: 7, color: "#3EC9D6" },
    { id: 5, icon: <AiOutlineCalendar />, heading: "Leaves Taken", number: 2, color: "#FFA500" },
    { id: 6, icon: <AiOutlineCalendar />, heading: "Leaves Remaining", number: 18, color: "#58024B" },
  ];

  // Announcement handlers
  const handleModal = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditModal(false);
    setInputData({
      title: '',
      description: '',
      start_date: '',
      start_time: ''
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreate = () => {
    // Add your create logic here
    const newAnnouncement = {
      ...inputData,
      _id: Date.now().toString()
    };
    setAnnouncementData([...announcementData, newAnnouncement]);
    handleClose();
  };

  const handleEditModal = (id) => {
    const announcementToEdit = announcementData.find(item => item._id === id);
    if (announcementToEdit) {
      setInputData(announcementToEdit);
      setEditingId(id);
      setEditModal(true);
    }
  };

  const handleEdit = () => {
    // Add your edit logic here
    setAnnouncementData(announcementData.map(item =>
      item._id === editingId ? { ...inputData, _id: editingId } : item
    ));
    handleClose();
  };

  const handleDelete = (id) => {
    // Add your delete logic here
    setAnnouncementData(announcementData.filter(item => item._id !== id));
  };

  // Leave handlers
  const handleApplyLeave = () => {
    setLeaveFormData({
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: ''
    });
    setEditingLeaveId(null);
    setLeaveModalOpen(true);
  };

  const handleLeaveClose = () => {
    setLeaveModalOpen(false);
    setLeaveFormData({
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: ''
    });
    setEditingLeaveId(null);
  };

  const handleLeaveChange = (e) => {
    const { name, value } = e.target;
    setLeaveFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLeaveSubmit = () => {
    if (editingLeaveId) {
      // Update existing leave
      setLeaveData(leaveData.map(leave =>
        leave.id === editingLeaveId ? { ...leaveFormData, id: editingLeaveId } : leave
      ));
    } else {
      // Add new leave
      setLeaveData([...leaveData, {
        ...leaveFormData,
        id: Date.now().toString(),
        status: 'Pending'
      }]);
    }
    handleLeaveClose();
  };

  const handleEditLeave = (leave) => {
    setLeaveFormData({
      leaveType: leave.leaveType,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason
    });
    setEditingLeaveId(leave.id);
    setLeaveModalOpen(true);
  };

  const handleCancelLeave = (id) => {
    setLeaveData(leaveData.filter(leave => leave.id !== id));
  };

  // Attendance handler
  const handleMarkAttendance = () => {
    setAttendanceData({
      status: 'Present',
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="dashboardLayout">
      <Sidebar />
      <Grid container className="dashboardContainer">
        <Grid item xs={12}>
          <Typography variant='h2' fontWeight={500} mb={3}>Employee Dashboard</Typography>
        </Grid>

        {/* Stats Cards */}
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid item key={item.id} xs={6} sm={4} md={4} lg={2}>
              <CommonCard {...item} backgroundColor={item.color} />
            </Grid>
          ))}
        </Grid>

        {/* Attendance and Leave Section */}
        <Grid item xs={12} style={{ marginLeft: "400px" }}>
          <LeaveAndAttendanceSection
            attendanceData={attendanceData}
            leaveData={leaveData}
            handleMarkAttendance={handleMarkAttendance}
            handleApplyLeave={handleApplyLeave}
            handleEditLeave={handleEditLeave}
            handleCancelLeave={handleCancelLeave}
          />
        </Grid>

        {/* Announcement and Calendar Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} style={{ marginLeft: "200px", paddingTop: "30px" }}>
            <MeetingSchedule
              data={announcementData}
              handleClick={handleModal}
              handleEdit={handleEditModal}
              handleDelete={handleDelete}
            />
          </Grid>
          <Grid item xs={12} md={4} style={{ paddingTop: "30px" }}>
            <Paper elevation={3} className="sectionPaper">
              <Calender />
            </Paper>
          </Grid>
        </Grid>

        {/* Modals */}
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
          isEdit={!!editingLeaveId}
        />
      </Grid>
    </div>
  );
};

export default Dashboard;