import React from 'react'
import styles from './Overview.module.scss'
import { Grid } from '@mui/material'
import Sidebar from '../../sidebar/Sidebar'
import RoutesPage from '../RoutesPage/RoutesPage'
import Demo from '../../demo/Demo'

const Overview = () => {
    return (
        <Grid container className={styles.overviewContainer}>
            <Grid className={styles.overviewSidebar}>
                {/* <Sidebar /> */}
                <Demo />
            </Grid>
            <Grid className={styles.overviewRoutesPage}>
                <RoutesPage />
            </Grid>
        </Grid>
    )
}

export default Overview;