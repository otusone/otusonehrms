import React from 'react'
import styles from './PersonalDetailsModal.module.scss'
import { Divider, Grid, Modal, Typography } from '@mui/material'
import InputField from '../inputField/InputField';

export interface IPersonalDetailsModal {
    open: boolean;
}
const PersonalDetailsModal = ({ open }: IPersonalDetailsModal) => {
    return (
        <Modal
            open={open}
            sx={{ width: 500, height: 'fit-content', margin: 'auto' }}
        >
            <Grid className={styles.personalDetailsModalContainer}>
                <Typography variant='h5' fontSize={22} fontWeight={500}>Personal Detail</Typography>
                <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 4 }} />
                <Grid container className={styles.PersonalDetails}>
                    <Grid>
                        <InputField
                            label={'Name'}
                            name={'name'}
                            placeholder={'Enter employee name'}
                            value={''}
                            handleChange={undefined}
                            type={undefined}
                        />
                         <InputField
                            label={'Date of Birth'}
                            name={'dateOfBirth'}
                            placeholder={''}
                            value={''}
                            handleChange={undefined}
                            type={"date"}
                        />
                         <InputField
                            label={'Email'}
                            name={'email'}
                            placeholder={'Enter employee email'}
                            value={''}
                            handleChange={undefined}
                            type={undefined}
                        />

                    </Grid>
                    <Grid>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum perspiciatis, quasi nam voluptatum rerum dolore magni totam consequuntur necessitatibus, error, excepturi porro facilis officia est? Cum ad velit odit et!

                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    )
}

export default PersonalDetailsModal