import React, { useState } from 'react'
import styles from './CreateNewEmployee.module.scss'
import { Grid } from '@mui/material'
import PersonalDetail from '../../components/CreateEmployee/PersonalDetail/PersonalDetail';
import CompanyDetail from '../../components/CreateEmployee/CompanyDetail/CompanyDetail';

const CreateNewEmployee = () => {
    const [personalDetail, SetPersonalDetail] = useState({ name: '', email: '', phone: '', gender: '', password: '', address: '' })
    const [companyDetail, SetCompanyDetail] = useState({ emp_id: '', branch: '', department: '', designation: '', dateOfJoing: '', })
    const handleChangePersonalDetails = (e: any) => {
        const { name, value } = e.target;
        SetPersonalDetail({ ...personalDetail, [name]: value })
    }
    const handleChangeCompanyDetails = (e: any) => {
        const { name, value } = e.target;
        SetCompanyDetail({ ...companyDetail, [name]: value })

    }
    return (
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
            </Grid>
        </Grid>
    )
}

export default CreateNewEmployee;