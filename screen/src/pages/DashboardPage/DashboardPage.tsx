import React, { Fragment } from 'react'
import styles from './DashboardPage.module.scss'
import Dashboard from '../../components/dashboard/Dashboard'
import Heading from '../../components/heading/Heading'

const DashboardPage = () => {
    return (
        <Fragment>
            <Heading/>
            <Dashboard />
        </Fragment>
    )
}

export default DashboardPage