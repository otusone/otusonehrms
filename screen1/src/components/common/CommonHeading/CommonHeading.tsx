import React from 'react'
import styles from './CommonHeading.module.scss'
import { TiDocumentAdd } from 'react-icons/ti';
import { TiDocument } from 'react-icons/ti';
import { RiAddFill } from 'react-icons/ri';
import { Grid, Typography, Box } from '@mui/material'
import CommonButton from '../CommonButton/CommonButton';

export interface ICommonHeading {
    heading: string;
    onClick?: () => void;
    IsHeadingAction?: boolean
}
const CommonHeading = ({ heading, onClick, IsHeadingAction }: ICommonHeading) => {
    return (
        <Grid className={styles.commonHeadingContainer}>
            <Typography variant='h5'>{heading}</Typography>
            {IsHeadingAction ? <CommonButton name={"Add Employee"} onClick={onClick} /> : ''}
        </Grid>
    )
}

export default CommonHeading;