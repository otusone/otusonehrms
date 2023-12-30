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


const AddClientModal = ({ open }: any) => {
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
                    <RxCross2 fontSize={22} />
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
                        <Typography variant='h5' fontSize={18} fontWeight={500}>Tax Information (optional)</Typography>
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
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Advanced settings
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Filtering has been entirely disabled for whole web server
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                            amet egestas eros, vitae egestas augue. Duis vel est augue.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<RxCross2 />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                            amet egestas eros, vitae egestas augue. Duis vel est augue.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Grid className={styles.action}>
                    <CommonButton name={"Close"} />
                    <CommonButton name={"Create"} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default AddClientModal