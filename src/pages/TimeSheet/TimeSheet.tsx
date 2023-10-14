import React, { useState, useEffect } from 'react'
import styles from './TimeSheet.module.scss'
import { Grid, SelectChangeEvent } from '@mui/material';
import CommonHeading from '../../components/common/CommonHeading/CommonHeading';
import TimesheetFilter from '../../components/timesheetFilter/TimesheetFilter';
import data from './data.json'
import TimesheetTable from '../../components/table/TimesheetTable';
import AttandanceModal from '../../components/attandanceModal/AttandanceModal';
import DeleteModal from '../../components/deleteModal/DeleteModal';

const TimeSheet = () => {
    const [open, setOpen] = useState(false)
    const [itemData, setItemData] = useState([]);

    const openModal = () => setOpen(!open)
    const handleClose = () => setOpen(false)
    const [inputData, setInputData] = useState({
        employee: '',
        hours: '',
        remark: '',
        date: ''
    })
    console.log(inputData, "inputData")
    const handleChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
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
            <AttandanceModal
                heading={'Create New Timesheet'}
                open={open}
                handleClose={handleClose}
                inputData={inputData}
                handleChange={handleChange}
            />

        </Grid>
    )
}

export default TimeSheet;