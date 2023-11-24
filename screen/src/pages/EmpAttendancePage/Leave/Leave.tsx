import React, { useState } from 'react'
import { Grid } from '@mui/material'
import LeaveTable from '../../../components/tableData/leaveTable/LeaveTable';
import leaveData from '../../../data/leaveTable.json'
import HeadingText from '../../../components/HeadingText/HeadingText';
import CreateLeaveModal from '../../../components/modal/CreateLeaveModal/CreateLeaveModal';

const Leave = () => {
    const [open, setOpen] = useState(false)
    const [inputData, setInputData] = useState({
        emp_id: '', name: '', start_date: '', end_date: '', leave_type: '', leave_reason: '', remark: ''
    });
    const handleModal = () => setOpen(!open)
    const handleClose = () => setOpen(false)
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
    }

    return (
        <Grid>
            <HeadingText
                heading={'Leave'}
                IsAction={true}
                handleClick={handleModal} />
            <LeaveTable
                data={leaveData}
            />
            <CreateLeaveModal
                open={open}
                handleClose={handleClose}
                inputData={inputData}
                handleChange={handleChange}
            />

        </Grid>
    )
}

export default Leave;