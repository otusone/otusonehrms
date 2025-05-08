import React, { useState } from 'react';
import Login from "./components/login/Login";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/sidebar/sidebar";
import Attendance from "./components/Attendance/Attendance";
import Staff from "./components/staff/staff";
import Heading from "./components/headingProfile/heading";
import Employee from "./components/employee/employee";
import Leave from "./components/leave/leave";
import Invoice from "./components/Invoice/Invoice";



function App() {
  return (
    <div>
      <Routes>

        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/attendance" element={<Attendance/>}/>
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/heading" element={<Heading />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/manage-leave" element={<Leave />} />
        <Route path="/invoice" element={<Invoice/>}/>



      </Routes>
    </div>
  )
}
export default App;