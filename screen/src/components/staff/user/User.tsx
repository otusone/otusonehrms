import React from 'react'
import styles from './User.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import UserCard from '../../common/UserCard/UserCard'
import data from './data.json'
import { BiUserCheck } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import img from '../../../asserst/images/profile_pic.jpg'

export interface IUser {
    handleClick: () => void;
}
const User = ({ handleClick }: IUser) => {
    return (
        <Grid className={styles.userContainer}>
            <Grid>
                <Typography variant='h5'>Manage Users</Typography>
                <Box>
                    <BiUserCheck fontSize={32} />
                    <AiOutlinePlus onClick={handleClick} cursor={"pointer"} fontSize={32} />
                </Box>
            </Grid>
            <Grid container spacing={2} >
                {data.map((item) => {
                    return (
                        <Grid item sm={3}>
                            <UserCard
                                label={item.label}
                                image={item.image}
                                name={item.name}
                                email={item.email}
                                IsButton={false}
                                IsLabel={true}
                            />
                        </Grid>
                    )
                })}
                <Grid item sm={3}>
                    <UserCard
                        label={'add'}
                        image={img}
                        name={'New User'}
                        email={'Click here to add new user'}
                        IsButton={false}
                        IsLabel={false}
                    />
                </Grid>
            </Grid>

        </Grid>
    )
}

export default User