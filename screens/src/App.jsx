import React, { useState } from 'react';
import Login from "./components/login/Login";
import Sidebar from "./components/sidebar/sidebar";
import Staff from "./components/staff/staff";
import Heading from "./components/headingProfile/heading";
import Employee from "./components/employee/employee";
import Leave from "./components/leave/leave";


import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/heading" element={<Heading />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/manage-leave" element={<Leave />} />



      </Routes>
    </div>
  )
}
export default App;