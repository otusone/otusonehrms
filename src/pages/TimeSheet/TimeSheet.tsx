import React, { useState } from 'react'
import styles from './TimeSheet.module.scss'
import { Grid } from '@mui/material';
import CommonHeading from '../../components/common/CommonHeading/CommonHeading';
import TimesheetFilter from '../../components/timesheetFilter/TimesheetFilter';
import data from './data.json'
import TimesheetTable from '../../components/table/TimesheetTable';
import AttandanceModal from '../../components/attandanceModal/AttandanceModal';

const TimeSheet = () => {
    const [open, setOpen] = useState(false)
    const openModal = () => {
        setOpen(!open)
    }
    return (
        <Grid className={styles.timeSheetContainer}>
            <CommonHeading
                heading={'Manage Timesheet'}
                onClick={openModal}
            />
            <TimesheetFilter />
            <TimesheetTable
                tableHeading={data.tableTitle}
                tableData={data.tableData}
                IsAction={true}
            />
            <AttandanceModal open={open} handleClose={function (): void {
                throw new Error('Function not implemented.');
            }} />
        </Grid>
    )
}

export default TimeSheet;