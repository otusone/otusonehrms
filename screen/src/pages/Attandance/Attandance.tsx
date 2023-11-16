import React, { useState } from 'react'
import styles from '../TimeSheet/TimeSheet.module.scss'
import { Grid, SelectChangeEvent } from '@mui/material';
import CommonHeading from '../../components/common/CommonHeading/CommonHeading';
import TimesheetFilter from '../../components/timesheetFilter/TimesheetFilter';
import data from './data.json'
import AttandanceModal from '../../components/attandanceModal/AttandanceModal';
import AttandanceTable from '../../components/tableData/attandanceTable/AttandanceTable';

export interface IinputDataType {
    emp_id: string;
    name: string;
    date: string;
    status: string;
    clock_in: string;
    clock_out: string | number;
    late: string;
    early_leaving: string;
    overtime: string
    id: string | number
}
const Attandance = () => {
    const [open, setOpen] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [timesheetTable, setTimesheetTable] = useState<any>(data.tableData)
    const [inputData, setInputData] = useState<any>({ id: "", emp_id: '', name: '', date: '', status: '', clock_in: '', clock_out: "", late: "", early_leaving: "", overtime: "" })
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
        const filteredData = timesheetTable.filter((item: { date: string | number | Date; }) => {
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
        if (inputData.name == "" || inputData.date == "" || inputData.status == "" || inputData.clock_in == "") {
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
        if (inputData.name == "" || inputData.date == "" || inputData.status == "" || inputData.clock_in == "") {
            console.log("please update all the field");
            return;
        } else {
            timesheetTable.map(((item: { id: number; name: string; date: string; status: string; clock_in: string; }) => {
                if (item.id === itemToEdit) {
                    item.name = inputData.name
                    item.date = inputData.date
                    item.status = inputData.status
                    item.clock_in = inputData.clock_in
                }
            }))
        }

        setEditModal(false)
    }

    // const deleteHandler = (itemToDelete: any) => {
    //     const updatedTableData = data.tableData.filter((row: { id: any; }) => row.id !== itemToDelete);
    //     console.log(itemToDelete, "itemToDelete")
    //     setTimesheetTable(updatedTableData)
    // }

    const deleteHandler = (itemToDelete: any) => {
        const updatedTableData = timesheetTable.filter((row: { id: any; }) => row.id !== itemToDelete);
        setTimesheetTable(updatedTableData);
    };
    
    

    return (
        <Grid className={styles.timeSheetContainer}>
            <CommonHeading
                heading={'Attandance'}
                onClick={openModal}
                IsHeadingAction={true}
            />
            <TimesheetFilter
                searchData={searchData}
                handleChange={handleChange}
                handleSearch={handleSearch}
                handleReset={handleReset}
            />
            <AttandanceTable
                tableHeading={data.tableTitle}
                // tableData={data.tableData}
                tableData={timesheetTable}
                IsAction={true}
                editAction={editHandler}
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

export default Attandance;
