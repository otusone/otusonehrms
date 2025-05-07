import React, { useState } from 'react'
import styles from './TicketModal.module.scss'
import { Box, Divider, Grid, Modal, Typography } from '@mui/material';
import { RxCross2 } from 'react-icons/rx';
import InputField from '../inputField/InputField';
import SelectField from '../SelectField/SelectField';
import DateField from '../DateField/DateField';
import CommonButton from '../common/CommonButton/CommonButton';
import data from './data.json'

export interface ITicketModal {
    open: boolean;
    clossModal: () => void;
}

const TicketModal = ({ open, clossModal }: ITicketModal) => {
    const [inputData, setInputData] = useState({
        subject: '',
        ticket_for_employee: '',
        priority: '',
        description: '',
        status: ''

    })
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setInputData({
            ...inputData,
            [name]: value
        })
        console.log(inputData, "data")

    }
    const createTicket = () => {
        console.log("hello")
    }


    return (
        <>
            <Modal open={open}>
                <Grid className={styles.ticketModal}>
                    <Box>
                        <Typography variant='h5' fontSize={18}>Create New Ticket</Typography>
                        <RxCross2 onClick={clossModal} style={{ cursor: "pointer" }} fontSize={21} />
                    </Box>
                    <Divider sx={{ marginBlock: 3 }} />
                    <InputField
                        label={'Subject'}
                        name={'subject'}
                        placeholder={'Enter Ticket Subject'}
                        value={inputData.subject}
                        handleChange={handleChange} type={undefined}                    />
                    <SelectField
                        title={'Ticket for Employee'}
                        name={'ticket_for_employee'}
                        data={data.priority}
                        option={inputData.ticket_for_employee}
                        handleChange={handleChange}
                    />
                    <Box sx={{ display: "flex" }}>
                        <SelectField
                            title={'Priority'}
                            name={'priority'}
                            data={data.priority}
                            option={inputData.priority}
                            handleChange={handleChange}
                        />
                        <DateField />
                    </Box>
                    <InputField
                        label={'Description'}
                        name={'description'}
                        placeholder={'Ticket Description'}
                        value={inputData.description}
                        handleChange={undefined} type={undefined}                    />
                    <SelectField
                        title={'Status'}
                        name={'status'}
                        data={data.priority}
                        option={inputData.status}
                        handleChange={handleChange}
                    />
                    <Box>
                        <CommonButton
                            name={"Cancel"}
                            onClick={clossModal}
                        />
                        <CommonButton
                            name={"Create"}
                            onClick={createTicket}
                        />
                    </Box>
                </Grid>
            </Modal>
        </>
    )
}

export default TicketModal;