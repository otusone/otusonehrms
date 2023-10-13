import React, { useState } from 'react'
import styles from './Attandance.module.scss'
import { Grid, Typography } from '@mui/material'
import CommonHeading from '../../components/common/CommonHeading/CommonHeading'
import { useNavigate } from 'react-router-dom'
import TimesheetFilter from '../../components/timesheetFilter/TimesheetFilter'
import AttandanceTable from '../../components/table/AttandanceTable/AttandanceTable'
import data from './data.json'
import TimesheetModal from '../../components/attandanceModal/AttandanceModal'

const Attandance = () => {
    const navigation = useNavigate()
    const [open, setOpen] = useState(false)
    const addTable = () => {
        setOpen(!open)
        console.log('hello')
    }
    return (
        <Grid className={styles.attandanceContainer}>
            <CommonHeading
                heading={'Manage Attendance List'}
                onClick={addTable}
            />
            <TimesheetFilter />
            <AttandanceTable
                tableHeading={data.tableTitle}
                tableData={data.tableData}
                IsAction={true}
            />
            <TimesheetModal
                open={false}
                handleClose={function (): void {
                    throw new Error('Function not implemented.')
                }}
            />
        </Grid>
    )
}

export default Attandance;