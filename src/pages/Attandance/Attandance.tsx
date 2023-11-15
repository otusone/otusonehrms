import React, { useState } from 'react'
import styles from './Attandance.module.scss'
import { Grid } from '@mui/material'
import CommonHeading from '../../components/common/CommonHeading/CommonHeading'
import TimesheetFilter from '../../components/timesheetFilter/TimesheetFilter'
import AttandanceTable from '../../components/table/AttandanceTable/AttandanceTable'
import data from './data.json'
import TimesheetModal from '../../components/attandanceModal/AttandanceModal'
import EditAttandanceModal from '../../components/EditAttandanceModal/EditAttandanceModal'

const Attandance = () => {
    const [open, setOpen] = useState(false)
    const [inputData, setInputData] = useState({ employee: '', date: "", clock_in: '', clock_out: '' })
    const openModal = (itemID: number) => setOpen(!open)
    const clossModal = () => setOpen(false)
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setInputData({ ...inputData, [name]: value })
    }

    return (
        <Grid className={styles.attandanceContainer}>
            <CommonHeading
                heading={'Manage Attendance List'}
            />
            {/* <TimesheetFilter /> */}
            <AttandanceTable
                tableHeading={data.tableTitle}
                tableData={data.tableData}
                IsAction={true}
                editAction={openModal}
            />
            <TimesheetModal
                open={false}
                handleClose={function (): void {
                    throw new Error('Function not implemented.')
                }}
            />
            <EditAttandanceModal
                open={open}
                inputData={inputData}
                handleChange={handleChange}
                clossModal={clossModal}
            />
        </Grid>
    )
}

export default Attandance;