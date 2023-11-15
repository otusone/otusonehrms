import React from 'react'
import styles from './SearchBox.module.scss'
import { Grid, TextField } from '@mui/material'

const SearchBox = () => {
  return (
    <Grid>
      <TextField placeholder='Search...' />
    </Grid>
  )
}

export default SearchBox;