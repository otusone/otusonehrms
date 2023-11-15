import React, { useState } from 'react'
import styles from '../CreateNewEmployee/CreateNewEmployee.module.scss'
import { Box, Grid } from '@mui/material'
import PersonalDetail from '../../components/CreateEmployee/PersonalDetail/PersonalDetail';
import CompanyDetail from '../../components/CreateEmployee/CompanyDetail/CompanyDetail';
import EmployeeDocument from '../../components/CreateEmployee/EmployeeDocument/EmployeeDocument';
import EmpBankDetails from '../../components/CreateEmployee/EmpBankDetails/EmpBankDetails';
import CommonButton from '../../components/common/CommonButton/CommonButton';
import CommonHeading from '../../components/common/CommonHeading/CommonHeading';

const EditAddedEmployee = () => {
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
        console.log(bankDetails, "bankDetails")
    }
    const handleCreateEmployee = () => {
        console.log("hello")
    }

    return (
        <>
            <Box sx={{ marginInlineStart: 3 }}>
                <CommonHeading
                    heading={'Edit Employee'}
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
                    name={"Update"}
                    onClick={handleCreateEmployee}
                />
            </Grid>
        </>
    )
}

export default EditAddedEmployee;