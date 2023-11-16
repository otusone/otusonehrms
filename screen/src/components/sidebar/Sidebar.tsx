import React, { useState } from 'react'
import { Grid, Box, MenuList, MenuItem, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import { menuData } from './menuData'
import logo from '../../asserst/images/logo.png'

const Sidebar = ({ menuData }: any) => {
    const [show, setShow] = useState(false)
    const navigation = useNavigate()
    const location = useLocation()
    const path = location.pathname
    const handleMenu = () => {
        setShow(!show)
    }
    const handleLogout = () => {
        console.log("jkdl")
        localStorage.removeItem('token')

    }

    return (
        <Grid className={styles.sidebarContainer}>
            <Box>
                <img src={logo} alt='logo' />
            </Box>
            {menuData.map((item: any) => {
                return (
                    <Grid key={item.id} className={styles.sidebarMenu}>
                        <MenuList onClick={() => { navigation(item.link); handleMenu() }} className={path == item.link ? styles.activeMenu : styles.inActiveMenu}>
                            <MenuItem>  {item.icon}{item.title}</MenuItem>
                        </MenuList>
                    </Grid>
                )
            })}
            <Grid className={styles.logout}>
                <MenuList onClick={handleLogout}>
                    <MenuItem>Logout</MenuItem>
                </MenuList>
            </Grid>
        </Grid>
    )
}

export default Sidebar