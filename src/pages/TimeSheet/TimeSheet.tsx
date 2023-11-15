import React, { useState } from 'react'
import styles from './TimeSheet.module.scss'
import { Grid, SelectChangeEvent } from '@mui/material';
import CommonHeading from '../../components/common/CommonHeading/CommonHeading';
import TimesheetFilter from '../../components/timesheetFilter/TimesheetFilter';
import data from './data.json'
import TimesheetTable from '../../components/table/TimesheetTable';
import AttandanceModal from '../../components/attandanceModal/AttandanceModal';

export interface IinputDataType {
    emp_id: string;
    employee: string;
    hours: string;
    remark: string;
    date: string;
    id: string | number;
}
const TimeSheet = () => {
    const [open, setOpen] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [timesheetTable, setTimesheetTable] = useState<IinputDataType[]>(data.tableData)
    const [inputData, setInputData] = useState<IinputDataType>({ id: "", emp_id: '', employee: '', hours: '', remark: '', date: '' })
    const [searchData, setSearchDeta] = useState({ startDate: "", endDate: "" })
    const [itemToEdit, setItemToEdit] = useState(null);
    const openModal = () => setOpen(!open)
    const handleClose = () => setOpen(false)
    const clossEditModal = () => setEditModal(false)

    const handleChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
        setSearchDeta({ ...searchData, [name]: value });
    }
    const handleSearch = () => {
        const { startDate, endDate } = searchData;
        const filteredData = timesheetTable.filter(item => {
            const itemDate = new Date(item.date);
            return (
                (!startDate || itemDate >= new Date(startDate)) &&
                (!endDate || itemDate <= new Date(endDate))
            );
        });
        setTimesheetTable(filteredData)
    }
    const handleReset = () => {
        setTimesheetTable(timesheetTable)
        console.log(timesheetTable, "timesheetTable")
    }

    const createNewTimesheet = () => {
        let id = timesheetTable.length + 1
        inputData.id = id;
        if (inputData.employee == "" || inputData.date == "" || inputData.hours == "" || inputData.remark == "") {
            console.log("please fill employee name!");
            return;
        } else {
            setTimesheetTable([...timesheetTable, inputData]);
        }
        setOpen(false);
    }

    const editHandler = (itemToEdit: any) => {
        setItemToEdit(itemToEdit);
        setEditModal(!editModal)
    }
    const editTimesheet = () => {
        if (inputData.employee == "" || inputData.date == "" || inputData.hours == "" || inputData.remark == "") {
            console.log("please update all the field");
            return;
        } else {
            timesheetTable.map((item => {
                if (item.id === itemToEdit) {
                    item.employee = inputData.employee
                    item.date = inputData.date
                    item.hours = inputData.hours
                    item.remark = inputData.remark
                }
            }))
        }

        setEditModal(false)
    }

    const deleteHandler = (itemToDelete: any) => {
        const updatedTableData = timesheetTable.filter((row) => row.id !== itemToDelete);
        console.log(itemToDelete, "itemToDelete")
        setTimesheetTable(updatedTableData)
    }
    return (
        <Grid className={styles.timeSheetContainer}>
            <CommonHeading
                heading={'Manage Timesheet'}
                onClick={openModal}
                IsHeadingAction={true}
            />
            <TimesheetFilter
                searchData={searchData}
                handleChange={handleChange}
                handleSearch={handleSearch}
                handleReset={handleReset}
            />
            <TimesheetTable
                tableHeading={data.tableTitle}
                tableData={timesheetTable}
                IsAction={true}
                editHandler={editHandler}
                deleteHandler={deleteHandler}
            />
            <AttandanceModal
                heading={'Create New Timesheet'}
                open={open}
                handleClose={handleClose}
                inputData={inputData}
                handleChange={handleChange}
                modalAction={createNewTimesheet}
                buttonOne='Closs'
                buttonTwo='Create'
            />
            <AttandanceModal
                heading="Edit Timesheet"
                open={editModal}
                handleClose={clossEditModal}
                inputData={inputData}
                handleChange={handleChange}
                modalAction={editTimesheet}
                buttonOne='Closs'
                buttonTwo='Update'
            />
        </Grid>
    )
}

export default TimeSheet;