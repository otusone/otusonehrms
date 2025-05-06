import React, { useState } from 'react';
import Login from "./components/Login";

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