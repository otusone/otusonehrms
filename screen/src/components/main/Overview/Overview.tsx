import React from 'react'
import styles from './Overview.module.scss'
import { Grid } from '@mui/material'
import RoutesPage from '../RoutesPage/RoutesPage'
import Sidebar from '../../sidebar/Sidebar'
import { menuData } from '../../sidebar/menuData'
import Heading from '../../../pages/EmpAttendancePage/Heading/Heading'

const Overview = ({ handleLogout }: any) => {
    return (
        <Grid container className={styles.overviewContainer}>
            <Grid className={styles.overviewSidebar}>
                <Sidebar
                    menuData={menuData}
                />
            </Grid>
            <Grid className={styles.overviewRoutesPage}>
                <Heading />
                <RoutesPage handleLogout={handleLogout} />
            </Grid>
        </Grid>
    )
}

export default Overview;