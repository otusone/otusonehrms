import React, { useEffect, useState } from "react";
import styles from "./EmployeePage.module.scss";
import { Grid } from "@mui/material";
import CommonHeading from "../../components/common/CommonHeading/CommonHeading";
import EmployeeTable from "../../components/tableData/employeeTable/EmployeeTable";
import data from "./data.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeePage = () => {
  const [query, setQuery] = useState("");
  const [employeeData, setEmployeeData] = useState<any>([]);

  const navigation = useNavigate();

  useEffect(() => {
    axios
      .get("https://hrms-server-ygpa.onrender.com/employee")
      .then((result) => {
        const data = result.data.employeeData;
        setEmployeeData(data);
      });
  }, []);

  const handleDelete = (employeeId: any) => {
    axios
      .delete(`https://hrms-server-ygpa.onrender.com/employee/${employeeId}`)
      .then(() => {
        const updatedEmployeeData = employeeData.filter(
          (employee: { _id: any; }) => employee._id !== employeeId
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
      />
    </Grid>
  );
};

export default EmployeePage;
