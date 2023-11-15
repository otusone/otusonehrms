import React, { useState } from 'react'
import styles from './CreateNewEmployee.module.scss'
import { Box, Grid } from '@mui/material'
import PersonalDetail from '../../components/CreateEmployee/PersonalDetail/PersonalDetail';
import CompanyDetail from '../../components/CreateEmployee/CompanyDetail/CompanyDetail';
import EmployeeDocument from '../../components/CreateEmployee/EmployeeDocument/EmployeeDocument';
import EmpBankDetails from '../../components/CreateEmployee/EmpBankDetails/EmpBankDetails';
import CommonButton from '../../components/common/CommonButton/CommonButton';
import CommonHeading from '../../components/common/CommonHeading/CommonHeading';
import { useNavigate } from 'react-router-dom';

const CreateNewEmployee = () => {
    const navigation = useNavigate()
    const [personalDetail, SetPersonalDetail] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        password: '',
        address: ''
    })
    const [companyDetail, SetCompanyDetail] = useState({
        emp_id: '',
        branch: '',
        department: '',
        designation: '',
        dateOfJoining: '',
    })
    const [empDocument, SetEmpDocument] = useState({
        certificate: '',
        resume: '',
        photo: ''
    })
    const [bankDetails, setBankDetails] = useState({
        accHolderName: '',
        accNumber: '',
        bankName: '',
        identifierCode: '',
        branchLocation: '',
        taxPayerId: ''
    })
    const [employeData, setEmployeeData] = useState<any>(null)
    const [addEmploye, setAddEmployee] = useState<any>()

    const handleChangePersonalDetails = (e: any) => {
        const { name, value } = e.target;
        SetPersonalDetail({ ...personalDetail, [name]: value })
    }
    const handleChangeCompanyDetails = (e: any) => {
        const { name, value } = e.target;
        SetCompanyDetail({ ...companyDetail, [name]: value })
    }
    const handleChangeDocument = (e: any) => {
        const { name, value } = e.target;
        SetEmpDocument({ ...empDocument, [name]: value })
    }
    const handleChangeBankDetails = (e: any) => {
        const { name, value } = e.target;
        setBankDetails({ ...bankDetails, [name]: value })
    }
    const personal = employeData
    const handleCreateEmployee = () => {
        setEmployeeData({
            personalDetail,
            companyDetail,
            empDocument,
            bankDetails
        });
        setAddEmployee(addEmploye)
        console.log(personal, "personal")
        console.log(addEmploye, "addEmploye")
    }

    return (
        <>
            <Box sx={{ marginInlineStart: 3 }}>
                <CommonHeading
                    heading={'Create Employee'}
                />
            </Box>
            <Grid className={styles.createNewEmployee}>
                <Grid container spacing={2}>
                    <Grid item sm={6}>
                        <PersonalDetail
                            personalDetail={personalDetail}
                            handleChange={handleChangePersonalDetails}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <CompanyDetail
                            companyDetail={companyDetail}
                            handleChange={handleChangeCompanyDetails}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <EmployeeDocument
                            empDocument={empDocument}
                            handleChange={handleChangeDocument}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <EmpBankDetails
                            bankDetails={bankDetails}
                            handleChange={handleChangeBankDetails}
                        />
                    </Grid>
                </Grid>
                <CommonButton
                    name={"Create"}
                    onClick={() => {
                        handleCreateEmployee();
                        // navigation('/employee');
                    }}
                />
            </Grid>
        </>
    )
}

export default CreateNewEmployee;