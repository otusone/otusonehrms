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
    inputData: any;
    handleChange: any;
    handleClick: any;
}

const AddClientModal = ({ open, handleClose, inputData, handleChange, handleClick }: IAddClientModal) => {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChangeAccordion =
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
                <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')}>
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
                                    name={'businessName'}
                                    placeholder={''}
                                    value={inputData?.businessName}
                                    handleChange={handleChange}
                                    type={undefined}
                                />
                                <SelectField
                                    title={'Select Country *'}
                                    data={data.country}
                                    option={inputData?.country}
                                    name={'country'}
                                    handleChange={handleChange}
                                />
                            </Box>
                            <Box>
                                <SelectField
                                    title={'Client Industry'}
                                    data={data.industry}
                                    option={inputData?.clientIndustry}
                                    name={'clientIndustry'}
                                    handleChange={handleChange}
                                />
                                <InputField
                                    label={'City'}
                                    name={'city'}
                                    placeholder={''}
                                    value={inputData?.city}
                                    handleChange={handleChange}
                                    type={undefined}
                                />
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChangeAccordion('panel2')}>
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
                                    name={'gstNumber'}
                                    placeholder={''}
                                    value={inputData?.gstNumber}
                                    handleChange={handleChange}
                                    type={undefined}
                                />

                            </Box>
                            <Box>
                                <InputField
                                    label={'Business PAN Number'}
                                    name={'panNumber'}
                                    placeholder={''}
                                    value={inputData?.gstNumber}
                                    handleChange={handleChange}
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
                                data={data.taxTreatment}
                                option={inputData?.taxTreatment}
                                name={'taxTreatment'}
                                handleChange={handleChange}
                            />
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChangeAccordion('panel3')}>
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
                                    data={data.country}
                                    option={inputData?.country}
                                    name={'country'}
                                    handleChange={handleChange}
                                />
                                <InputField
                                    label={'City'}
                                    name={'city'}
                                    placeholder={''}
                                    value={inputData?.city}
                                    handleChange={handleChange}
                                    type={undefined}
                                />
                                <InputField
                                    label={'Street Address'}
                                    name={'streetAddress'}
                                    placeholder={''}
                                    value={inputData?.streetAddress}
                                    handleChange={handleChange}
                                    type={undefined}
                                />
                            </Grid>
                            <Grid>
                                <SelectField
                                    title={'State / Province'}
                                    data={data.state}
                                    option={inputData?.state}
                                    name={'state'}
                                    handleChange={undefined}
                                />
                                <InputField
                                    label={'Postal Code / Zip Code'}
                                    name={'zipCode'}
                                    placeholder={''}
                                    value={inputData?.zipCode}
                                    handleChange={handleChange}
                                    type={undefined}
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChangeAccordion('panel4')}>
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
                                    name={'nickName'}
                                    placeholder={''}
                                    value={inputData?.nickName}
                                    handleChange={handleChange}
                                    type={undefined}
                                />
                                <InputField
                                    label={'Email'}
                                    name={'email'}
                                    placeholder={''}
                                    value={inputData?.email}
                                    handleChange={handleChange}
                                    type={undefined}
                                />
                            </Grid>
                            <Grid>
                                <InputField
                                    label={'Unique Key'}
                                    name={'uniqueKey'}
                                    placeholder={''}
                                    value={inputData?.uniqueKey}
                                    handleChange={handleChange}
                                    type={undefined}
                                />
                                <InputField
                                    label={'Phone Number'}
                                    name={'phone'}
                                    placeholder={''}
                                    value={inputData?.phone}
                                    handleChange={handleChange}
                                    type={undefined}
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Grid className={styles.action}>
                    <CommonButton name={"Close"} onClick={handleClose} />
                    <CommonButton name={"Create"} onClick={handleClick} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default AddClientModal