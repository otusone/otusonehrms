import React from 'react'
import styles from './User.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import UserCard from '../../common/UserCard/UserCard'
import data from './data.json'
import { BiUserCheck } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import img from '../../../asserst/images/profile_pic.jpg'
import CustomLoader from '../../CustomLoader/CustomLoader'


export interface IUser {
    _id: string,
    role: string,
    image?: string,
    username: string,
    email: string,
}
export interface IUserDataType {
    handleClick: () => void;
    handleAction: any;
    data: any;
    loading: boolean;
}
const User = ({ handleClick, data, handleAction, loading }: IUserDataType) => {
    return (
        <Grid className={styles.userContainer}>
            <Grid>
                <Typography variant='h5'>Manage Users</Typography>
                <Box>
                    <BiUserCheck fontSize={32} />
                    <AiOutlinePlus onClick={handleClick} cursor={"pointer"} fontSize={32} />
                </Box>
            </Grid>
            {loading ? <CustomLoader /> :
                <Grid container spacing={2} >
                    {data && data.map((item: IUser, idx: number) => {
                        return (
                            <Grid item sm={3}>
                                <UserCard
                                    label={item.role}
                                    image={item.image}
                                    name={item.username}
                                    email={item.email}
                                    IsButton={false}
                                    IsLabel={true}
                                    handleClick={(() => handleAction(item._id))}
                                />
                            </Grid>
                        )
                    })}
                </Grid>}

        </Grid>
    )
}

export default User