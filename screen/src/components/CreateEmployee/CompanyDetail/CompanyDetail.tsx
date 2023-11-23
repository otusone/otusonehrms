import React from 'react'
import { Grid, Box, Typography, Divider } from '@mui/material'
import styles from './CompanyDetail.module.scss'
import InputField from '../../inputField/InputField'
import SelectField from '../../SelectField/SelectField'
import data from './data.json'

export interface ICompanyDetail {
  companyDetail: any;
  handleChange: any;
}
const CompanyDetail = ({ companyDetail, handleChange }: ICompanyDetail) => {

  return (
    <Grid className={styles.companyDetailContainer}>
      <Typography variant='h5'>Company Detail</Typography>
      <Divider sx={{ marginBlockEnd: 2 }} />
      <InputField
        label={'Employee ID'}
        name={'emp_id'}
        value={companyDetail.emp_id}
        placeholder={'#EMP000001'}
        handleChange={handleChange}
        type={"text"}
      />
      <Grid sx={{ display: "flex" }} className={styles.companyDetail}>
        <SelectField
          title={'Select Branch'}
          name={'branch'}
          data={data.branch}
          option={companyDetail.branch}
          handleChange={handleChange}
        />
        <SelectField
          title={'Department'}
          data={data.department}
          name={'department'}
          option={companyDetail.department}
          handleChange={handleChange}

        />
      </Grid>
      <SelectField
        title={'Select Designation'}
        data={data.designation}
        name={'designation'}
        option={companyDetail.designation}
        handleChange={handleChange}
      />
      <InputField
        label={'Date Of Joining'}
        name={'dateOfJoin'}
        placeholder={''}
        value={companyDetail.dateOfJoin}
        handleChange={handleChange}
        type={"date"}
      />

    </Grid>
  )
}

export default CompanyDetail