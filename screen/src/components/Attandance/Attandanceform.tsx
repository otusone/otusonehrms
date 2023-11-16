import React from 'react'
import "./Attandanceform.css";
import user from "../../asserst/images/profile_pic.jpg"
import Attandancetable from './Attandancetable';
import Datetime from './Datetime';

function Attandanceform() {
  return (
    <>
      <div className="attancecontainer">
         <div className="attandaceuserimg">
            <img src={user} alt="" />
         </div>

         <div className="attancename">
         <h3 className="text-2xl mb-2 ">Welcome, John Doe</h3>
            <p className="text-lg text-[#777777]">Monday, 20 May 2019</p>
         </div>
      </div>

      <Datetime/>
      <Attandancetable/>
    </>
  )
}

export default Attandanceform
