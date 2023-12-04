import React, { Fragment, useState } from 'react'
import styles from './DashboardPage.module.scss'
import Dashboard from '../../components/dashboard/Dashboard'
import CustomLoader from '../../components/CustomLoader/CustomLoader'

const DashboardPage = () => {
    const [loading, setLoading] = useState(false)
    return (
        <Fragment>
            {loading ? <CustomLoader /> : <Dashboard />}
        </Fragment>
    )
}

export default DashboardPage