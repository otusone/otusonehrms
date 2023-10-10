import React, {ChangeEvent} from 'react'
import styles from './InputField.module.scss'
import { Grid, TextField, Typography } from '@mui/material'

export interface IInputField {
    label: string;
    name: string;
    placeholder: string;
    value: string;
    handleChange: any
}
const InputField = ({ label, name, placeholder, value, handleChange }: IInputField) => {
    return (
        <Grid className={styles.inputFieldContainer}>
            <Typography>{label}</Typography>
            <TextField name={name} value={value} placeholder={placeholder} onChange={handleChange} />
        </Grid>
    )
}

export default InputField;