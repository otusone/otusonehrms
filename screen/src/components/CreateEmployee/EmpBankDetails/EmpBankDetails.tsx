import React from 'react'
import styles from './EmpBankDetails.module.scss'
import { Box, Divider, Grid, Typography } from '@mui/material'
import InputField from '../../inputField/InputField'

export interface IEmpBankDetails {
    bankDetails: any;
    handleChange: any;
}
const EmpBankDetails = ({ bankDetails, handleChange }: IEmpBankDetails) => {
    return (
        <Grid className={styles.empBankDetails}>
            <Typography variant='h5' fontSize={20}>Bank Account Detail</Typography>
            <Divider sx={{ marginBlock: 2 }} />
            <Grid container className={styles.bankDetails}>
                <Grid item sm={6}>
                    <InputField
                        label={'Account Holder Name'}
                        name={'accHolderName'}
                        placeholder={'Enter Account Holder Name'}
                        value={bankDetails.accHolderName}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <InputField
                        label={'Bank Name'}
                        name={'bankName'}
                        placeholder={'Enter Bank Nam'}
                        value={bankDetails.bankName}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <InputField
                        label={'Branch Location'}
                        name={'branchLocation'}
                        placeholder={'Enter Branch Location'}
                        value={bankDetails.branchLocation}
                        handleChange={handleChange}
                        type={"text"}
                    />
                </Grid>
                <Grid item sm={6} sx={{ paddingInlineStart: 1 }}>
                    <InputField
                        label={'Account Number'}
                        name={'accNumber'}
                        placeholder={'Enter Account Number'}
                        value={bankDetails.accNumber}
                        handleChange={handleChange}
                        type={"number"}
                    />
                    <InputField
                        label={'Bank Identifier Code'}
                        name={'identifierCode'}
                        placeholder={'Enter Bank Identifier Code'}
                        value={bankDetails.identifierCode}
                        handleChange={handleChange}
                        type={"text"}
                    />
                    <InputField
                        label={'Tax Payer Id'}
                        name={'taxPayerId'}
                        placeholder={'Enter Tax Payer Id'}
                        value={bankDetails.taxPayerId}
                        handleChange={handleChange}
                        type={"text"}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default EmpBankDetails;