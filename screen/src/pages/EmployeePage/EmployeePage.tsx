import React, { useEffect, useState } from "react";
import styles from "./EmployeePage.module.scss";
import { Grid } from "@mui/material";
import CommonHeading from "../../components/common/CommonHeading/CommonHeading";
import EmployeeTable from "../../components/tableData/employeeTable/EmployeeTable";
import data from "./data.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmployeeModal from "../../components/modal/EmployeeModal/EmployeeModal";

const EmployeePage = () => {
  const [open, setOpen] = useState(false)
  const [inputData, setInputData] = useState<any>({
    name: "",
    email: "",
    emp_id: "",
    branch: "",
    department: "",
    designation: "",
    dateOfJoin: ""
  });
  const [query, setQuery] = useState("");
  const [editEmployee, setEditEmployee] = useState();
  const [employeeData, setEmployeeData] = useState<any>([]);
  const [loading, setLoading] = useState(false)
  const handleCloss = () => setOpen(false);

  const navigation = useNavigate();

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
  useEffect(() => {
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
  const handleEditModal = async (idx: any) => {
    try {
      setOpen((preState: any) => ({ ...preState, [idx]: !preState[idx] }));
      setEditEmployee(idx);

      const res = await axios.get('https://hrms-server-ygpa.onrender.com/employee');

      if (res.status === 200) {
        const resData = res.data.employeeData;
        const filteredData = resData.filter((employee: any) => employee._id === editEmployee);

        setInputData({
          emp_id: filteredData[0].emp_id,
          name: filteredData[0].name,
          email: filteredData[0].email,
          branch: filteredData[0].branch,
          department: filteredData[0].department,
          designation: filteredData[0].designation,
          dateOfJoin: filteredData[0].dateOfJoin
        });
      } else {
        console.error('Failed to fetch employee data');
      }
    } catch (error) {
      console.error('An error occurred while fetching or processing data:', error);
    }
  };


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value })
  }

  const handleEdit = async () => {
    try {
      await axios.put(`https://hrms-server-ygpa.onrender.com/employee/${editEmployee}`, inputData)
      await fetchData();

    } catch (error) {
      console.error(error)
    } finally {
      setOpen(false)
    }
  }

  return (
    <Grid className={styles.employeePageContainer}>
      <CommonHeading
        heading={""}
        IsHeadingAction={true}
        onClick={() => navigation("/employee/create-employee")}
      />
      <EmployeeTable
        heading={"Manage Employee"}
        tableTitle={data.tableTitle}
        tableData={employeeData}
        handleEdit={handleEditModal}
        handleDelete={handleDelete}
        setQuery={setQuery}
        query={query}
        loading={loading}
      />
      <EmployeeModal
        open={open}
        inputData={inputData}
        handleChange={handleChange}
        handleCloss={handleCloss}
        handleEdit={handleEdit}
      />
    </Grid>
  );
};

export default EmployeePage;
