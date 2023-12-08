import React, { useEffect, useState } from "react";
import styles from "./ManageLeave.module.scss";
import { Grid } from "@mui/material";
import CommonHeading from "../../components/common/CommonHeading/CommonHeading";
import ManageLeaveTable from "../../components/common/ManageLeave/ManageLeaveTable";
import data from "./data.json";
import LeaveActionModal from "../../components/LeaveActionModal/LeaveActionModal";
import axios from "axios";

export interface ManageType {
  emp_id: string;
  name: string;
  status: string;
  leave_type: string;
  start_date: number;
  leave_reason: string;
  total_day: number;
  end_date: number;
  id: string | number;
}

const ManageLeave = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false);
  const [leaveData, setLeaveData] = useState<any>();
  const handleClose = () => setOpen(false);
  const [selectedLeave, setSelectedLeave] = useState<any>()
  const [name, setName] = useState<any>()
  const [empId, setEmpId] = useState<any>()
  const [leaveType, setLeaveType] = useState<any>()
  const [startDate, setStartDate] = useState<any>()
  const [endDate, setEndDate] = useState<any>()
  const [totalLeave, setTotaleLeave] = useState<any>()
  const [leaveReason, setLeaveReason] = useState<any>()

  const getData = async () => {
    try {
      setLoading(true)
      const response = await axios.get('https://hrms-server-ygpa.onrender.com/empLeave')
      setLeaveData(response.data.leaveData)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getData();
  }, [])

  const handleAction = (idx: any) => {
    setOpen((preState: any) => ({
      ...preState, [idx]: !preState[idx]
    }))
    const newData = leaveData.filter((item: any) => item._id === idx)
    const id = newData[0]._id;
    const name = newData[0].name;
    const empId = newData[0].emp_id;
    const leaveType = newData[0].leave_type;
    const startDate = newData[0].start_date;
    const endDate = newData[0].end_date;
    const totalLeave = newData[0].total_day;
    const leaveReason = newData[0].leave_reason;
    const status = newData[0].status;
    console.log(newData, "newData...")
    setSelectedLeave(id)
    setName(name)
    setEmpId(empId)
    setLeaveType(leaveType)
    setStartDate(startDate)
    setEndDate(endDate)
    setTotaleLeave(totalLeave)
    setLeaveReason(leaveReason)
  }
  const handleApproved = async () => {
    try {
      axios.put(`https://hrms-server-ygpa.onrender.com/empLeave/${selectedLeave}`, { status: "Approved" })
      await getData();
    } catch (error) {
      console.log(error)
    } finally {
      setOpen(false)
    }

  }
  const handleReject = async () => {
    try {
      axios.put(`https://hrms-server-ygpa.onrender.com/empLeave/${selectedLeave}`, { status: "Rejected" })
      await getData();
    } catch (error) {
      console.log(error)
    } finally {
      setOpen(false)
    }

  }
  return (
    <Grid className={styles.manageLeaveContainer}>
      <CommonHeading heading={"Manage Leave"} />
      <ManageLeaveTable
        query={query}
        setQuery={setQuery}
        heading={""}
        tableData={leaveData}
        tableTitle={data.tableTitle}
        IsManageLeaveAction={true}
        handleAction={handleAction}
        loading={loading}
      />
      <LeaveActionModal
        open={open}
        name={name}
        empId={empId}
        leaveType={leaveType}
        startDate={startDate}
        endDate={endDate}
        totalLeave={totalLeave}
        leaveReason={leaveReason}
        handleClose={handleClose}
        handleApproved={handleApproved}
        handleReject={handleReject}
      />
    </Grid>
  );
};

export default ManageLeave;
