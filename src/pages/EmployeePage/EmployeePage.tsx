import React from 'react'
import styles from './EmployeePage.module.scss'
import { Grid } from '@mui/material'
import Employee from '../../components/employee/Employee'

const EmployeePage = () => {
    return (
        <Grid>
            <Employee />
        </Grid>
    )
}

export default EmployeePage