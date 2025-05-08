import React, { useState } from 'react';
import Attendance from "./Attendance";
import Sidebar from "../sidebar/sidebar";
import { Modal, Box, Typography, Divider, TextField, Button, Select, MenuItem, FormControl, Grid } from '@mui/material';
import { RxCross1 } from 'react-icons/rx';


function Attend() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({
    emp_id: "", employee: "", date: "", hours: "", remarks: ""
  });



  const handleOpen = () => {
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="app">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main">
        <Button variant="contained" onClick={handleOpen}>Open Attendance Modal</Button>

        <Modal open={modalOpen}>
          <div className="modalBox">
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Attendance Form</Typography>
              <RxCross1 onClick={handleClose} style={{ cursor: "pointer" }} fontSize={25} />
            </Box>
            <Divider style={{ margin: '1rem 0' }} />

            <Box display="flex" gap={2} marginBottom={2}>
              <TextField fullWidth label="Employee ID" name="emp_id" placeholder="EMP000001" value={form.emp_id} onChange={handleChange} />
              <TextField fullWidth label="Employee Name" name="employee" placeholder="John Deo" value={form.employee} onChange={handleChange} />
            </Box>

            <Box display="flex" gap={2} marginBottom={2}>
              <TextField fullWidth label="Date" name="date" type="date" value={form.date} onChange={handleChange} />
              <TextField fullWidth label="Hours" name="hours" type="number" placeholder="00:00:00" value={form.hours} onChange={handleChange} />
            </Box>

            <TextField fullWidth label="Remark" name="remark" placeholder="Write remark here!" value={form.remark} onChange={handleChange} />

            <Box display="flex" justifyContent="flex-end" gap={2} marginTop={2}>
              <Button variant="outlined" onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={() => { alert('Submitted'); handleClose(); }}>Submit</Button>
            </Box>
          </div>
        </Modal>

        <table className="att-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Clock In</th>
              <th>Clock Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, idx) => (
              <tr key={idx}>
                <td>{row.Emp_ID}</td>
                <td>{row.Name}</td>
                <td>{row.Date}</td>
                <td>{row.Clock_In}</td>
                <td>{row.Clock_Out}</td>
                <td>{row.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attend;
