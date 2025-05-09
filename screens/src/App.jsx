import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Attendance from "./components/Attendance/Attendance";
import Staff from "./components/staff/staff";
import Employee from "./components/employee/employee";
import Leave from "./components/leave/leave";
import Asset from "./components/asset/asset";
import Invoice from "./components/Invoice/Invoice"; 

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/manage-leave" element={<Leave />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/asset" element={<Asset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
