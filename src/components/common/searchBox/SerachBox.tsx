import React from 'react'
import styles from './SearchBox.module.scss'
import { Grid, TextField } from '@mui/material'

const SerachBox = () => {
  return (
    <Grid>
      <TextField placeholder='Search...' />
    </Grid>
  )
}

export default SerachBox