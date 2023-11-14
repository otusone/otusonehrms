import React from 'react'
import styles from './Overview.module.scss'
import { Grid } from '@mui/material'
import RoutesPage from '../RoutesPage/RoutesPage'
import Sidebar from '../../sidebar/Sidebar'

const Overview = ({ handleLogout }: any) => {
    return (
        <Grid container className={styles.overviewContainer}>
            <Grid className={styles.overviewSidebar}>
                <Sidebar />
            </Grid>
            <Grid className={styles.overviewRoutesPage}>
                <RoutesPage handleLogout={handleLogout} />
            </Grid>
        </Grid>
    )
}

export default Overview;