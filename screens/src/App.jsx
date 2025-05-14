import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Public
import Login from "./components/login/Login";

// Admin Components
import Dashboard from "./components/Dashboard/Dashboard";
import Staff from "./components/staff/staff";
import Employee from "./components/employee/employee";
import Attendance from "./components/Attendance/Attendance";
import Leave from "./components/leave/leave";
import Asset from "./components/asset/asset";
import Invoice from "./components/Invoice/invoice";
import Salaryslip from "./components/salarySlip/salarySlip";

// User Components
import UserDashboard from "./components/UserDashboard/UserDashboard.jsx";
import UserAttendance from "./components/Userattendance/userAttendance";
import UserProfile from "./components/UserProfile/UserProfile";
import UserLeave from "./components/userLeave/userLeave";
import UserAsset from "./components/UserAsset/UserAsset";
import UserSalary from "./components/UserSalary/usersalary.jsx";


// Fallback
const Unauthorized = () => <h1>Unauthorized Access</h1>;

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

      {/* Admin Protected Routes */}
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

      {/* User Protected Routes */}
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

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
