import React, { useEffect, useRef, useState } from 'react'
import styles from './invoicePreview.module.scss'
import { Box, Grid, Table, TableContainer, TableHead, TableRow, TableCell, Typography, TableBody } from '@mui/material'
import img from '../../asserst/images/logo.png'
import BilledCard from '../../components/common/BilledCard/BilledCard'
import axios from 'axios'
import CheckoutCard from '../../components/Invoice/CheckoutCard/CheckoutCard'
import { FaHandPointRight } from "react-icons/fa";
import CommonButton from '../../components/common/CommonButton/CommonButton'
import html2canvas from 'html2canvas';

const InvoicePreview = () => {
    const myDetailsRef = useRef(null);
    const [tableData, setTableData] = useState([])
    const [businessName, setBusinessName] = useState("")
    const [gst, setGst] = useState()
    const [checkoutValue, setCheckOutValue] = useState()
    const [totalAm, setTotalAm] = useState();
    const [termData, setTremData] = useState<any>();
    const [noteData, setNoteData] = useState<any>();

    useEffect(() => {
        const InvoiceDataStr: any = localStorage.getItem("invoiceDetails");
        const InvoiceData = JSON.parse(InvoiceDataStr);
        const client = InvoiceData[0].client;
        const term = InvoiceData[0].term;
        const note = InvoiceData[0].note;
        const table = InvoiceData[0].table;
        const tablegst = InvoiceData[0].table[0].gst;

        setBusinessName(client.businessName);
        setTremData(term)
        setNoteData(note)
        setTableData(table)
        setGst(tablegst)
    }, [])

    const getData = async () => {
        try {
            const itemData = tableData;
            const onlyAmounts: any[] = itemData.map((item: any) => ({ quantity: item.quantity, amount: (item.quantity * item.amount) }));
            const totalAmount = onlyAmounts.reduce((accumulator: number, currentValue: any) => accumulator + currentValue.amount, 0);
            if (gst !== undefined) {
                const newGst = totalAmount * gst / 100;
                const finalValue = totalAmount + newGst;
                setCheckOutValue(finalValue)
                setTotalAm(totalAmount)
                setTableData(itemData)
            } else {
                console.error('Error: gst is undefined');
            }
        } catch (err) {
            console.error(err)
        }
    };
    const handleDownload = () => {
        if (myDetailsRef.current) {
            html2canvas(myDetailsRef.current)
                .then((canvas) => {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL();
                    link.download = 'invoiceDetails.png';
                    link.click();
                })
                .catch((error) => {
                    console.error('Error capturing invoiceDetails:', error);
                });
        }
    }
    console.log(checkoutValue, "checkoutValue..")
    useEffect(() => {
        getData();

    }, [])
    return (
        <Grid>
            <Grid className={styles.invoicePreviewContainer} ref={myDetailsRef}>
                <Typography variant='h5' fontSize={25} fontWeight={600}>Invoice</Typography>
                <Grid display={"flex"} justifyContent={"space-between"} className={styles.invoicePreviewHeading}>
                    <Box>
                        <Box>
                            <Typography>Invoice No: <span>00001</span></Typography>
                            <Typography>Invoice Date: <span>12 jan 2024</span></Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <img src={img} alt='logo' />
                        </Box>
                    </Box>
                </Grid>
                <Grid className={styles.billedCardSection}>
                    <Box>
                        <BilledCard
                            heading={'Billed By'}
                            name={'OTUSONE LLC'}
                            address={'Noida, UP, India'} />
                    </Box>
                    <Box>
                        <BilledCard
                            heading={'Billed To'}
                            name={businessName}
                            address={''} />
                    </Box>
                </Grid>
                <Grid>
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ backgroundColor: "#58024B" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>ITEM</TableCell>
                                    <TableCell sx={{ color: "#ffffff", textAlign: "center" }} >QUANTITY</TableCell>
                                    <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>GST</TableCell>
                                    <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>AMOUNT</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData && tableData.map((item: any) => {
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell sx={{ textAlign: "center" }}>{item.item}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }} >{item.quantity}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>{item.gst}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>{item.amount}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid className={styles.checkout}>
                    <CheckoutCard
                        totalAm={totalAm}
                        gts={gst}
                        data={checkoutValue}
                    />
                </Grid>
                <Grid className={styles.termsConditions}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Terms and Conditions</Typography>
                    {termData && termData.map((item: any) => {
                        return (
                            <Box>
                                <FaHandPointRight fontSize={25} style={{ color: '#58024B' }} />
                                <Typography sx={{ paddingInlineStart: 1.5 }}>{item.term}</Typography>
                            </Box>
                        )
                    })}
                </Grid>
                <Grid className={styles.termsConditions}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Additional Notes</Typography>
                    {noteData && noteData.map((item: any) => {
                        return (
                            <Box>
                                <FaHandPointRight fontSize={25} style={{ color: '#58024B' }} />
                                <Typography sx={{ paddingInlineStart: 1.5 }}>{item.note}</Typography>
                            </Box>
                        )
                    })}
                </Grid>
                <Grid className={styles.bankDetails}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Bank Details</Typography>
                    <Grid>
                        <Box>
                            <Typography>Bank Name: <span>SBI</span></Typography>
                            <Typography>Account Holder Name: <span>Sherry Lin</span></Typography>
                            <Typography>IFSC Code: <span>SBI0082</span></Typography>
                            <Typography>Branch Name: <span>Noida, UP, India</span></Typography>
                        </Box>
                        <Box>
                            <Typography textAlign={"center"} marginBlockEnd={1}>UPI- Scan to Pay</Typography>
                            <Box>                        {/* <img src='' alt='QR' /> */}
                            </Box>
                        </Box>
                    </Grid>

                </Grid>
            </Grid>
            <Grid className={styles.action}>
                <CommonButton name={"Cencel"} />
                <CommonButton name={"Download"} onClick={handleDownload} />
            </Grid>
        </Grid>
    )
}

export default InvoicePreview