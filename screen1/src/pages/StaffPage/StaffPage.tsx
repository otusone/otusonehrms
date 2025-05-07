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
    const [loading, setLoading] = useState(false)


    const handleClick = () => setOpen(!open);
    const handleClose = () => setOpen(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    }

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://hrms-server-ygpa.onrender.com/user');
            const users = response.data.userData;
            setUserData(users);
        } catch (error) {
            console.error("Error during GET request:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async () => {
        try {
            if (!inputData.username || !inputData.email || !inputData.password) {
                console.log("Please fill in all the required fields.");
                return;
            }

            setLoading(true);

            const response = await axios.post('https://hrms-server-ygpa.onrender.com/user/signUp', inputData);

            console.log("Successful POST request:", response);

            await fetchData();
        } catch (error) {
            console.error("Error during POST request:", error);

        } finally {
            setOpen(false);
        }
    };

    const handleAction = async (idx: number) => {
        try {
            setLoading(true)
            const response = await axios.delete(`https://hrms-server-ygpa.onrender.com/user/${idx}`);

            if (response.status === 200) {

                const updatedEmployeeData = userData.filter(
                    (employee: { _id: any; }) => employee._id !== idx
                );

                setUserData(updatedEmployeeData);
                console.log("Employee deleted successfully.");
            } else {
                console.error(`Failed to delete employee. Server responded with status ${response.status}`);
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
        } finally {
            setOpen(false);
            setLoading(false)
        }
    };


    return (
        <Grid>
            <User
                data={userData}
                handleClick={handleClick}
                handleAction={handleAction}
                loading={loading}
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
