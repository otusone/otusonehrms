import React, { useEffect, useState } from 'react'
import styles from './StaffPage.module.scss'
import { Grid, Typography } from '@mui/material'
import User from '../../components/staff/user/User'
import UserModal from '../../components/userModal/UserModal'
import axios from 'axios'


const StaffPage = () => {
    const [open, setOpen] = useState(false);
    const [inputData, setInputData] = useState({ username: "", email: "", password: '', role: "" })
    const [userData, setUserData] = useState([])

    const handleClick = () => setOpen(!open);
    const handleClose = () => setOpen(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('https://hrms-server-ygpa.onrender.com/user');
            const users = response.data.userData;
            setUserData(users);
        } catch (error) {
            console.error("Error during GET request:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async () => {
        if (inputData.username == "" || inputData.email == "" || inputData.password == "") {
            console.log("Please fill input field.")
            return;
        }
        try {
            const response = await axios.post('https://hrms-server-ygpa.onrender.com/user/signUp', inputData);
            console.log(response, "result");
            await fetchData();

        } catch (error) {
            console.error("Error during POST request:", error);
        }
        setOpen(false)
    };


    const handleAction = (idx: number) => {
        axios
            .delete(`https://hrms-server-ygpa.onrender.com/user/${idx}`)
            .then(() => {
                const updatedEmployeeData = userData.filter(
                    (employee: { _id: any; }) => employee._id !== idx
                );

                setUserData(updatedEmployeeData);
            })
            .catch((error) => {
                console.error("Error deleting employee:", error);
            });
    }

    return (
        <Grid>
            <User
                data={userData}
                handleClick={handleClick}
                handleAction={handleAction}
            />
            <UserModal
                open={open}
                inputData={inputData}
                handleChange={handleChange}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />
        </Grid>
    )
}

export default StaffPage
