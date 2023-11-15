import React, { useState } from 'react'
import styles from './StaffPage.module.scss'
import { Grid, Typography } from '@mui/material'
import User from '../../components/staff/user/User'
import UserModal from '../../components/userModal/UserModal'

const StaffPage = () => {
    const [open, setOpen] = useState(true);
    const [inputData, setInputData] = useState({ name: "", email: "", password: '' })

    const handleClick = () => setOpen(!open);
    const handleClose = () => setOpen(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    }
    const handleCreate = () => {

    }

    return (
        <Grid>
            <User
                handleClick={handleClick}
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