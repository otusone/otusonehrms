import React ,{Fragment}from 'react';
import {Routes,Route} from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Attendance from "./components/Attendance/Attendance";
import Staff from "./components/staff/staff";
import Employee from "./components/employee/employee";
import Leave from "./components/leave/leave";
import Asset from "./components/asset/asset";
import Invoice from "./components/Invoice/Invoice"; 
import SignUp from "./components/login/SignUp";
import Applyforleave from "./components/leave/Applyforleave";

const RoutesPage = () => {
    return (
        <Fragment>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/staff' element={<Staff />} />
                <Route path='/employee' element={<Employee />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/attendance' element={<Attendance />} />
                <Route path='/manage-leave' element={<Leave />} />
                <Route path='/attendance' element={<Attendance />} />
                <Route path='/asset' element={ <Asset /> } />
                <Route path='invoice' element={<Invoice />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path="/applyforleave" element={<Applyforleave/>}/>
            </Routes>
        </Fragment>
    )
}

export default RoutesPage;



