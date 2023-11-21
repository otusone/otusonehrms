import React from 'react'
import styles from './SearchBox.module.scss'
import { Grid, TextField } from '@mui/material'

export interface ISearchBox {
  SearchBox: any
}
const SearchBox = ({ setQuery }: any) => {
  return (
    <Grid>
      <TextField placeholder='Search...' onChange={(event: any) => setQuery(event.target.value)} />
    </Grid>
  )
}

export default SearchBox;