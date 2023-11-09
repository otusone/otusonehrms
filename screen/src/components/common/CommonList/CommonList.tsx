import React from 'react'
import styles from './CommonList.module.scss'
import { AiOutlineUser, AiOutlinePoweroff } from 'react-icons/ai';
import { Grid, MenuItem, MenuList } from '@mui/material'



const CommonList = () => {
    return (
        <Grid className={styles.commonListContainer}>
            <MenuItem>
                <AiOutlineUser fontSize={20} />
                <MenuList>My Pr0ile</MenuList>
            </MenuItem>
            <MenuItem>
                <AiOutlinePoweroff fontSize={20} />
                <MenuList>Logout</MenuList>
            </MenuItem>
        </Grid>
    )
}

export default CommonList;