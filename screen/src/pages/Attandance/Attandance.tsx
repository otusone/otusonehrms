import React, { useState, useEffect } from 'react'
import styles from '../TimeSheet/TimeSheet.module.scss'
import { Grid, SelectChangeEvent } from '@mui/material';
import CommonHeading from '../../components/common/CommonHeading/CommonHeading';
import TimesheetFilter from '../../components/timesheetFilter/TimesheetFilter';
import data from './data.json'
import AttandanceModal from '../../components/attandanceModal/AttandanceModal';
import AttandanceTable from '../../components/tableData/attandanceTable/AttandanceTable';
import axios from 'axios';

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
    const [inputData, setInputData] = useState<any>({ id: "", emp_id: '', name: '', date: '', status: '', clock_in: '', clock_out: "", email: "" })
    const [searchData, setSearchDeta] = useState({ startDate: "", endDate: "" })
    const [itemToEdit, setItemToEdit] = useState(null);
    const openModal = () => setOpen(!open)
    const handleClose = () => setOpen(false)
    const clossEditModal = () => setEditModal(false)
    const [attandenceTable, setattandenceTable] = useState<IinputDataType[]>([]);
    const [loading, setLoading] = useState(false)

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


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await axios.get("https://hrms-server-ygpa.onrender.com/empAttendance");
                const data = result.data.EmpAttendanceData;
                setattandenceTable(data);
                console.log(data, "result");
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const createNewTimesheet = () => {
        let id = timesheetTable.length + 1
        inputData.id = id;
        if (inputData.name == "" || inputData.emp_id == "" || inputData.date == "" || inputData.status == "" || inputData.clock_in == "" || inputData.email == "" || inputData.clock_out == "" || inputData.date == "") {
            console.log("please fill employee name!");
            return;
        } else {
            setTimesheetTable([...timesheetTable, inputData]);
        }
        setOpen(false);
    }

    const editTimesheet = () => {
        if (inputData.name == "" || inputData.date == "" || inputData.status == "" || inputData.clock_in == "") {
            console.log("please update all the field");
            return;
        } else {
            timesheetTable.map(((item: { id: number; emp_id: string, name: string; date: string; status: string; clock_in: string; clock_out: string }) => {
                if (item.id === itemToEdit) {
                    item.emp_id = inputData.emp_id
                    item.name = inputData.name
                    item.date = inputData.date
                    item.status = inputData.status
                    item.clock_in = inputData.clock_in
                    item.clock_out = inputData.clock_out
                }
            }))
        }
        setEditModal(false)
    }


    return (
        <Grid className={styles.timeSheetContainer}>
            <CommonHeading
                heading={'Attandance'}
                onClick={openModal}
                IsHeadingAction={false}
            />
            <AttandanceTable
                tableHeading={data.tableTitle}
                tableData={attandenceTable}
                loading={loading}
            />
        </Grid>
    )
}

export default Attandance;
