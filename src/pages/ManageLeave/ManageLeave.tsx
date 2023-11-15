import React, { useState } from 'react'
import styles from './ManageLeave.module.scss'
import { Grid } from '@mui/material'
import CommonHeading from '../../components/common/CommonHeading/CommonHeading'
import ManageLeaveTable from '../../components/common/ManageLeave/ManageLeaveTable'
import data from './data.json'
import CreateLeaveModal from '../../components/CreateLeaveModal/CreateLeaveModal'
import LeaveActionModal from '../../components/LeaveActionModal/LeaveActionModal'

const ManageLeave = () => {
    const [open, setOpen] = useState(false)
    const [actionModal, setActionModal] = useState(true)
    const openModal = () => setOpen(!open)
    const clossModal = () => setOpen(false)
    const LeaveActionHandler = () => setActionModal(!actionModal)
    const clossActionModal = () => setActionModal(false)
    const leaveEditModal = (itemId: any) => setOpen(!open)

    return (
        <Grid className={styles.manageLeaveContainer}>
            <CommonHeading
                heading={'Manage Leave'}
                onClick={openModal}
            />
            <ManageLeaveTable
                heading={'entries per page'}
                tableData={data.tableData}
                tableTitle={data.tableTitle}
                IsEmployeeID={false}
                IsAction={true}
                IsStatus={false}
                IsProperty={false}
                IsCol_7={true}
                IsManageLeaveStatus={true}
                IsManageLeaveAction={true}
                LeaveActionHandler={LeaveActionHandler}
                editHandler={leaveEditModal}
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