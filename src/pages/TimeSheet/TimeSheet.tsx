import React, { useState, useEffect } from 'react'
import styles from './TimeSheet.module.scss'
import { Grid, SelectChangeEvent } from '@mui/material';
import CommonHeading from '../../components/common/CommonHeading/CommonHeading';
import TimesheetFilter from '../../components/timesheetFilter/TimesheetFilter';
import data from './data.json'
import TimesheetTable from '../../components/table/TimesheetTable';
import AttandanceModal from '../../components/attandanceModal/AttandanceModal';
import DeleteModal from '../../components/deleteModal/DeleteModal';

export interface IinputDataType {
    [x: string]: any;
    employee: string;
    hours: string;
    remark: string;
    date: string;
}
const TimeSheet = () => {
    const [open, setOpen] = useState(false)
    const [timesheetTable, setTimesheetTable] = useState<IinputDataType[]>(data.tableData)
    const [inputData, setInputData] = useState<IinputDataType>({ employee: '', hours: '', remark: '', date: '' })

    const openModal = () => setOpen(!open)
    const handleClose = () => setOpen(false)
    const handleChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
    }
    const employeeData = {
        employee: inputData.employee,
        hours: inputData.hours,
        date: inputData.date,
        remark: inputData.remark

    }
    const createHandler = () => {
        setTimesheetTable([...timesheetTable, inputData])
        localStorage.setItem("data", JSON.stringify(employeeData))
    }
    const deleteTableHandler = (itemID: any) => { console.log(itemID, "hi") }
    const deleteHandler = (itemID: any) => {
        const newTimesheetTable = timesheetTable.filter((item) => item.id !== itemID)
        setTimesheetTable(newTimesheetTable)
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
                tableData={timesheetTable}
                IsAction={true}
                deleteTable={deleteTableHandler}
                deleteHandler={deleteHandler}
            />
            <AttandanceModal
                heading={'Create New Timesheet'}
                open={open}
                handleClose={handleClose}
                inputData={inputData}
                handleChange={handleChange}
                createHandler={createHandler}
            />
        </Grid>
    )
}

export default TimeSheet;