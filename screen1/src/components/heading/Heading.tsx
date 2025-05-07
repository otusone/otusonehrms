import React from 'react'
import styles from './Heading.module.scss'
import { Grid, Box, Typography } from '@mui/material'
import img from '../../asserst/images/profile_pic.jpg'
import HeadingProfile from './headingProfile/HeadingProfile'
import HeadingNotification from './headingNotification/HeadingNotification'


const Heading = ({ handleLogout }: any) => {
    return (
        <Grid className={styles.headingContainer}>
            <HeadingProfile
                IsImage={true}
                name={'Hi, Shira Arista'}
                handleLogout={handleLogout}
            />
            <Box>
                <HeadingNotification />
                <HeadingNotification />
                {/* <HeadingProfile
                    isIcon={true}
                    name={'English'}
                    color={"#6FD943"}
                /> */}
            </Box>
        </Grid>
    )
}

export default Heading;