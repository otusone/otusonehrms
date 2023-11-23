import React, { useEffect, useState } from "react";
import styles from "./EmployeePage.module.scss";
import { Grid } from "@mui/material";
import CommonHeading from "../../components/common/CommonHeading/CommonHeading";
import EmployeeTable from "../../components/tableData/employeeTable/EmployeeTable";
import data from "./data.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserModel from "../../components/userModal/UserModel";
import ViewDetailsModal from "../../components/viewDetailsModal/ViewDetailsModal";

const EmployeePage = () => {
  const [query, setQuery] = useState("");
  const [employeeData, setEmployeeData] = useState<any>([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [open, setOpen] = useState(true);

  const [updateLeave, setUpdateLeave] = useState<any>("");

  const navigation = useNavigate();

  const handleClose = () => setOpen(false);
  const [actionModal, setActionModal] = useState(false);

  const handleview = (emp_id: any) => {
   
    const selectedEmployee = employeeData.find(
      (employee: { emp_id: any }) => employee.emp_id === emp_id
    );
    console.log(emp_id, "Idx....");
    setActionModal(!actionModal);
    const newData = employeeData.find((uData: any) => uData.emp_id == emp_id);

    const { name, gender, address,branch, phone, role,accHolderName, accNumber,bankName,dateOfJoin,department,designation,resume,photo,email} = newData
    setSelectedEmployee(selectedEmployee);
    setOpen(!open);
    const itemData = { name, gender, address,branch, phone, role,accHolderName, accNumber,bankName,dateOfJoin,department,designation,resume,photo,email};
    setUpdateLeave(itemData);
    console.log(selectedEmployee, "employeesesesesesesese");
    console.log(gender,"gender");
  };


  useEffect(() => {
    axios
      .get("https://hrms-server-ygpa.onrender.com/employee")
      .then((result) => {
        const data = result.data.employeeData;
        setEmployeeData(data);
        setSelectedEmployee(selectedEmployee);
      });
  }, []);

  const handleDelete = (employeeId: any) => {
    axios
      .delete(`https://hrms-server-ygpa.onrender.com/employee/${employeeId}`)
      .then(() => {
        const updatedEmployeeData = employeeData.filter(
          (employee: { _id: any }) => employee._id !== employeeId
        );

        setEmployeeData(updatedEmployeeData);
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  return (
    <Grid className={styles.employeePageContainer}>
      <CommonHeading
        heading={"Manage Employee"}
        IsHeadingAction={true}
        onClick={() => navigation("/employee/create-employee")}
      />
      <EmployeeTable
        heading={""}
        tableTitle={data.tableTitle}
        tableData={employeeData}
        handleLeaveAction={undefined}
        handleEdit={undefined}
        handleDelete={handleDelete}
        setQuery={setQuery}
        query={query}
        handleview={handleview}
      />
      {/* <UserModel
        open={open}
        email={updateLeave.email}
        name={updateLeave.name}
        gender={updateLeave.gender}
        address={updateLeave.address}
        branch={updateLeave.branch}
        phone={updateLeave.phone}
        role={updateLeave.role}
        accHolderName={updateLeave.accHolderName}
        accNumber={updateLeave.accNumber}
        bankName={updateLeave.bankName}
        dateOfJoin={updateLeave.dateOfJoin}
        department={updateLeave.department}
        designation={updateLeave.designation}
        resume={updateLeave.resume}
        photo={updateLeave.photo}
        taxPayerId= {updateLeave.taxPayerId}
        handleClose={handleClose}
        handleCreate={undefined}
        tabledata={selectedEmployee}
      /> */}
      <ViewDetailsModal open={open} />
    </Grid>
  );
};

export default EmployeePage;
