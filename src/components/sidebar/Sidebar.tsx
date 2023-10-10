import React, { useState } from 'react'
import styles from './Sidebar.module.scss'
import { Grid, Box, MenuItem, MenuList, Typography } from '@mui/material'
import { AiOutlineHome } from 'react-icons/ai';
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
    const navigation = useNavigate()
    const location = useLocation()
    const path = location.pathname
    console.log(path, "hello")
    const data = [
        {
            "id": 1,
            "icon": <AiOutlineHome />,
            "label": "Dashboard",
            "link": "/",
            "subMenu": [
                {
                    "id": 1,
                    "subLabel": "Overview",
                    "link": "#",
                },
                {
                    "id": 2,
                    "subLabel": "Report",
                    "link": "/report",
                }
            ]
        },
        {
            "id": 2,
            "icon": <AiOutlineHome />,
            "label": "Staff",
            "link": "/staff",
            "subMenu": [
                {
                    "id": 1,
                    "subLabel": "1One"
                },
                {
                    "id": 2,
                    "subLabel": "2two"
                }
            ]
        },
        {
            "id": 3,
            "icon": <AiOutlineHome />,
            "label": "Employee",
            "link": "/employee",
            "subMenu": [
                {
                    "id": 1,
                    "subLabel": "One"
                },
                {
                    "id": 2,
                    "subLabel": "two"
                }
            ]
        },
        {
            "id": 4,
            "icon": <AiOutlineHome />,
            "label": "Payroll",
            "link": "/payroll",
            "subMenu": []
        },
        {
            "id": 5,
            "icon": <AiOutlineHome />,
            "label": "Timesheet",
            "link": "/timesheet",
            "subMenu": [
                {
                    "id": 1,
                    "subLabel": "One"
                },
                {
                    "id": 2,
                    "subLabel": "two"
                }
            ]
        }
        // {
        //     "id": 6,
        //     "icon": <AiOutlineHome />,
        //     "label": "Performance",
        //     "link": "/performance"
        // },
        // {
        //     "id": 7,
        //     "icon": <AiOutlineHome />,
        //     "label": "Traning",
        //     "link": "/traning"
        // },
        // {
        //     "id": 8,
        //     "icon": <AiOutlineHome />,
        //     "label": "HR Admin Setup",
        //     "link": "/admin-setup"
        // },
        // {
        //     "id": 9,
        //     "icon": <AiOutlineHome />,
        //     "label": "Recuitment",
        //     "link": "/recuitment"
        // },
        // {
        //     "id": 10,
        //     "icon": <AiOutlineHome />,
        //     "label": "Contracts",
        //     "link": "/contracts"
        // },
        // {
        //     "id": 11,
        //     "icon": <AiOutlineHome />,
        //     "label": "Ticket",
        //     "link": "/ticket"
        // },
        // {
        //     "id": 12,
        //     "icon": <AiOutlineHome />,
        //     "label": "Event",
        //     "link": "/event"
        // },
        // {
        //     "id": 13,
        //     "icon": <AiOutlineHome />,
        //     "label": "Company Policy",
        //     "link": "/policy"
        // }
    ]
    const [show, setShow] = useState(false)
    const handleClick = () => {
        setShow(!show)
    }
    return (
        <Grid className={styles.sidebarContainer}>
            <Typography align='center' variant='h4' fontWeight={700} fontSize={24}>@OTOUSONE</Typography>
            <Grid >
                <MenuList className={styles.menuItemContainer} >
                    {data.map((item) => {
                        return (
                            <Grid className={styles.menuItems}>
                                <MenuItem key={item.id} onClick={() => { navigation(item.link); handleClick() }} className={path == item.link ? styles.activeStyle : styles.inActiveStyle}>
                                    <Box>
                                        <MenuItem>
                                            <AiOutlineHome fontSize={35} />
                                            {item.label}
                                        </MenuItem>
                                    </Box>
                                    <Box>
                                        {show ? <Box>{path == item.link ? <MenuList>
                                            {item.subMenu?.map((item: any) => {
                                                return (
                                                    <MenuItem key={item.id} onClick={(() => navigation(item.link))}>
                                                        <AiOutlineHome fontSize={35} />
                                                        {item.subLabel}
                                                    </MenuItem>
                                                )
                                            })}
                                        </MenuList> : ""}</Box> : ""}
                                    </Box>
                                </MenuItem>
                            </Grid>
                        )
                    })}
                </MenuList>
            </Grid >
        </Grid >
    )
}

export default Sidebar