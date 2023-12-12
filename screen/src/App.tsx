import React, { Fragment, useState, useEffect } from 'react'
import Overview from './components/main/Overview/Overview'
import Login from './pages/Login/Login';
import axios from 'axios'
import EmpAttendancePage from './pages/EmpAttendancePage/EmpAttendancePage';
import { EmployeeDataContextProvider } from './ContextAPI/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const navigation = useNavigate()
  const [IsLogin, setIsLogin] = useState<any>(localStorage.getItem('userToken') || '');
  const [user, setUser] = useState<any>(localStorage.getItem('userRole') || '');
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value })
  };

  const handleLogin = async () => {
    const userEmail = "admin@gmail.com";
    const userPass = "admin@123";

    try {
      if (userEmail === inputData.email && userPass === inputData.password) {
        console.log("Found Admin");
        await localStorage.setItem("userToken", ("admin@token"));
        await localStorage.setItem("userRole", ("ADMIN"));
        await localStorage.setItem("userName", ("Admin"));
        setIsLogin('admin@token');
        setUser("ADMIN");
      } else {
        console.log("Found Employee");
        const response = await axios.post('https://hrms-server-ygpa.onrender.com/employee/login', inputData);
        const loginedUser = response.data;
        const newToken = response.data.token;
        const newRole = response.data.role;
        const newEmail = response.data.email;
        const newName = response.data.name;

        setIsLogin(newToken);
        setUser(newRole);
        localStorage.setItem('loginedUser', JSON.stringify(loginedUser));
        localStorage.setItem('userToken', newToken);
        localStorage.setItem('userToken', newToken);
        localStorage.setItem('userRole', newRole);
        localStorage.setItem('email', newEmail);
        localStorage.setItem('userName', newName);
        console.log(response, 'response..');
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigation('/')
    setIsLogin('');
  };

  return (
    <Fragment>
      <EmployeeDataContextProvider>
        {IsLogin ?
          <>
            {user === "ADMIN" && <Overview handleLogout={handleLogout} />}
            {user === "EMPLOYEE" && <EmpAttendancePage handleLogout={handleLogout} />}
          </>
          :
          <Login inputData={inputData} handleChange={handleChange} handleLogin={handleLogin} />
        }
      </EmployeeDataContextProvider>
      <ToastContainer />
    </Fragment>
  )
}

export default App