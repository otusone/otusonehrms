import React from 'react'
import styles from './Employee.module.scss'
import { Grid, Typography } from '@mui/material'
import CommonTable from '../common/CommonTable/CommonTable'
import data from './data.json'
import CommonHeading from '../common/CommonHeading/CommonHeading'
import { useNavigate } from 'react-router-dom'

const Employee = () => {
    const navigation = useNavigate()
    return (
        <Grid className={styles.employeeContainer}>
            <CommonHeading
                heading={''}
                onClick={(() => navigation('/employee/create-employee'))}
            />
            <CommonTable
                heading={'entries per page'}
                tableData={data.tableData}
                tableTitle={data.tableTitle}
                IsEmployeeID={true}
                IsAction={true}
                IsStatus={false}
                IsProperty={false}
                IsCol_7={true} IsManageLeaveStatus={false}
                IsManageLeaveAction={false}
            />
        </Grid>
    )
}

export default Employee