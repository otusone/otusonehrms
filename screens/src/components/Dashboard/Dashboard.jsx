import React from 'react';
import './Dashboard.css';
import { Box, Grid, Typography, Divider, Modal, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AiOutlineTeam } from 'react-icons/ai';
import { TbTicket } from 'react-icons/tb';
import { MdAccountBalanceWallet, MdEdit, MdDelete } from 'react-icons/md';
import { RiHotspotLine } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Sidebar from '../sidebar/sidebar';


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

const CommonButton = ({ name, onClick }) => (
  <Grid className="commonButtonContainer">
    <Button onClick={onClick} variant='outlined'>{name}</Button>
  </Grid>
);

const InputField = ({ label, name, placeholder, value, handleChange, type }) => (
  <Grid className="inputFieldContainer">
    <Typography>{label}</Typography>
    <TextField
      type={type}
      name={name}
      value={value || ''}
      placeholder={placeholder}
      onChange={handleChange}
    />
  </Grid>
);

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

const MeetingSchedule = ({ data, handleClick, handleEdit, handleDelete }) => (
  <Grid className="meetingScheduleContainer">
    <HeadingText heading='Announcement List' IsAction={true} name='Create' handleClick={handleClick} />
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
          {data && data.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.start_date}</TableCell>
              <TableCell>{item.start_time}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <MdEdit fontSize={22} cursor={"pointer"} style={{ color: "#3EC8D5" }} onClick={() => handleEdit(item._id)} />
                <MdDelete fontSize={22} cursor={"pointer"} style={{ color: "#FF3A6E" }} onClick={() => handleDelete(item._id)} />
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
    <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
  </Grid>
);


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
  handleLogout
}) => {
  const data = [
    { id: 1, icon: <AiOutlineTeam />, heading: "Staff", number: 0, color: "#58024B" },
    { id: 2, icon: <TbTicket />, heading: "Ticket", number: 0, color: "#3EC9D6" },
    { id: 3, icon: <MdAccountBalanceWallet />, heading: "Account Balance", number: "0", color: "#6FD943" },
    { id: 4, icon: <RiHotspotLine />, heading: "Jobs", number: 0, color: "#3EC9D6" },
    { id: 5, icon: <RiHotspotLine />, heading: "Active Jobs", number: 0, color: "#6FD943" },
    { id: 6, icon: <RiHotspotLine />, heading: "Inactive Jobs", number: 0, color: "#58024B" },
  ];

  return (
    <div className="dashboardLayout" style={{ display: "flex" }}>
      <Sidebar />
      <Grid className="dashboardContainer">
        <Typography variant='h2' fontWeight={500} fontSize={20}>Dashboard</Typography>
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <CommonCard {...item} backgroundColor={item.color} />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} className="dashboard2ndSection">
          <Grid item xs={12} md={7}>
            <MeetingSchedule
              data={announcementData}
              handleClick={handleModal}
              handleEdit={handleEditModal}
              handleDelete={handleDelete}
            />
          </Grid>
          <Grid item xs={12} md={5}>
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
      </Grid>
    </div>
  );
};

export default Dashboard;
