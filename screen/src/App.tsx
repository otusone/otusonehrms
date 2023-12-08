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
  const [IsLogin, setIsLogin] = useState<any>(localStorage.getItem('token') || '');
  const [user, setUser] = useState<any>(localStorage.getItem('role') || '');
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value })
  };

  const handleLogin = () => {
    axios.post('https://hrms-server-ygpa.onrender.com/employee/login', inputData)
      .then((response) => {
        const loginedUser = response.data;
        const newToken = response.data.token;
        const newRole = response.data.role;
        const newEmail = response.data.email;
        setIsLogin(newToken);
        setUser(newRole);
        localStorage.setItem('loginedUser', JSON.stringify(loginedUser));
        localStorage.setItem('token', newToken);
        localStorage.setItem('role', newRole);
        localStorage.setItem('email', newEmail);
        console.log(response, 'response..');
      });
    // toast.success("Login Successfull!")
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogin('');
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLogin(localStorage.getItem('token'));
      setUser(localStorage.getItem('role'));
    }
  }, []);
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     localStorage.removeItem("loginedUser");
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("role");
  //     localStorage.removeItem("email");
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

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