import React, { useEffect, useState } from "react";
import styles from "./ManageLeave.module.scss";
import { Grid } from "@mui/material";
import CommonHeading from "../../components/common/CommonHeading/CommonHeading";
import ManageLeaveTable from "../../components/common/ManageLeave/ManageLeaveTable";
import data from "./data.json";
import CreateLeaveModal from "../../components/CreateLeaveModal/CreateLeaveModal";
import LeaveActionModal from "../../components/LeaveActionModal/LeaveActionModal";
import axios from "axios";

export interface ManageType {
  emp_id: string;
  name: string;
  status: string;
  leave_type:string;
  start_date:number;
  leave_reason:string;
  total_day:number;
  end_date:number;
  id: string | number;
}

const ManageLeave = () => {
  const [stateData, setStateData] = useState({
    tableData: data.tableData,
  });
  const [open, setOpen] = useState(false);
  const [actionModal, setActionModal] = useState(false);
 
  const [inputData, setInputData] = useState<any>({
    emp_id: "",
    name: "",
    leave_type:"",
    start_date:"",
    end_date:"",
    status: "",
    total_day:"",
    leave_reason:"",
  });
  const [updateLeave, setUpdateLeave] = useState<any>("");
  const openModal = () => setOpen(!open);
  const clossModal = () => setOpen(false);
  const clossActionModal = () => setActionModal(false);

  const [Manageleave, setManageleave] = useState<ManageType[]>([]);
  useEffect(() => {
    axios.get("https://hrms-server-ygpa.onrender.com/leave").then((result) => {
      const data = result.data.leaveData;
      setManageleave(data);
    });
  }, []);

  const handleAction = (Idx:any) => {
    console.log(Idx, "Idx....")
    setActionModal(!actionModal);
    const newData = Manageleave.find(
      (uData: any) => uData.emp_id == Idx
    );
    const emp_id = newData?.emp_id;
    const name = newData?.name;
    const leave_type=newData?.leave_type;
    const start_date = newData?.start_date;
    const end_date = newData?.end_date;
    const total_day = newData?.total_day;
    const leave_reason = newData?.leave_reason;
    const status = newData?.status;
    const itemData = { emp_id, name, leave_type, start_date, end_date, total_day, leave_reason, status };
    setUpdateLeave(itemData);
    console.log(name, "newData");

  };

  console.log(updateLeave.name, "updateLeave");

  return (
    <Grid className={styles.manageLeaveContainer}>
       
      <CommonHeading heading={"Manage Leave"} onClick={openModal} />
      <ManageLeaveTable
        heading={"entries per page"}
        tableData={Manageleave}
        tableTitle={data.tableTitle}
        IsManageLeaveAction={true}
        handleAction={handleAction}
        // newStatus={updateLeave.status}
      />
      <CreateLeaveModal open={open} clossModal={clossModal} />
      <LeaveActionModal
                open={actionModal}
                emp_id={updateLeave.emp_id}
                name={updateLeave.name}
                leave_type={updateLeave.leave_type}
                start_date={updateLeave.start_date}
                end_date={updateLeave.end_date}
                total_day={updateLeave.total_day}
                leave_reason={updateLeave.leave_reason}
                status={updateLeave.status}
                clossModal={clossActionModal}
            />
    </Grid>
  );
};

export default ManageLeave;
