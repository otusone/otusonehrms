import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import LeaveTable from '../../../components/tableData/leaveTable/LeaveTable';
import HeadingText from '../../../components/HeadingText/HeadingText';
import LeaveModal from '../../../components/modal/LeaveModal/LeaveModal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Leave = () => {
    const [open, setOpen] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(false)
    const [emp_id, setEmpId] = useState(false)
    const [leaveId, setLeaveId] = useState<string>()
    const [inputData, setInputData] = useState({
        emp_id: '', name: '', start_date: '', end_date: '', leave_type: '', leave_reason: '', remark: ''
    });
    const [leaveData, setLeaveData] = useState<any>('')
    const handleModal = () => setOpen(!open)
    const handleClose = () => setOpen(false)
    const handleEditClose = () => setEditModal(false)

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
    };

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = axios.get('https://hrms-server-ygpa.onrender.com/empLeave')
            const data = (await response).data.leaveData;
            setLeaveData(data)

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
        const dataString: any = localStorage.getItem("loginedUser");
        const userData = JSON.parse(dataString);
        const { emp_id, name } = userData;
        setName(name);
        setEmpId(emp_id)
    }, []);

    const handleClick = async () => {
        if (inputData.start_date == '' ||
            inputData.end_date == '' ||
            inputData.leave_reason == '' ||
            inputData.leave_type == '') {
            toast.error("Please fill all the field!")
            return;
        }
        try {
            const response = await axios.post('https://hrms-server-ygpa.onrender.com/empLeave/create', { name, emp_id, start_date: inputData.start_date, end_date: inputData.end_date, leave_reason: inputData.leave_reason, leave_type: inputData.leave_type });
            await fetchData();
            console.log(response, "response..")
            if (response.status === 200) {
                toast.success("Leave successfully created");
            } else {
                toast.error("Failed to create leave");
            }
        } catch (error) {

            console.error('Error:', error);
        } finally {
            setOpen(false)
        }
    };

    const handleDelete = async (idx: string) => {
        setLoading(true)
        try {
            await axios.delete(`https://hrms-server-ygpa.onrender.com/empLeave/${idx}`);
            setLeaveData((prevLeaveData: any) => {
                return prevLeaveData.filter((leave: { _id: string }) => leave._id !== idx);
            });
        } catch (error) {
            console.error('Error deleting data:', error);
        } finally {
            setLoading(false)
        }
    };

    const handleEdit = (idx: string) => {

        setEditModal((preState: any) => ({
            ...preState, [idx]: !preState[idx]
        }))
        setLeaveId(idx)
    }
    const handleEditLeave = async () => {
        setLoading(true)
        try {
            const response = await axios.put(`https://hrms-server-ygpa.onrender.com/empLeave/${leaveId}`, inputData)

            setLeaveData((prevLeaveData: any[]) => {
                const updatedLeaveData = prevLeaveData.map(leave => {
                    if (leave._id === leaveId) {

                        return { ...leave, ...response.data };
                    }
                    return leave;
                });

                return updatedLeaveData;
            });
        } catch (error) {
            console.log(error)
        } finally {
            setEditModal(false)
            setLoading(false)
        }
    }

    return (
        <Grid>
            <HeadingText
                heading={'Leave'}
                IsAction={true}
                handleClick={handleModal} />
            <LeaveTable
                data={leaveData}
                loading={loading}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
            <LeaveModal
                open={open}
                heading={"Create New Leave"}
                handleClose={handleClose}
                inputData={inputData}
                handleChange={handleChange}
                handleClick={handleClick}
            />
            <LeaveModal
                open={editModal}
                heading={"Edit Leave"}
                handleClose={handleEditClose}
                inputData={inputData}
                handleChange={handleChange}
                handleClick={handleEditLeave}
            />
            <ToastContainer />
        </Grid>
    )
}

export default Leave;