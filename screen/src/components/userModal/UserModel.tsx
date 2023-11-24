import React from 'react'
import styles from './UserModal.module.scss'
import { Box, Divider, Grid, Modal, TableBody, TableCell, Typography } from '@mui/material'
import InputField from '../inputField/InputField';
import { RxCross2 } from "react-icons/rx";
import CommonButton from '../common/CommonButton/CommonButton';
import SelectField from '../SelectField/SelectField';

export interface IUserModal {
    open: boolean;
    // handleChange: any;
    handleClose: any;
    handleCreate: any;
    photo:any
    branch:any;
    gender:any;
    tabledata:any;
    name:any;
    address:any;
    phone:any;
    role:any;
    taxPayerId:any;
    email:any;
    // photo:any;
    accHolderName:any;
    accNumber:any;
    dateOfJoin:any;
    department:any;
    bankName:any;
    resume:any;
    designation:any;
    certificate:any;
}

function UserModel({ open,name,certificate,phone,role,address,branch,email,accNumber,resume,dateOfJoin,designation,department,bankName, handleClose,taxPayerId,photo,accHolderName  }: IUserModal) {
    
  return (
    <Modal
    open={open}
    sx={{ width: 700, height: 'fit-content', margin: "auto" }}
>
    <Grid style={{height:600, overflow:"scroll", backgroundColor:'#ffffff'}}>
        <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant='h5' fontSize={22} fontWeight={500}></Typography>
            <RxCross2 fontSize={25} cursor={"pointer"} onClick={handleClose} />

        </Box>
        <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 4 }} />
        <Grid container  sx={{padding:4,}}>
            <Grid item sm={12}>
              <Grid container display={"flex"} >
                <Grid sm={6}>
                  <Typography variant="h5" fontSize={20} fontWeight={600} >
                 Personal Detail
                  </Typography>
                  <br/>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                    Name: <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{name}</span>
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                    Phone: <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{phone}</span>
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                    Address: <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{address}</span>
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Email : <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{email}</span> 
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <br/>
                  <br/>
                  <br/>
                  {/* <br/> */}
                  
                  <Typography variant="h5" fontSize={20} fontWeight={600} >
                  Employee Document
                  </Typography>
                  <br/>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Photo : <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{photo}</span> 
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Resume : <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{resume}</span> 
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Certificate : <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{certificate}</span> 
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <br/>
                  <br/>
                  <Typography variant="h5" fontSize={20} fontWeight={600} >
                  Emergency Contact
                  </Typography>
                  <br/>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                    NAME: <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{name}</span>
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                    Phone: <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{phone}</span>
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                    Address: <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{address}</span>
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Email : <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{email}</span> 
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Relation : <span style={{fontWeight:'lighter', fontSize:'1rem'}}>Relation</span> 
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  </Grid>

                  <Grid container sm={6} flexDirection={'column'}>
                  <Typography variant="h5" fontSize={20} fontWeight={600} >
                  Company Detail
                  </Typography>
                  <br/>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Branch: <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{branch}</span>
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Role: <span style={{fontWeight:'lighter', fontSize:'1rem'}} >{role}</span>
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Department : <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{department}</span> 
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Designation : <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{designation}</span> 
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Date Of Join : <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{dateOfJoin}</span> 
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                 <br/>
                 <br/>

                  <Typography variant="h5" fontSize={20} fontWeight={600} >
                  Bank Account Detail
                  </Typography>
                  <br/>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                 
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Acc Holder Name : <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{accHolderName}</span> 
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Acc. Number : <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{accNumber}</span> 
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Bank Name : <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{bankName}</span> 
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Tax Payer Id: <span style={{fontWeight:'lighter', fontSize:'1rem'}}>{taxPayerId}</span>
                  </Typography>
                  {/* <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} /> */}
                  
                 
                
                 
                  </Grid>
                </Grid>
            </Grid>
          </Grid>
       
    </Grid>
</Modal>
  )
}

export default UserModel
