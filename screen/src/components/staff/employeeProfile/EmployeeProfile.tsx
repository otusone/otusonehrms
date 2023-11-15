import React from 'react'
import styles from './EmployeeProfile.module.scss'
import { Grid, Typography } from '@mui/material'
import data from './data.json'
import UserCard from '../../common/UserCard/UserCard'

const EmployeeProfile = () => {
  return (
    <Grid className={styles.employeeProfileContainer}>
      <Typography>Employee Profile</Typography>
      <Grid container spacing={2}>
        {data.map((item) => {
          return (
            <Grid item sm={3}>
              <UserCard
                label={''}
                image={item.image}
                name={item.name}
                email={item.email}
                IsButton={true}
                IsLabel={false}
              />
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  )
}

export default EmployeeProfile