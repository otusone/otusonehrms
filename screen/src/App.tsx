import React, { Fragment, useEffect, useState } from 'react'
import Overview from './components/main/Overview/Overview'
import Login from './pages/Login/Login';
import axios from 'axios'

const App = () => {
  const [IsLogin, setIsLogin] = useState<any>(localStorage.getItem('token') || '')
  const [inputData, setInputData] = useState({ email: "", password: "" })
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value })
    console.log(inputData, "inputData")
  }
  const handleLogin = () => {
    axios.post('https://hrms-server-ygpa.onrender.com/user/login', inputData)
      .then((response) => {
        const newToken = response.data.token;
        console.log(response.data.role, "response")
        setIsLogin(newToken);
        localStorage.setItem('token', newToken);
      })
  }
  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLogin('')
  }
  console.log(IsLogin, "IsLogin")
  return (
    <Fragment>
      {IsLogin ? <Overview handleLogout={handleLogout} /> : <Login inputData={inputData} handleChange={handleChange} handleLogin={handleLogin} />}
    </Fragment>
  )
}

export default App