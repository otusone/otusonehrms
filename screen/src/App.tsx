import React, { Fragment, useEffect, useState } from 'react'
import Overview from './components/main/Overview/Overview'
import Login from './pages/Login/Login';
import axios from 'axios'
import EmpAttendancePage from './pages/EmpAttendancePage/EmpAttendancePage';

const App = () => {
  const [IsLogin, setIsLogin] = useState<any>(localStorage.getItem('token') || '');
  const [user, setUser] = useState<any>(localStorage.getItem('role') || '');
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value })
  };

  const handleLogin = () => {
    axios.post('https://hrms-server-ygpa.onrender.com/user/login', inputData)
      .then((response) => {
        const loginedUser = response.data;
        const newToken = response.data.token;
        const newRole = response.data.role;
        const newEmail = response.data.email;
        setIsLogin(newToken);
        setUser(newRole);
        localStorage.setItem("loginedUser", JSON.stringify(loginedUser));
        localStorage.setItem('token', newToken);
        localStorage.setItem('role', newRole);
        localStorage.setItem('email', newEmail);
      })
  };

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLogin('')
  };

  return (
    <Fragment>
      {IsLogin ?
        <>
          {user == "ADMIN" && <Overview handleLogout={handleLogout} />}
          {user == "EMPLOYEE" && <EmpAttendancePage />}
        </>
        :
        <Login inputData={inputData} handleChange={handleChange} handleLogin={handleLogin} />
      }
    </Fragment>
  )
}

export default App