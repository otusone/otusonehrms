import React, { useEffect, useState } from 'react'
import styles from './ManageLeave.module.scss'
import { Grid } from '@mui/material'
import CommonHeading from '../../components/common/CommonHeading/CommonHeading'
import ManageLeaveTable from '../../components/common/ManageLeave/ManageLeaveTable'
import data from './data.json'
import CreateLeaveModal from '../../components/CreateLeaveModal/CreateLeaveModal'
import LeaveActionModal from '../../components/LeaveActionModal/LeaveActionModal'
import axios from 'axios'



export interface ManageType {
    emp_id: string;
    name: string;
    status: string;
    id: string | number
}


const ManageLeave = () => {
    const [stateData, setStateData] = useState({
        tableData: data.tableData,
    });
    const [open, setOpen] = useState(false)
    const [actionModal, setActionModal] = useState(false)
    const [inputData, setInputData] = useState<any>({ emp_id: "",  name: '', status: '', })
    const openModal = () => setOpen(!open)
    const clossModal = () => setOpen(false)
    const leaveActionHandler = () => setActionModal(!actionModal)
    const clossActionModal = () => setActionModal(false)
    const leaveEditModal = (itemId: any) => setOpen(!open);
    const editHandler = () => { };
    // const deleteHandler = () => { };

// /////////////////////////////api integration///////////////////////////////////////////


const [Manageleave, setManageleave] = useState<ManageType[]>([]);
    useEffect(() => {
      axios
        .get("https://hrms-server-ygpa.onrender.com/leave")
        .then((result) => {
          const data = result.data.leaveData;          ;
          setManageleave(data);
          console.log(data, "result");
        });
    }, []) ;
    console.log(Manageleave, "Manageleave");











////////////////////////////////////////////////////////////////




      
    const deleteHandler = (itemId: any) => {
        const updatedTableData = stateData.tableData.filter((item) => item.id !== itemId);    
        setStateData({ ...stateData, tableData: updatedTableData });
    };

    return (
        <Grid className={styles.manageLeaveContainer}>
            <CommonHeading
                heading={'Manage Leave'}
                onClick={openModal}
            />
            <ManageLeaveTable
                heading={'entries per page'}
                tableData={Manageleave}
                tableTitle={data.tableTitle}
                IsManageLeaveAction={true}
                leaveActionHandler={leaveActionHandler}
                editHandler={editHandler}
                deleteHandler={deleteHandler}
            />
            <CreateLeaveModal
                open={open}
                clossModal={clossModal}
            />
            <LeaveActionModal
                open={actionModal}
                clossModal={clossActionModal}
            />
        </Grid>
    )
}

export default ManageLeave;