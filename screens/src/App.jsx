import React, { Fragment } from 'react';
import { Routes, Route } from "react-router-dom";
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
import Userasset from "./components/UserAsset/Userasset";
import Userdashboard from "./components/Userdashboard/Userdashboard";
import UserProfile from "./components/profile/UserProfile";
import UserAttendance from "./components/Userattendance/UserAttendance";
import UserSidebar from "./components/UserSidebar/userSidebar";
import ForgotPassword from './components/login/ForgotPassword';
import VerifyOTP from './components/login/VerifyOTP';
import ResetPassword from './components/login/ResetPassword';


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
                <Route path='/asset' element={<Asset />} />
                <Route path='invoice' element={<Invoice />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path="/applyforleave" element={<Applyforleave />} />
                <Route path="/userasset" element={<Userasset />} />
                <Route path="/userdashboard" element={<Userdashboard />} />
                <Route path="/userprofile" element={<UserProfile />} />
                <Route path="/userattendance" element={<UserAttendance/>}/>
                <Route path="/UserSidebar" element={<UserSidebar/>}/>
                <Route path="/forgotpassword" element={<ForgotPassword/>}/>
                <Route path="/verifyotp" element={<VerifyOTP/>}/>
                <Route path="/resetpassword" element={<ResetPassword/>}/>
            </Routes>
        </Fragment>
    )
}

export default RoutesPage;



