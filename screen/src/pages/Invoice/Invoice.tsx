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
import BilledBy from '../../components/Invoice/BilledBy/BilledBy'
import BilledTo from '../../components/Invoice/BilledTo/BilledTo'
import ItemModule from '../../components/Invoice/Modal/ItemModule/ItemModule'
import axios from 'axios'
import TermsConditionModal from '../../components/modal/TermsConditionModal/TermsConditionModal'
import ContactDetailsModal from '../../components/modal/ContactDetailsModal/ContactDetailsModal'
import SignatureModal from '../../components/modal/SignatureModal/SignatureModal'


const Invoice = () => {

    const [open, setOpen] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [tandC, setTandC] = useState(false);
    const handleTandC = () => setTandC(!tandC);
    const [notesModal, setNotesModal] = useState(false);
    const [contactModal, setContactModal] = useState(false);
    const handleContactModal = () => setContactModal(!contactModal);
    const [signModal, setSignModal] = useState(false);
    const handleSignatureModal = () => setSignModal(!signModal)

    const handleNotesModal = () => setNotesModal(!notesModal);
    const [inputData, setInputData] = useState({ item: "", amount: "", quantity: "", gst: "", });
    const [tableData, setTableData] = useState([]);
    const [selectedItem, setSelectedItem] = useState();
    const [addItemModal, setAddModalItem] = useState(false);

    const [clientData, setClientData] = useState<any>({
        businessName: "", country: "", clientIndustry: "", city: "", gstNumber: "", panNumber: "", clientType: "", taxTreatment: "", addressContainer: "", streetAddress: "", state: "", zipCode: "", nickName: "", email: "", uniqueKey: "", phone: ""
    })
    const [tremValue, setTremValue] = useState({ term: "" })
    const [invoiceNo, setInvoiceNo] = useState({ invoiceNo: "", date: "" })
    const [clientList, setClientList] = useState([]);
    const [businessName, setBusinessName] = useState([]);
    const [businessAddress, setBusinessAddress] = useState([]);
    const [checkoutValue, setCheckOutValue] = useState()
    const [totalAm, setTotalAm] = useState();
    const [constactInfo, setConstactInfo] = useState({ name: "", phone: "", email: '' });
    const [gts, setGst] = useState();

    const handleClick = () => setOpen(!open);
    const handleAddItem = () => setAddModalItem(!addItemModal);
    const handleClose = () => { setOpen(false); setAddModalItem(false); setEditModal(false); setTandC(false); setNotesModal(false); setContactModal(false); setSignModal(false) };

    const handleEditModal = async (idx: any) => {
        setEditModal((preState: any) => ({ ...preState, [idx]: !preState[idx] }))
        setSelectedItem(idx)
        const res = await axios.get('https://hrms-server-ygpa.onrender.com/invoice');

        if (res.status === 200) {
            const resData = res.data.employeeData;
            const filteredData = resData.filter((employee: any) => employee._id === idx);

            setInputData({
                item: filteredData[0].item,
                amount: filteredData[0].amount,
                quantity: filteredData[0].quantity,
                gst: filteredData[0].gst,
            });
        } else {
            console.error('Failed to fetch employee data');
        }
    };

    const handleAddModal = (idx: any) => {
        console.log(idx, "jkl")
    }
    const handleChangeInvoice = (e: any) => {
        const { name, value } = e.target;
        setInvoiceNo({ ...invoiceNo, [name]: value })

    }
    console.log(invoiceNo, "invoiceNo...")
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
    }
    const handleChangeClientForm = (e: any) => {
        const { name, value } = e.target;
        setClientData({ ...clientData, [name]: value })
    }
    const handleChangeTerm = (e: any) => {
        const { name, value } = e.target;
        setTremValue({ ...tremValue, [name]: value })
    }
    const handleChangeContact = (e: any) => {
        const { name, value } = e.target;
        setConstactInfo({ ...constactInfo, [name]: value })
    }
    const getData = async () => {
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/invoice`)
            const itemData = response.data.employeeData;
            const findGst = itemData[0].gst;
            setGst(findGst)
            const onlyAmounts: any[] = itemData.map((item: any) => ({ quantity: item.quantity, amount: (item.quantity * item.amount) }));

            const totalAmount = onlyAmounts.reduce((accumulator: number, currentValue: any) => accumulator + currentValue.amount, 0);
            const newGst = totalAmount * findGst / 100
            console.log(newGst, "newGst..")
            const finalValue = totalAmount + newGst;

            setCheckOutValue(finalValue)
            setTotalAm(totalAmount)

            setTableData(itemData)
            console.log(totalAmount, "totalAmount..")
        } catch (err) {
            console.error(err)
        }
    };
    const getClientData = async () => {
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/addClient`)
            const res = response.data.clientData;
            if (Array.isArray(res) && res.length > 0) {
                const lastBusinessName = res[res.length - 1].businessName;
                const lastBusinessAddress = res[res.length - 1].country;
                setBusinessName(lastBusinessName)
                setBusinessAddress(lastBusinessAddress)
            } else {
                console.error("clientData is not an array or is empty");
            }



        } catch (err) {
            console.error(err)
        }
    };
    const handleCreate = async () => {
        try {
            await axios.post(`https://hrms-server-ygpa.onrender.com/invoice/create`, inputData)
            await getData();

        } catch (err) {
            console.error(err)
        } finally {
            setOpen(false)
        }

    };
    const handleEdit = async () => {
        await axios.put(`https://hrms-server-ygpa.onrender.com/invoice/${selectedItem}`, inputData);
        await getData();
    };
    const handleDelete = async (idx: any) => {
        const response = await axios.delete(`https://hrms-server-ygpa.onrender.com/invoice/${idx}`);
        if (response.status === 200) {

            const updatedEmployeeData = tableData.filter(
                (employee: { _id: any; }) => employee._id !== idx
            );

            setTableData(updatedEmployeeData);
            console.log("Employee deleted successfully.");
        } else {
            console.error(`Failed to delete employee. Server responded with status ${response.status}`);
        }

        await getData();
    };
    const handleCreateClient = async () => {
        try {
            const response = await axios.post(`https://hrms-server-ygpa.onrender.com/addClient/create`, clientData)

        } catch (err) {
            console.error(err)

        } finally {
            setOpen(false)
        }
    }

    useEffect(() => {
        getData();
        getClientData();
    }, []);

    return (
        <Grid className={styles.invoiceContainer}>
            <Typography variant='h4' fontSize={32} fontWeight={500} textAlign={"center"}>Invoice</Typography>
            <Grid container className={styles.invoiceDetails}>
                <Grid>
                    <InvoiceInfo
                        data={invoiceNo}
                        handleChange={handleChangeInvoice}
                    />
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
                    <BilledTo
                        businessName={businessName}
                        businessAddress={businessAddress}
                        handleClick={handleClick} />
                </Grid>
            </Grid>
            <Grid className={styles.invoiceTable}>
                <InvoiceTable
                    handleClick={handleAddItem}
                    data={tableData}
                    handleEdit={handleEditModal}
                    handleDelete={handleDelete}
                />
            </Grid>
            <Grid className={styles.checkout}>
                <CheckoutCard
                    totalAm={totalAm}
                    gts={gts}
                    data={checkoutValue}
                />
            </Grid>

            <Grid className={styles.addtionalButton}>
                <Box>
                    <Grid display={"flex"} onClick={handleTandC}>
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
                <CommonButton name={"Save as Draft"} />
                <CommonButton name={"Save and Continue"} />
            </Grid>
            <AddClientModal
                open={open}
                handleClose={handleClose}
                inputData={clientData}
                handleChange={handleChangeClientForm}
                handleClick={handleCreateClient} />
            <ItemModule
                open={addItemModal}
                heading='Add New Item'
                handleClose={handleClose}
                inputData={inputData}
                handleChange={handleChange}
                handleClick={handleCreate}
            />
            <ItemModule
                open={editModal}
                heading='Edit Item'
                handleClose={handleClose}
                inputData={inputData}
                handleChange={handleChange}
                handleClick={handleEdit}
            />
            <TermsConditionModal
                heading={"Add Terms & Conditions"}
                open={tandC}
                handleClose={handleClose}
                tremValue={tremValue}
                handleChange={handleChangeTerm}
            />
            <TermsConditionModal
                heading={"Additional Notes"}
                open={notesModal}
                handleClose={handleClose}
                tremValue={tremValue}
                handleChange={handleChangeTerm}
            />
            <ContactDetailsModal
                open={contactModal}
                handleClose={handleClose}
                constactInfo={constactInfo}
                handleChange={handleChangeContact}
            />
            <SignatureModal
                open={signModal}
                handleClose={handleClose}
            />
        </Grid>
    )
}

export default Invoice