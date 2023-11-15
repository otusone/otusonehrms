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

const CreateNewEmployee = () => {
  const navigation = useNavigate();
  const [inputData, setInputData] = useState({
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
    dateOfJoining: "",
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
  //   const [personalDetail, SetPersonalDetail] = useState({
  //     name: "",
  //     email: "",
  //     phone: "",
  //     gender: "",
  //     password: "",
  //     address: "",
  //   });
  //   const [companyDetail, SetCompanyDetail] = useState({
  //     emp_id: "",
  //     branch: "",
  //     department: "",
  //     designation: "",
  //     dateOfJoining: "",
  //   });
  //   const [empDocument, SetEmpDocument] = useState({
  //     certificate: "",
  //     resume: "",
  //     photo: "",
  //   });
  //   const [bankDetails, setBankDetails] = useState({
  //     accHolderName: "",
  //     accNumber: "",
  //     bankName: "",
  //     identifierCode: "",
  //     branchLocation: "",
  //     taxPayerId: "",
  //   });
  const [employeeData, setEmployeeData] = useState({});

//   const handleChangePersonalDetails = (e: any) => {
//     const { name, value } = e.target;
//     setInputData({ ...inputData, [name]: value });
//   };
//   const handleChangeCompanyDetails = (e: any) => {
//     const { name, value } = e.target;
//     SetCompanyDetail({ ...companyDetail, [name]: value });
//   };
//   const handleChangeDocument = (e: any) => {
//     const { name, value } = e.target;
//     SetEmpDocument({ ...empDocument, [name]: value });
//   };
//   const handleChangeBankDetails = (e: any) => {
//     const { name, value } = e.target;
//     setBankDetails({ ...bankDetails, [name]: value });
//   };

const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleCreate = () => {
    axios
      .post("https://hrms-server-ygpa.onrender.com/employee/create", inputData)
      .then((result) => {
        setInputData(result.data.new_Employee.personalDetails);
        console.log(result, "result....");
      });
  };
  console.log(inputData, "inputData");
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
        </Grid>
        <CommonButton name={"Create"} onClick={handleCreate} />
      </Grid>
    </>
  );
};

export default CreateNewEmployee;
