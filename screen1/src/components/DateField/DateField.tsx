import React from 'react'
import styles from './DateField.module.scss'
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, Typography } from '@mui/material';

const DateField = () => {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

    return (
        <Grid className={styles.dataFieldContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer sx={{ display: "flex" }} components={['DatePicker', 'DatePicker']}>
                    <Typography>Date Of Birth</Typography>
                    <DatePicker
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </Grid>
    )
}

export default DateField;