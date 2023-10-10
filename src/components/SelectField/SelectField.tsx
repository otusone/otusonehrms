import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Grid, Typography } from '@mui/material'
import styles from './SelectField.module.scss'

export interface ISelectField {
    title: string;
    data: any;
    option: string;
    name: string;
    handleChange: any

}
const SelectField = ({ title, data, option, name, handleChange }: ISelectField) => {


    return (
        <Grid className={styles.selectFieldContainer}>
            <FormControl sx={{ m: 1, minWidth: 120 }} >
                <Typography>{title}</Typography>
                <Select
                    value={option}
                    name={name}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {data.map((item: any) => {
                        return (
                            <MenuItem value={item.id}>{item.label}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Grid>
    );
}

export default SelectField;