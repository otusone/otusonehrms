import React, { Fragment } from 'react'
import styles from './RoutesPage.module.scss'
import { Routes, Route } from 'react-router-dom'
import DashboardPage from '../../../pages/DashboardPage/DashboardPage'
import StaffPage from '../../../pages/StaffPage/StaffPage'
import EmployeePage from '../../../pages/EmployeePage/EmployeePage'
import PayrollPage from '../../../pages/PayrollPage/PayrollPage'
import Heading from '../../heading/Heading'
import User from '../../staff/user/User'
import EmployeeProfile from '../../staff/employeeProfile/EmployeeProfile'
import CreateEmployeePage from '../../../pages/CreateEmployeePage/CreateEmployeePage'
import TimeSheet from '../../../pages/TimeSheet/TimeSheet'
import Ticket from '../../../pages/Ticket/Ticket'

const RoutesPage = () => {
    return (
        <Fragment>
            <Heading />
            <Routes>
                <Route path='/' element={<DashboardPage />} />
                <Route path='/user' element={<User />} />
                <Route path='/employee-profile' element={<EmployeeProfile />} />
                <Route path='/employee' element={<EmployeePage />} />
                <Route path='/employee/create-employee' element={<CreateEmployeePage />} />
                {/* <Route path='#' element={<PayrollPage />} /> */}
                <Route path='/timesheet' element={<TimeSheet />} />
                <Route path='/ticket' element={<Ticket />} />
            </Routes>
        </Fragment>
    )
}

export default RoutesPage