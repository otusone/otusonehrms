import React from 'react'
import styles from './AddClientModal.module.scss'
import { Box, Divider, FormControl, FormControlLabel, FormLabel, Grid, Modal, Radio, RadioGroup, Typography } from '@mui/material'
import { RxCross2 } from "react-icons/rx";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import CommonButton from '../../common/CommonButton/CommonButton';
import { MdOutlineAdd } from "react-icons/md";
import InputField from '../../inputField/InputField';
import SelectField from '../../SelectField/SelectField';
import data from './data.json'

export interface IAddClientModal {
    open: boolean;
    handleClose: any;
}

const AddClientModal = ({ open, handleClose }: IAddClientModal) => {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    return (
        <Modal
            open={open}
            sx={{ width: 650, height: 'fit-content', margin: "auto" }}
        >
            <Grid className={styles.addClientModalContainer}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Add New Client</Typography>
                    <RxCross2 fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 4 }} />
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<RxCross2 />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography variant='h5' fontSize={18} fontWeight={500}>
                            Basic Information
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={styles.basicInfoContainer}>
                        <Grid justifyContent={"center"} className={styles.basicInfo}>
                            <Box display={"flex"} justifyContent={"center"}>
                                <MdOutlineAdd fontSize={26} />
                            </Box>
                            <Typography textAlign={"center"} marginBlock={1} fontSize={15}>Upload Logo</Typography>
                            <Typography textAlign={"center"} fontSize={14}>JPG or PNG, Dimensions 1080*1080 and file size upto 20MB</Typography>
                        </Grid>
                        <Box>
                            <Box>
                                <InputField
                                    label={'Business Name*'}
                                    name={''}
                                    placeholder={''}
                                    value={''}
                                    handleChange={undefined}
                                    type={undefined}
                                />
                                <SelectField
                                    title={'Select Country *'}
                                    data={data.data}
                                    option={undefined}
                                    name={''}
                                    handleChange={undefined}
                                />

                            </Box>
                            <Box>
                                <SelectField
                                    title={'Client Industry'}
                                    data={data.data}
                                    option={undefined}
                                    name={''}
                                    handleChange={undefined}
                                />
                                <InputField
                                    label={'City'}
                                    name={''}
                                    placeholder={''}
                                    value={''}
                                    handleChange={undefined}
                                    type={undefined}
                                />

                            </Box>

                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<RxCross2 />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography variant='h5' fontSize={18} fontWeight={500}>
                            Tax Information
                            <span style={{ color: "#617183", fontSize: 14, paddingInlineStart: 2 }}>(optional)</span>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={styles.taxInfoContainer}>
                        <Grid className={styles.taxInfo}>
                            <Box>
                                <InputField
                                    label={'Business GSTIN'}
                                    name={''}
                                    placeholder={''}
                                    value={''}
                                    handleChange={undefined}
                                    type={undefined}
                                />

                            </Box>
                            <Box>
                                <InputField
                                    label={'Business PAN Number'}
                                    name={''}
                                    placeholder={''}
                                    value={''}
                                    handleChange={undefined}
                                    type={undefined}
                                />

                            </Box>

                        </Grid>
                        <Grid sx={{ marginBlock: 2 }}>
                            <Typography variant='h5' fontSize={16} fontWeight={500}>Client Type</Typography>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="individual" control={<Radio />} label="Individual" />
                                    <FormControlLabel value="company" control={<Radio />} label="Company" />
                                </RadioGroup>
                            </FormControl>
                            <SelectField
                                title={'Tax Treatment'}
                                data={data.data}
                                option={undefined}
                                name={''}
                                handleChange={undefined}
                            />
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<RxCross2 />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography variant='h5' fontSize={18} fontWeight={500}>
                            Address
                            <span style={{ color: "#617183", fontSize: 14, paddingInlineStart: 2 }}>(optional)</span>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid className={styles.addressContainer}>
                            <Grid>
                                <SelectField
                                    title={'Select Country'}
                                    data={data.data}
                                    option={undefined}
                                    name={''}
                                    handleChange={undefined}
                                />
                                <InputField
                                    label={'City'}
                                    name={''}
                                    placeholder={''}
                                    value={''}
                                    handleChange={undefined}
                                    type={undefined}
                                />
                                <InputField
                                    label={'Street Address'}
                                    name={''}
                                    placeholder={''}
                                    value={''}
                                    handleChange={undefined}
                                    type={undefined}
                                />
                            </Grid>
                            <Grid>
                                <SelectField
                                    title={'State / Province'}
                                    data={data.data}
                                    option={undefined}
                                    name={''}
                                    handleChange={undefined}
                                />
                                <InputField
                                    label={'Postal Code / Zip Code'}
                                    name={''}
                                    placeholder={''}
                                    value={''}
                                    handleChange={undefined}
                                    type={undefined}
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<RxCross2 />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography variant='h5' fontSize={18} fontWeight={500}>
                            Additional Details
                            <span style={{ color: "#617183", fontSize: 14, paddingInlineStart: 2 }}>(optional)</span>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid className={styles.additionalDetails}>
                            <Grid>
                                <InputField
                                    label={'Business Alias (Nick Name)'}
                                    name={''}
                                    placeholder={''}
                                    value={''}
                                    handleChange={undefined}
                                    type={undefined}
                                />
                                <InputField
                                    label={'Email'}
                                    name={''}
                                    placeholder={''}
                                    value={''}
                                    handleChange={undefined}
                                    type={undefined}
                                />
                            </Grid>
                            <Grid>
                                <InputField
                                    label={'Unique Key'}
                                    name={''}
                                    placeholder={''}
                                    value={''}
                                    handleChange={undefined}
                                    type={undefined}
                                />
                                <InputField
                                    label={'Phone Number'}
                                    name={''}
                                    placeholder={''}
                                    value={''}
                                    handleChange={undefined}
                                    type={undefined}
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Grid className={styles.action}>
                    <CommonButton name={"Close"} onClick={handleClose} />
                    <CommonButton name={"Create"} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default AddClientModal