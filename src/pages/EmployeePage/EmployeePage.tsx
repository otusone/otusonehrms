import React from 'react'
import styles from './EmployeePage.module.scss'
import { Grid } from '@mui/material'
import CommonHeading from '../../components/common/CommonHeading/CommonHeading'
import EmployeeTable from '../../components/tableData/employeeTable/EmployeeTable'
import data from './data.json'
import { useNavigate } from 'react-router-dom'

const EmployeePage = () => {
    const navigation = useNavigate()

    return (
        <Grid className={styles.employeePageContainer}>
            <CommonHeading
                heading={'Manage Employee'}
                IsHeadingAction={true}
                onClick={(() => navigation('/employee/create-employee'))}
            />
            <EmployeeTable
                heading={''}
                tableTitle={data.tableTitle}
                tableData={data.tableData}
                handleLeaveAction={undefined}
                handleEdit={undefined}
                handleDelete={undefined}
            />
        </Grid>
    )
}

export default EmployeePage