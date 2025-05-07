import React from 'react'
import styles from './TicketCard.module.scss'
import { Grid, Typography } from '@mui/material';
import { TbTicket } from 'react-icons/tb';


export interface ITicketCard {
    color: string;
    bgColor: string;
    title: string;
    ticketNo: number;
}

const TicketCard = ({ color, bgColor, title, ticketNo }: ITicketCard) => {
    return (
        <Grid className={styles.ticketCardContainer}>
            <TbTicket style={{ backgroundColor: bgColor }} fontSize={45} />
            <Typography variant='h5'>{title}</Typography>
            <span style={{ color: color }}>{ticketNo}</span>
        </Grid>
    )
}

export default TicketCard;