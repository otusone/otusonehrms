import React, { useState } from 'react';
import Login from "./components/Login";
import Sidebar from "./components/sidebar/sidebar";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </div>
  )
}
export default App;