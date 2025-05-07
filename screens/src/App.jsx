import React, { useState } from 'react';
import Login from "./components/Login";
import { Routes, Route } from 'react-router-dom'; 
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/sidebar/sidebar";
import Attendance from "./components/Attendance/Attendance";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/attendance" element={<Attendance/>}/>
      </Routes>
    </div>
  )
}
export default App;