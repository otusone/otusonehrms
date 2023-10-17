import React from 'react'
import styles from './CommonHeading.module.scss'
import { TiDocumentAdd } from 'react-icons/ti';
import { TiDocument } from 'react-icons/ti';
import { RiAddFill } from 'react-icons/ri';
import { Grid, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export interface ICommonHeading {
    heading: string;
    onClick?: () => void;
    IsHeadingAction?: boolean
}
const CommonHeading = ({ heading, onClick, IsHeadingAction }: ICommonHeading) => {
    const navigation = useNavigate()
    return (
        <Grid className={styles.commonHeadingContainer}>
            <Typography variant='h5'>{heading}</Typography>
            {IsHeadingAction ? <Box>
                <TiDocumentAdd fontSize={30} />
                <TiDocument fontSize={30} />
                <RiAddFill onClick={onClick} fontSize={30} />
            </Box> : ''}
        </Grid>
    )
}

export default CommonHeading;