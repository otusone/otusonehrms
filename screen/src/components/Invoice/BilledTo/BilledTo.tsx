import React from 'react'
import styles from './BilledTo.module.scss'
import SelectClientCard from '../SelectClientCard/SelectClientCard'
import { Box, Grid, Typography } from '@mui/material'
export interface IBilledTo {
    handleClick: any
    businessName: any;
    businessAddress: any;
}
const BilledTo = ({ businessName, businessAddress, handleClick }: IBilledTo) => {
    return (
        <Grid className={styles.billedToContainer}>
            {businessName === "dsd" ?
                <><Typography variant='h5' fontSize={20} fontWeight={500}>Billed By
                    <span style={{ fontSize: 15, color: "#617183", paddingInline: 5 }}>(Your Details)</span>
                </Typography>
                    <SelectClientCard handleClick={handleClick} /></>
                :
                <Grid>
                    <Typography variant='h5' fontSize={20} fontWeight={500}>Client Details</Typography>

                    <Grid sx={{ backgroundColor: "#ffffff", paddingInlineStart: 2.5, paddingBlockEnd: 4, paddingBlock: 3, border: "1px solid #58024B", borderRadius: 1, marginBlockStart: 1 }} >
                        <Box>
                            <Typography variant='h5' fontSize={20} fontWeight={500} sx={{ marginBlockEnd: 2 }}>Business Details</Typography>
                            <Typography sx={{ paddingBlock: 0.5 }} >Business Name:   <span>{businessName}</span></Typography>
                            <Typography sx={{ paddingBlock: 0.5 }} >Address <span>{businessAddress}</span></Typography>
                        </Box>
                    </Grid>
                </Grid>
            }

        </Grid>
    )
}

export default BilledTo