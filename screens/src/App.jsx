import React, { useState } from 'react';
import {Route,Routes }from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/sidebar/sidebar";
import Attendance from "./components/Attendance/Attendance";
import Staff from "./components/staff/staff";
import Heading from "./components/headingProfile/heading";
import Employee from "./components/employee/employee";
import Leave from "./components/leave/leave";
import Asset from "./components/asset/asset";
import Invoice from "./components/Invoice/invoice";





function App() {
  return (
    <div>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        {/* <Route path="/sidebar" element={<Sidebar />} /> */}
        <Route path="/staff" element={<Staff />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/manage-leave" element={<Leave />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/asset" element={<Asset />} />



      </Routes>
    </div>
  )
}
export default App;