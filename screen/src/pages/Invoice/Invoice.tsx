import React, { useEffect, useState } from 'react'
import styles from './Invoice.module.scss'
import { Grid, Typography, Box } from '@mui/material'
import InvoiceInfo from '../../components/Invoice/InvoiceInfo/InvoiceInfo'
import logo from '../../asserst/images/logo.png'
import { MdAdd, MdNote, MdEdit, MdLocalPhone } from "react-icons/md";
import InvoiceTable from '../../components/Invoice/InvoiceTable/InvoiceTable'
import CheckoutCard from '../../components/Invoice/CheckoutCard/CheckoutCard'
import CommonButton from '../../components/common/CommonButton/CommonButton'
import AddClientModal from '../../components/Invoice/AddClientModal/AddClientModal'
import BilledInfoCard from '../../components/Invoice/BilledInfoCard/BilledInfoCard'
import ItemModule from '../../components/Invoice/Modal/ItemModule/ItemModule'
import axios from 'axios'
import TermsConditionModal from '../../components/modal/TermsConditionModal/TermsConditionModal'
import ContactDetailsModal from '../../components/modal/ContactDetailsModal/ContactDetailsModal'
import SignatureModal from '../../components/modal/SignatureModal/SignatureModal'
import NotesModal from '../../components/modal/NotesModal/NotesModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import AddClientCard from '../../components/Invoice/AddClientCard/AddClientCard'

const Invoice = () => {
    const navigation = useNavigate()
    const [clientModal, setClientModal] = useState(false)
    const [addItemModal, setAddItemModal] = useState(false)
    const [tandC, setTandC] = useState(false)
    const [notesModal, setNotesModal] = useState(false)
    const [contactModal, setContactModal] = useState(false)
    const [signModal, setSignModal] = useState(false)
    const handleClientModal = () => setClientModal(!clientModal)
    const handleItemModal = () => setAddItemModal(!addItemModal)
    const handleTandCModal = () => setTandC(!tandC)
    const handleEditModal = () => { }
    const handleClose = () => { setClientModal(false); setAddItemModal(false); setTandC(false); setNotesModal(false); setContactModal(false); setSignModal(false) }
    const handleNotesModal = () => setNotesModal(!notesModal)
    const handleContactModal = () => setContactModal(!contactModal)
    const handleSignatureModal = () => setSignModal(!signModal)
    const [invoiceValue, setInvoiceValue] = useState<any>({ invoiceNo: "", date: "" })
    const [itemValue, setItemValue] = useState({ item: "", quantity: "", gst: "", amount: "" })
    const [itemData, setItemData] = useState<any>([]);
    const [tremValue, setTremValue] = useState({ term: '' })
    const [termData, setTermData] = useState<any>([]);
    const [noteValue, setNoteValue] = useState({ note: '' })
    const [noteData, setNoteData] = useState<any>([]);
    const [constactValue, setConstactValue] = useState({ name: '', email: "", phone: '' })
    const [clientValue, setClientValue] = useState({ businessName: "", country: "", clientIndustry: "", city: "" })
    const [clientDetails, setclientDetails] = useState<any>([]);
    const handleChangeInvoice = (e: any) => {
        const { name, value } = e.target;
        setInvoiceValue({ ...invoiceValue, [name]: value })
    }
    const handleChangeClientValue = (e: any) => {
        const { name, value } = e.target;
        setClientValue({ ...clientValue, [name]: value })
    }
    const handleChangeItem = (e: any) => {
        const { name, value } = e.target;
        setItemValue({ ...itemValue, [name]: value })
    }
    const handleChangeTerm = (e: any) => {
        const { name, value } = e.target;
        setTremValue({ ...tremValue, [name]: value })
    }
    const handleChangeNote = (a: any) => {
        const { name, value } = a.target;
        setNoteValue({ ...noteValue, [name]: value })
    }
    const handleChangeContact = (e: any) => {
        const { name, value } = e.target;
        setConstactValue({ ...constactValue, [name]: value })
    }
    const handleCreateClient = async () => {

        try {
            if (clientValue.businessName === "" || clientValue.city === "" || clientValue.country === "" || clientValue.clientIndustry === "") {
                toast.error("Please fill client details!");
                return;
            }
            await setclientDetails(clientValue);
            toast.success("Client added successfully!");
            setClientModal(false)
        } catch (err) {
            console.log(err);
        }
    };
    const handleCreateItem = async () => {
        try {
            if (itemValue.amount === '' || itemValue.gst === "" || itemValue.item === "" || itemValue.quantity === "") {
                toast.error("Please all the input field!")
                return;
            }
            const newItemData = itemValue;
            await setItemData((prevData: any) => [...prevData, newItemData])
            toast.success("Item add successfuly!")
            setAddItemModal(false)
        } catch (err) {
            console.log(err)
        }
    };
    const handleDeleteItem = () => { };
    const handleCrateTerm = async () => {
        try {
            if (tremValue.term === "") {
                toast.error("Please fill input field!")
                return;
            }
            const newTermData = tremValue;
            setTermData((prevData: any) => [...prevData, newTermData]);
            toast.success("A new terms and conditions added successfully");
            setTandC(false)
        } catch (err) {
            console.error(err)
        }
    };
    const handleClickNotes = () => {
        try {
            if (noteValue.note === "") {
                toast.error("Please fill input field!")
                return;
            }
            const newNoteData = noteValue;
            setNoteData((prevData: any) => [...prevData, newNoteData])
            toast.success("A new note added successfully");

            setNotesModal(false)
        } catch (err) {
            console.log(err)
        }
    };

    const invoiceData = [{
        invoice: invoiceValue, client: clientDetails, table: itemData, term: termData, note: noteData
    }];

    const handleSaveandContinue = async () => {
        if (invoiceValue.invoiceNo === '' || invoiceValue.data) {
            toast.error("Please fill invoice number and date")
            return;
        } else if (clientValue.businessName === '', clientValue.city === '', clientValue.country === '', clientValue.clientIndustry === '') {
            toast.error("Please fill client details!")
            return;
        } else if (itemValue.amount === '', itemValue.gst === '', itemValue.item === '', itemValue.quantity === '') {
            toast.error("Please fill item details!")
            return;
        } else if (tremValue.term === '') {
            toast.error("Please terms and conditions!")
            return;
        } else if (noteValue.note === '') {
            toast.error("Please additional note!")
            return;
        }
        try {
            localStorage.setItem("invoiceDetails", JSON.stringify(invoiceData))
            await navigation('/invoice-preview')
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <Grid className={styles.invoiceContainer}>
            <Typography variant='h4' fontSize={32} fontWeight={500} textAlign={"center"}>Invoice</Typography>
            <Grid container className={styles.invoiceDetails}>
                <Grid>
                    <InvoiceInfo
                        data={invoiceValue}
                        handleChange={handleChangeInvoice}
                    />
                </Grid>
                <Grid sx={{ marginInlineEnd: 4 }}>
                    <img src={logo} width={190} height={110} alt='logo' />
                </Grid>
            </Grid>
            <Grid container className={styles.billedInfo}>
                <Grid>
                    <BilledInfoCard
                        heading={'Your Details'}
                        businessName={'OTUSONE LLP'}
                        address={'Noida, Up, India'}
                    />
                </Grid>
                <Grid>
                    {1 + 1 === 12 ?
                        <BilledInfoCard
                            heading={'Client Details'}
                            businessName={'XYZ Pvt .Ltd'}
                            address={''}
                        /> :
                        <AddClientCard
                            heading={'Client Details'}
                            handleClick={handleClientModal}
                        />
                    }
                </Grid>
            </Grid>
            <Grid className={styles.invoiceTable}>
                <InvoiceTable
                    handleClick={handleItemModal}
                    data={itemData}
                    handleEdit={handleEditModal}
                    handleDelete={handleDeleteItem}
                />
            </Grid>
            <Grid className={styles.checkout}>
                {/* <CheckoutCard
                    totalAm={totalAm}
                    gts={gts}
                    data={checkoutValue}
                /> */}
            </Grid>

            <Grid className={styles.addtionalButton}>
                <Box>
                    <Grid display={"flex"} onClick={handleTandCModal}>
                        <Box><MdAdd fontSize={20} style={{ color: '#58024B' }} /></Box>
                        <Typography sx={{ paddingInlineStart: 1 }}>Add Terms & Conditions</Typography>
                    </Grid>
                    <Grid display={"flex"} onClick={handleNotesModal}>
                        <Box><MdNote fontSize={20} style={{ color: '#58024B' }} /></Box>
                        <Typography sx={{ paddingInlineStart: 1 }}>Add Notes</Typography>
                    </Grid>
                    <Grid display={"flex"} onClick={handleContactModal}>
                        <Box><MdLocalPhone fontSize={20} style={{ color: '#58024B' }} /></Box>
                        <Typography sx={{ paddingInlineStart: 1 }}>Add Contact Details</Typography>
                    </Grid>
                    <Grid display={"flex"} onClick={handleSignatureModal}>
                        <Box><MdEdit fontSize={20} style={{ color: '#58024B' }} /></Box>
                        <Typography sx={{ paddingInlineStart: 1 }}>Add Signature</Typography>
                    </Grid>
                </Box>
            </Grid>
            <Grid className={styles.acction}>
                <CommonButton name={"Save as Draft"} onClick={(() => navigation('/'))} />
                <CommonButton name={"Save and Continue"} onClick={handleSaveandContinue} />
            </Grid>
            <AddClientModal
                open={clientModal}
                handleClose={handleClose}
                inputData={clientValue}
                handleChange={handleChangeClientValue}
                handleClick={handleCreateClient}
            />
            <ItemModule
                open={addItemModal}
                heading='Add New Item'
                handleClose={handleClose}
                inputData={itemValue}
                handleChange={handleChangeItem}
                handleClick={handleCreateItem}
            />
            {/* <ItemModule
                open={editModal}
                heading='Edit Item'
                handleClose={handleClose}
                inputData={inputData}
                handleChange={handleChange}
                handleClick={handleEdit}
            /> */}
            <TermsConditionModal
                heading={"Add Terms & Conditions"}
                open={tandC}
                handleClose={handleClose}
                tremValue={tremValue}
                handleChange={handleChangeTerm}
                handleClick={handleCrateTerm}
                tremData={undefined}
            />
            <NotesModal
                open={notesModal}
                heading={'Additional Notes'}
                handleClose={handleClose}
                noteValue={noteValue}
                noteData={undefined}
                handleChange={handleChangeNote}
                handleClick={handleClickNotes}
            />
            <ContactDetailsModal
                open={contactModal}
                handleClose={handleClose}
                constactInfo={constactValue}
                handleChange={handleChangeContact}
                handleClick={undefined}
            />
            <SignatureModal
                open={signModal}
                handleClose={handleClose}
            />
            <ToastContainer />
        </Grid>
    )
}

export default Invoice