import React, { useState } from 'react'
import styles from './ManageLeave.module.scss'
import { Grid } from '@mui/material'
import CommonHeading from '../../components/common/CommonHeading/CommonHeading'
import ManageLeaveTable from '../../components/common/ManageLeave/ManageLeaveTable'
import data from './data.json'
import CreateLeaveModal from '../../components/CreateLeaveModal/CreateLeaveModal'
import LeaveActionModal from '../../components/LeaveActionModal/LeaveActionModal'

const ManageLeave = () => {
    const [stateData, setStateData] = useState({
        tableData: data.tableData,
    });
    const [open, setOpen] = useState(false)
    const [actionModal, setActionModal] = useState(true)
    const openModal = () => setOpen(!open)
    const clossModal = () => setOpen(false)
    const leaveActionHandler = () => setActionModal(!actionModal)
    const clossActionModal = () => setActionModal(false)
    const leaveEditModal = (itemId: any) => setOpen(!open);
    const editHandler = () => { };
    // const deleteHandler = () => { };


      
    const deleteHandler = (itemId: any) => {
        // console.log('Deleting item with ID:', itemId);
        const updatedTableData = stateData.tableData.filter((item) => item.id !== itemId);
        // console.log('Updated Table Data:', updatedTableData);
    
        setStateData({ ...stateData, tableData: updatedTableData });
    };

    return (
        <Grid className={styles.manageLeaveContainer}>
            <CommonHeading
                heading={'Manage Leave'}
                onClick={openModal}
            />
            <ManageLeaveTable
                heading={'entries per page'}
                tableData={stateData.tableData}
                tableTitle={data.tableTitle}
                IsManageLeaveAction={true}
                leaveActionHandler={leaveActionHandler}
                editHandler={editHandler}
                deleteHandler={deleteHandler}
            />
            <CreateLeaveModal
                open={open}
                clossModal={clossModal}
            />
            <LeaveActionModal
                open={actionModal}
                clossModal={clossActionModal}
            />
        </Grid>
    )
}

export default ManageLeave;