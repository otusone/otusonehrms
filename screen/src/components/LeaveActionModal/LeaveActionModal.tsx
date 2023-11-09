import React from 'react'
import styles from './LeaveActionModal.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material'
import { RxCross1 } from 'react-icons/rx';
import CommonButton from '../common/CommonButton/CommonButton';


export interface ILeaveActionModal {
    open: boolean;
    clossModal: any;
}

const data = [
    {
        "id": 1,
        "title": "Employee",
        "label": "	Julie Lynn"
    },
    {
        "id": 2,
        "title": "Leave Typ",
        "label": "Casual Leave"
    },
    {
        "id": 3,
        "title": "Appplied",
        "label": "Mar 4, 2023"
    },
    {
        "id": 4,
        "title": "Start Dat",
        "label": "Mar 3, 2023"
    },
    {
        "id": 5,
        "title": "End Date",
        "label": "Mar 5, 2023"
    },
    {
        "id": 6,
        "title": "Leave Rea",
        "label": "	Lorem Ipsum, Or Lipsum"
    },
    {
        "id": 7,
        "title": "Status",
        "label": "Reject"
    }
]
const LeaveActionModal = ({ open, clossModal }: ILeaveActionModal) => {
    return (
        <Grid>
            <Modal
                open={open}
            >
                <Grid className={styles.leaveActionModal}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography variant='h4' fontSize={22}>Leave Action</Typography>
                        <RxCross1 onClick={clossModal} cursor={"pointer"} fontSize={22} />
                    </Box>
                    <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                    <Grid container className={styles.leaveActionDetails}>
                        {data.map((item) => {
                            return (
                                <Grid item sm={6} key={item.id}>
                                    <Typography variant='h5' fontSize={16} fontWeight={600}>{item.title}: <span>{item.label}</span></Typography>
                                    <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                                </Grid>
                            )
                        })}
                    </Grid >
                    <Box width={"fit-content"} marginInlineStart={"auto"} display={"flex"}>
                        <CommonButton
                            name={'Approved'}
                            onClick={(() => console.log("approved"))}
                        />
                        <CommonButton
                            name={'Reject'}
                            onClick={(() => console.log("reject"))}
                        />
                    </Box>
                </Grid>
            </Modal>
        </Grid>
    )
}

export default LeaveActionModal;