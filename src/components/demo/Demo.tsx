import React, { useState } from 'react'
import { Grid, Box, MenuList, MenuItem } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Demo.module.scss'
import { menuData } from './menuData'
import logo from '../../asserst/images/logo.png'

const Demo = () => {
    const [show, setShow] = useState(false)
    const navigation = useNavigate()
    const location = useLocation()
    const path = location.pathname
    const handleMenu = () => {
        setShow(!show)
    }

    return (
        <Grid className={styles.demoContainer}>
            <Box>
                <img src={logo} alt='logo' />
            </Box>
            {menuData.map((item) => {
                return (
                    <Grid key={item.id} className={styles.sidebarMenu}>
                        <MenuList onClick={() => { navigation(item.link); handleMenu() }} className={path == item.link ? styles.activeMenu : styles.inActiveMenu}>
                            <MenuItem>  {item.icon}{item.title}</MenuItem>
                        </MenuList>
                        {path == item.link ?
                            <Box>
                                {show ?
                                    <Box>
                                        {item.subtitle ? <Box>{item.subtitle.map((item) => {
                                            return (
                                                <MenuItem key={item.id} onClick={(() => navigation(item.subLink))} className={styles.subMenu}>
                                                    {item.icon}
                                                    {item.menu}
                                                </MenuItem>
                                            )
                                        })}
                                        </Box> : ""}
                                    </Box> : ""}
                            </Box> : ""}
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default Demo