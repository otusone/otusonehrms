import React from 'react'
import { Grid, Box, Typography, Divider } from '@mui/material'
import styles from './CompanyDetail.module.scss'
import InputField from '../../inputField/InputField'
import SelectField from '../../SelectField/SelectField'
import DateField from '../../DateField/DateField'

const CompanyDetail = () => {
  const handleChange = () => {

  }
  return (
    <Grid className={styles.companyDetailContainer}>
      <Typography variant='h5'>Company Detail</Typography>
      <Divider sx={{ marginBlockEnd: 2 }} />
      <InputField
        label={'Employee ID'}
        value={"value"}
        name={'employeeID'}
        placeholder={'#EMP000001'}
        handleChange={handleChange} type={undefined} />
      <Box sx={{ display: "flex" }}>
        <SelectField
          title={'Select Branch'}
          data={undefined} option={''} handleChange={function (): void {
            throw new Error('Function not implemented.')
          } } name={''} />
        <SelectField
          title={'Department'}
          data={undefined} option={''} handleChange={function (): void {
            throw new Error('Function not implemented.')
          } } name={''} />
      </Box>
      <SelectField
        title={'Select Designation'}
        data={undefined} option={''} handleChange={function (): void {
          throw new Error('Function not implemented.')
        } } name={''} />
      <DateField
      />
    </Grid>
  )
}

export default CompanyDetail