import React from 'react'
import styles from './CommonButton.module.scss'
import { Button, Grid } from '@mui/material'

export interface ICommonButton {
    name: string;
    onClick: () => void;
}
const CommonButton = ({ name, onClick }: ICommonButton) => {
    return (
        <Grid className={styles.commonButtonContainer}>
            <Button onClick={onClick} variant='outlined'>{name}</Button>
        </Grid>
    )
}

export default CommonButton;