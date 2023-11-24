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
  const [loading, setLoading] = useState(false)

  const navigation = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios.get("https://hrms-server-ygpa.onrender.com/employee");
        const data = result.data.employeeData;
        setEmployeeData(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []);


  const handleDelete = async (employeeId: any) => {
    try {
      setLoading(true);
      await axios.delete(`https://hrms-server-ygpa.onrender.com/employee/${employeeId}`);

      setEmployeeData((prevEmployeeData: any[]) =>
        prevEmployeeData.filter((employee: { _id: any }) => employee._id !== employeeId)
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
    } finally {
      setLoading(false);
    }
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
        handleEdit={undefined}
        handleDelete={handleDelete}
        setQuery={setQuery}
        query={query}
        loading={loading} handleLeaveAction={undefined}      />
    </Grid>
  );
};

export default EmployeePage;
