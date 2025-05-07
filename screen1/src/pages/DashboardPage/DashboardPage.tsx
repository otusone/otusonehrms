import React, { Fragment, useEffect, useState } from 'react'
import styles from './DashboardPage.module.scss'
import Dashboard from '../../components/dashboard/Dashboard'
import CustomLoader from '../../components/CustomLoader/CustomLoader'
import axios from 'axios'

const DashboardPage = () => {
    const [loading, setLoading] = useState(false)
    const [anouncementData, setAnouncement] = useState()
    const [inputData, setInputData] = useState<any>({ title: "", start_date: '', start_time: "", description: "" })
    const [open, setOpen] = useState(false);
    const handleModal = () => setOpen(!open)
    const [editModal, setEditModal] = useState(false);
    const handleClose = () => { setOpen(false); setEditModal(false) }
    const [selectedId, setSelectedId] = useState<any>('')

    const handleEditModal = async (idx: any) => {
        try {
            setEditModal((presState: any) => ({ ...presState, [idx]: !presState[idx] }))
            setSelectedId(idx)
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/anouncement`)
            const data = response.data.anouncementData;
            const filteredData = data.filter((item: any) => item._id === idx)
            setInputData({
                title: filteredData[0].title,
                start_date: filteredData[0].start_date,
                start_time: filteredData[0].start_time,
                description: filteredData[0].description
            })
        } catch (err) {
            console.log(err)
        }
    }
    const handleEdit = async () => {

        try {
            await axios.put(`https://hrms-server-ygpa.onrender.com/anouncement/${selectedId}`, inputData)
            await getData();
        } catch (err) {
            console.error(err)
        } finally {
            setEditModal(false)
        }
    }
    const handleDelete = async (idx: any) => {
        try {
            await axios.delete(`https://hrms-server-ygpa.onrender.com/anouncement/${idx}`)
            await getData();
        } catch (err) {
            console.error(err)
        } finally {

        }

    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
    }
    const getData = async () => {
        const response = await axios.get(`https://hrms-server-ygpa.onrender.com/anouncement`)
        const data = response.data.anouncementData;
        setAnouncement(data)
    }
    const handleCreate = async () => {
        try {
            const response = await axios.post(`https://hrms-server-ygpa.onrender.com/anouncement/create`, inputData)
            console.log(response, "response...")
            await getData();

        } catch (err) {
            console.log(err)
        } finally {
            setOpen(false)
        }

    }
    useEffect(() => {
        getData()

    }, [])
    return (
        <Fragment>
            {loading ?
                <CustomLoader />
                :
                <Dashboard
                    announcementData={anouncementData}
                    handleCreate={handleCreate}
                    handleEdit={handleEdit}
                    inputData={inputData}
                    handleChange={handleChange}
                    handleEditModal={handleEditModal}
                    handleClose={handleClose}
                    editModal={editModal}
                    handleModal={handleModal}
                    open={open}
                    handleDelete={handleDelete}
                />
            }
        </Fragment>
    )
}

export default DashboardPage