import React, { useState } from 'react'
import styles from './Invoice.module.scss'
import { Divider, Grid, Typography, Box } from '@mui/material'
import InvoiceInfo from '../../components/Invoice/InvoiceInfo/InvoiceInfo'
import logo from '../../asserst/images/logo.png'
import SelectBox from '../../components/Invoice/SelectBox/SelectBox'
import InvoiceSelect from '../../components/Invoice/InvoiceSelect/InvoiceSelect'
import { Md123, MdAdd, MdNote, MdOutlineAttachFile, MdEdit, MdLocalPhone } from "react-icons/md";
import InvoiceTable from '../../components/Invoice/InvoiceTable/InvoiceTable'
import CheckoutCard from '../../components/Invoice/CheckoutCard/CheckoutCard'
import CommonButton from '../../components/common/CommonButton/CommonButton'
import AddClientModal from '../../components/Invoice/AddClientModal/AddClientModal'
import BilledBy from '../../components/Invoice/BilledBy/BilledBy'
import BilledTo from '../../components/Invoice/BilledTo/BilledTo'
import { CgMathPercent } from "react-icons/cg";
import TaxModal from '../../components/Invoice/Modal/TaxModal/TaxModal'
import AddItemModule from '../../components/Invoice/Modal/AddItemModule/AddItemModule'




const Invoice = () => {
    const addBTN = {
        "one": [
            {
                "id": 1,
                "icon": <MdAdd fontSize={20} style={{ color: '#58024B' }} />,
                "label": "Add Terms & Conditions"
            },
            {
                "id": 2,
                "icon": <MdNote fontSize={20} style={{ color: '#58024B' }} />,
                "label": "Add Notes"
            },
            {
                "id": 3,
                "icon": <MdOutlineAttachFile fontSize={20} style={{ color: '#58024B' }} />,
                "label": "Add Additional Info"
            },
            {
                "id": 4,
                "icon": <MdEdit fontSize={20} style={{ color: '#58024B' }} />,
                "label": "Add Signature"
            },
        ],
        "two": [

            {
                "id": 5,
                "icon": <MdNote fontSize={20} style={{ color: '#58024B' }} />,
                "label": "Add Additional Info"
            },
            {
                "id": 6,
                "icon": <MdLocalPhone fontSize={20} style={{ color: '#58024B' }} />,
                "label": "Add Contact Details"
            }
        ]
    }

    const [open, setOpen] = useState(false)
    const [addItemModal, setAddModalItem] = useState(false)
    const handleClick = () => setOpen(!open)
    const handleAddItem = () => setAddModalItem(!addItemModal)
    const handleClose = () => { setOpen(false); setAddModalItem(false) };

    const handleAddModal = (idx: any) => {
        console.log(idx, "jkl")
    }
    return (
        <Grid className={styles.invoiceContainer}>
            <Typography variant='h4' fontSize={32} fontWeight={500} textAlign={"center"}>Invoice</Typography>
            <Grid container className={styles.invoiceDetails}>
                <Grid>
                    <InvoiceInfo />
                </Grid>
                <Grid sx={{ marginInlineEnd: 4 }}>
                    <img src={logo} width={190} height={110} alt='logo' />
                </Grid>
            </Grid>
            <Grid container className={styles.billedInfo}>
                <Grid>
                    <BilledBy />
                </Grid>
                <Grid>
                    <BilledTo handleClick={handleClick} />
                </Grid>
            </Grid>
            {/* <Grid className={styles.taxContainer}>
                <SelectBox name={"Add Tax"} icon={<CgMathPercent fontSize={25} />} handleClick={handleTaxModal} />
                <Box>
                    <Typography >Currency*</Typography>
                    <InvoiceSelect />
                </Box>
                <SelectBox name={"Number/Currency Format"} icon={<Md123 fontSize={28} />} handleClick={undefined} />
                <SelectBox name={"Rename/Add Fields"} icon={<MdNote fontSize={22} />} handleClick={undefined} />
            </Grid> */}
            <Grid className={styles.invoiceTable}>
                <InvoiceTable handleClick={handleAddItem} />
            </Grid>
            <Grid className={styles.checkout}>
                <CheckoutCard />
            </Grid>

            <Grid className={styles.addtionalButton}>
                <Box>
                    {addBTN.one?.map((item) => {
                        return (
                            <Grid key={item.id} display={"flex"} onClick={(() => handleAddModal(item.id))}>
                                <Box>{item.icon}</Box>
                                <Typography sx={{ paddingInlineStart: 1 }}>{item.label}</Typography>
                            </Grid>
                        )
                    })}
                </Box>
                <Box>
                    {addBTN.two.map((item) => {
                        return (
                            <Grid key={item.id} display={"flex"}>
                                <Box>{item.icon}</Box>
                                <Typography>{item.label}</Typography>
                            </Grid>
                        )
                    })}
                </Box>

            </Grid>
            <Grid className={styles.acction}>
                <CommonButton name={"Save as Draft"} />
                <CommonButton name={"Save and Continue"} />
            </Grid>
            <AddClientModal
                open={open}
                handleClose={handleClose}
            />
            <AddItemModule
                open={addItemModal}
                handleClose={handleClose}
            />
        </Grid>
    )
}

export default Invoice