import React from 'react'
import styles from './TimesheetFilter.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import SelectField from '../SelectField/SelectField'
import { BsSearch } from 'react-icons/bs';
import { MdOutlineDeleteForever } from 'react-icons/md';
import InputField from '../inputField/InputField';

export interface ITimesheetFilter {
    handleChange?: any;
    handleSearch?: any;
    handleReset?: any;
    searchData?: any;
}
const TimesheetFilter = ({ handleChange, handleSearch, handleReset, searchData }: ITimesheetFilter) => {

    return (
        <Grid className={styles.timesheetFilterContainer}>
            <InputField
                label={'Start Date'}
                name={'startDate'}
                placeholder={''}
                value={searchData.startDate}
                handleChange={handleChange}
                type={"date"}
            />
            <InputField
                label={'End Date'}
                name={'endDate'}
                placeholder={''}
                value={searchData.endDate}
                handleChange={handleChange}
                type={"date"}
            />
            <Box>
                <BsSearch onClick={handleSearch} cursor={"pointer"} fontSize={35} />
                <MdOutlineDeleteForever onClick={handleReset} cursor={"pointer"} fontSize={35} />
            </Box>
        </Grid>
    )
}

export default TimesheetFilter;