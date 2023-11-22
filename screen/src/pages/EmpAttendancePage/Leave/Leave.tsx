import { Grid } from '@mui/material'
import React from 'react'
import LeaveTable from '../../../components/tableData/leaveTable/LeaveTable';
import leaveData from '../../../data/leaveTable.json'
import HeadingText from '../../../components/HeadingText/HeadingText';

const Leave = () => {
    const handleClick = () => { }
    return (
        <Grid>
            <HeadingText
                heading={'Leave'}
                IsAction={true}
                handleClick={handleClick} />
            <LeaveTable
                data={leaveData}
            />
        </Grid>
    )
}

export default Leave;