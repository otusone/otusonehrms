import React from 'react'
import styles from './EmployeePage.module.scss'
import { Grid } from '@mui/material'
import CommonHeading from '../../components/common/CommonHeading/CommonHeading'
import EmployeeTable from '../../components/employee/EmployeeTable/EmployeeTable'
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
                heading={'entries per page'}
                tableTitle={data.tableHeading}
                tableData={data.tableData}
                handleLeaveAction={undefined}
                handleEdit={(() => navigation('/employee/edit-employee'))}
                handleDelete={undefined}
            />

            
        </Grid>
    )
}

export default EmployeePage