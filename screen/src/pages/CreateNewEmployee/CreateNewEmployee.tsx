import React, { useState } from "react";
import styles from "./CreateNewEmployee.module.scss";
import { Box, Grid } from "@mui/material";
import PersonalDetail from "../../components/CreateEmployee/PersonalDetail/PersonalDetail";
import CompanyDetail from "../../components/CreateEmployee/CompanyDetail/CompanyDetail";
import EmployeeDocument from "../../components/CreateEmployee/EmployeeDocument/EmployeeDocument";
import EmpBankDetails from "../../components/CreateEmployee/EmpBankDetails/EmpBankDetails";
import CommonButton from "../../components/common/CommonButton/CommonButton";
import CommonHeading from "../../components/common/CommonHeading/CommonHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Emergencycontatc from "../../components/CreateEmployee/Emergencycontact/Emergencycontatc";

const CreateNewEmployee = () => {
  const navigation = useNavigate();
  const [inputData, setInputData] = useState<any>({
    name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    address: "",
    emp_id: "",
    branch: "",
    department: "",
    designation: "",
    dateOfJoin: "",
    certificate: "",
    resume: "",
    photo: "",
    accHolderName: "",
    accNumber: "",
    bankName: "",
    identifierCode: "",
    branchLocation: "",
    taxPayerId: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleCreate = () => {
    if (inputData.name === '' || inputData.email === '' || inputData.phone === '' || inputData.password === '' || inputData.emp_id === '') {
      console.log('please fill all the require field')
    } else {
      axios
        .post("https://hrms-server-ygpa.onrender.com/employee/create", inputData)
        .then((result) => {
          setInputData(result);
          navigation('/employee')
          console.log(result, "result....");
        })
        .catch(err => {
          console.log(err)
        })
    }
  };
  return (
    <>
      <Box sx={{ marginInlineStart: 3 }}>
        <CommonHeading heading={"Create Employee"} />
      </Box>
      <Grid className={styles.createNewEmployee}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <PersonalDetail
              personalDetail={inputData}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item sm={6}>
            <CompanyDetail
              companyDetail={inputData}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item sm={6}>
            <EmployeeDocument
              empDocument={inputData}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item sm={6}>
            <EmpBankDetails
              bankDetails={inputData}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item sm={6}>
            <Emergencycontatc
              emergencydetail={inputData}
              handleChange={handleChange}
            />
          </Grid>
        </Grid>
        <CommonButton name={"Create"} onClick={handleCreate} />
      </Grid>
    </>
  );
};

export default CreateNewEmployee;


