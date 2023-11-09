import React from 'react'
import styles from './TicketByStatus.module.scss'
import { Box, Divider, Grid, Typography } from '@mui/material';
import { TbPointFilled } from 'react-icons/tb';


const TicketByStatus = () => {
    const data = [
        {
            "id": 1,
            "color": "#FF3A6E",
            "label": "Close"
        },
        {
            "id": 2,
            "color": "#FD7E14",
            "label": "Hold"
        },
        {
            "id": 3,
            "color": "#3EC9D6",
            "label": "Total"
        },
        {
            "id": 4,
            "color": "#6FD943",
            "label": "Open"
        }
    ]
    return (
        <Grid className={styles.ticketByStatusContainer}>
            <Typography variant='h5'>Ticket By Status</Typography>
            <Divider sx={{ marginBlock: 3 }} />
            <Grid container>
                <Grid item sm={6}>
                    <Typography>hello</Typography>
                </Grid>
                <Grid item sm={6}>
                    <Grid container>
                        {data.map((item) => {
                            return (
                                <Grid item sm={6}>
                                    <TbPointFilled fontSize={25} />
                                    <Typography>{item.label}</Typography>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TicketByStatus;