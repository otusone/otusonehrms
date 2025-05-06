import React, { useState } from 'react';
import Login from "./components/Login";
import { Routes, Route } from 'react-router-dom'; 

function App(){
  return(
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
      </Routes>
    </div>
  )
}
export default App;