import React from 'react'
import styles from './EmpAttendancePage.module.scss'
import { Box, Grid } from '@mui/material'
import EmpAttendance from '../../components/empAttendance/EmpAttendance'
import img from '../../asserst/images/logo.png'
import HeadingProfile from '../../components/heading/headingProfile/HeadingProfile'

const EmpAttendancePage = () => {
    return (
        <Grid className={styles.empAttendancePageContainer}>
            <Grid className={styles.logo}>
                <Box>
                    <img src={img} alt='img' />
                </Box>
                <HeadingProfile name={'Anuj'} />
            </Grid>
            <EmpAttendance />
        </Grid>
    )
}

export default EmpAttendancePage    