import React, { useState } from 'react';
import Login from "./components/Login";
import { Routes, Route } from 'react-router-dom'; 
import Dashboard from "./components/Dashboard";

function App(){
  return(
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </div>
  )
}
export default App;