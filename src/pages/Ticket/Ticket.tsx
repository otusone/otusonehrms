import React, { useState } from 'react'
import styles from './Ticket.module.scss'
import { Grid } from '@mui/material';
import TicketCard from '../../components/TicketCard/TicketCard';
import { ticketData, ticketTableHeading, ticketTableData } from '../../data/ticketData';
import TicketByStatus from '../../components/TicketByStatus/TicketByStatus';
import CommonTable from '../../components/common/CommonTable/CommonTable';
import CommonHeading from '../../components/common/CommonHeading/CommonHeading';
import TicketModal from '../../components/TicketModal/TicketModal';

const Ticket = () => {
    const [open, setOpen] = useState(false)
    const addHandler = () => {
        setOpen(!open)
    }
    const closeHandler = () => {
        setOpen(false)
    }
    return (
        <Grid className={styles.ticketCardContainer}>
            <CommonHeading
                heading={''}
                onClick={addHandler}
            />
            <Grid className={styles.ticketCard}>
                <Grid container spacing={2}>
                    {ticketData.map((item) => {
                        return (
                            <Grid item sm={3}>
                                <TicketCard
                                    color={item.color}
                                    bgColor={item.color}
                                    title={item.title}
                                    ticketNo={item.ticketNo}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
                <Grid>
                    <TicketByStatus />
                </Grid>
            </Grid>
            <Grid>
                <CommonTable
                    heading={'entries per page'}
                    tableData={ticketTableData}
                    IsEmployeeID={false}
                    IsAction={true}
                    tableTitle={ticketTableHeading}
                    IsStatus={true}
                    IsProperty={true}
                    IsCol_7={false} IsManageLeaveStatus={false}
                     IsManageLeaveAction={false}                
                     />
            </Grid>
            <TicketModal
                open={open}
                clossModal={closeHandler}
            />
        </Grid>
    )
}

export default Ticket;