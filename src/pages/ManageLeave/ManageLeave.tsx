import React from 'react'
import styles from './ManageLeave.module.scss'
import { Grid } from '@mui/material'
import CommonHeading from '../../components/common/CommonHeading/CommonHeading'
import { useNavigate } from 'react-router-dom'
import CommonTable from '../../components/common/CommonTable/CommonTable'
import data from './data.json'

const ManageLeave = () => {
    const navigation = useNavigate()
    return (
        <Grid className={styles.manageLeaveContainer}>
            <CommonHeading
                heading={'Manage Leave'}
                onClick={(() => navigation('/'))}
            />
            <CommonTable
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
            />
        </Grid>
    )
}

export default ManageLeave;