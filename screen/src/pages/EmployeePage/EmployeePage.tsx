import React, { useEffect, useState } from "react";
import styles from "./EmployeePage.module.scss";
import { Grid } from "@mui/material";
import CommonHeading from "../../components/common/CommonHeading/CommonHeading";
import EmployeeTable from "../../components/tableData/employeeTable/EmployeeTable";
import data from "./data.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Employee {
  // Define the structure of your employee data
  id: number;
  // ... other properties
}

const EmployeePage = () => {
  const [empData, setEmpData] = useState<Employee[]>([]);
  const [query, setQuery] = useState("")

  const navigation = useNavigate();
  useEffect(() => {
    axios
      .get("https://hrms-server-ygpa.onrender.com/employee")
      .then((result) => {
        const data = result.data.employeeData;
        setEmpData(data);
        console.log(data, "result");
      });
  }, []);

  const handleDelete = (id: number) => {
    const updatedEmpData = empData.filter((employee) => employee.id !== id);
    setEmpData(updatedEmpData);
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
        tableData={empData}
        handleLeaveAction={undefined}
        handleEdit={undefined}
        handleDelete={handleDelete}
        setQuery={setQuery}
        query={query}
      />
    </Grid>
  );
};

export default EmployeePage;
