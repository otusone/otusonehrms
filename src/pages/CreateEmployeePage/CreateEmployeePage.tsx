import React from 'react'
import styles from './CreateEmployeePage.module.scss'
import data from './data.json';
import { Grid, Box } from '@mui/material'
import PersonalDetail from '../../components/CreateEmployee/PersonalDetail/PersonalDetail';
import CompanyDetail from '../../components/CreateEmployee/CompanyDetail/CompanyDetail';
import CommonButton from '../../components/common/CommonButton/CommonButton';

const CreateEmployeePage = () => {
    return (
        <Grid className={styles.createEmployeePage}>
            <Grid container spacing={2}>
                <Grid item sm={6}>
                    <PersonalDetail />
                </Grid>
                <Grid item sm={6}>
                    <CompanyDetail />
                </Grid>
            </Grid>
            <CommonButton
                name={"Create"} onClick={function (): void {
                    throw new Error('Function not implemented.');
                }} />
        </Grid>
    )
}

export default CreateEmployeePage;