import React from 'react'
import styles from './TimesheetFilter.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import SelectField from '../SelectField/SelectField'
import { BsSearch } from 'react-icons/bs';
import { MdOutlineDeleteForever } from 'react-icons/md';
import DateField from '../DateField/DateField';


const TimesheetFilter = () => {
    const data = [
        {
            "id": 1, "label": "aman"
        },
        {
            "id": 2, "label": "Abhay"
        },
        {
            "id": 3, "label": "arjun"
        },
        {
            "id": 4, "label": "anuj"
        }
    ]
    return (
        <Grid className={styles.timesheetFilterContainer}>
            <DateField />
            <DateField />
            <SelectField
                title={'Employee'}
                data={data}
                option={''} name={''}
                handleChange={undefined}
            />
            <Box>
                <BsSearch fontSize={35} />
                <MdOutlineDeleteForever fontSize={35} />
            </Box>
        </Grid>
    )
}

export default TimesheetFilter;