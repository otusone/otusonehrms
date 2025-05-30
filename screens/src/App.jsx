import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute.jsx";
import Login from "./components/login/Login";
import { setUser, logout } from "./slices/authSlice.js"; // logout imported

import Dashboard from "./components/Dashboard/Dashboard";
import Staff from "./components/staff/staff";
import Employee from "./components/employee/employee";
import Attendance from "./components/Attendance/Attendance";
import Leave from "./components/leave/leave";
import Asset from "./components/asset/asset";
import Invoice from "./components/Invoice/invoice";
import Salaryslip from "./components/salarySlip/salarySlip";
import Changepassword from "./components/change-password/change-password.jsx";


import UserDashboard from "./components/UserDashboard/UserDashboard.jsx";
import UserAttendance from "./components/Userattendance/userAttendance";
import UserProfile from "./components/userHeading/userProfile.jsx";
import UserLeave from "./components/userLeave/userLeave";
import UserAsset from "./components/UserAsset/UserAsset";
import UserSalary from "./components/UserSalary/usersalary.jsx";


import { useDispatch } from "react-redux";
import axiosInstance from "./utils/baseurl.js";



function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axiosInstance
        .get("/admin/verify-token", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const userData = res.data.data;
          dispatch(setUser(userData));
          if (location.pathname === "/login") {
            if (userData.role === "admin") navigate("/dashboard");
            else if (userData.role === "user") navigate("/user-dashboard");
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          dispatch(logout());
          if (location.pathname !== "/login") navigate("/login");
        });
    } else {
      dispatch(logout());
    }
  }, []);


  return (

    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={<ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute>}
      />
      {/* <Route
        path="/staff"
        element={<ProtectedRoute allowedRoles={['admin']}><Staff /></ProtectedRoute>}
      /> */}
      <Route
        path="/employee"
        element={<ProtectedRoute allowedRoles={['admin']}><Employee /></ProtectedRoute>}
      />
      <Route
        path="/attendance"
        element={<ProtectedRoute allowedRoles={['admin']}><Attendance /></ProtectedRoute>}
      />
      <Route
        path="/manage-leave"
        element={<ProtectedRoute allowedRoles={['admin']}><Leave /></ProtectedRoute>}
      />
      <Route
        path="/invoice"
        element={<ProtectedRoute allowedRoles={['admin']}><Invoice /></ProtectedRoute>}
      />
      <Route
        path="/asset"
        element={<ProtectedRoute allowedRoles={['admin']}><Asset /></ProtectedRoute>}
      />
      <Route
        path="/salary-slip"
        element={<ProtectedRoute allowedRoles={['admin']}><Salaryslip /></ProtectedRoute>}
      />
      <Route
        path="/change-password"
        element={<ProtectedRoute allowedRoles={['admin']}><Changepassword /></ProtectedRoute>}
      />


      <Route
        path="/user-dashboard"
        element={<ProtectedRoute allowedRoles={['user']}><UserDashboard /></ProtectedRoute>}
      />
      <Route
        path="/user-attendance"
        element={<ProtectedRoute allowedRoles={['user']}><UserAttendance /></ProtectedRoute>}
      />
      <Route
        path="/user-profile"
        element={<ProtectedRoute allowedRoles={['user']}><UserProfile /></ProtectedRoute>}
      />
      <Route
        path="/user-leave"
        element={<ProtectedRoute allowedRoles={['user']}><UserLeave /></ProtectedRoute>}
      />
      <Route
        path="/user-asset"
        element={<ProtectedRoute allowedRoles={['user']}><UserAsset /></ProtectedRoute>}
      />
      <Route
        path="/user-salary-slip"
        element={<ProtectedRoute allowedRoles={['user']}><UserSalary /></ProtectedRoute>}
      />


      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
