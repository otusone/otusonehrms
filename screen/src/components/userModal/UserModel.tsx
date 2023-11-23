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
}

function UserModel({ open,name,gender,phone,role,address,branch,email,accNumber,resume,dateOfJoin,designation,department,bankName, handleClose,taxPayerId,photo,accHolderName  }: IUserModal) {
    
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
            <Grid item sm={6}>
              <Grid container display={"flex"} flexDirection={"column"}>
                  <Typography variant="h5" fontSize={20} fontWeight={600} textAlign={"center"}>
                Personal Detail
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                    NAME: <span>{name}</span>
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Branch: <span>{branch}</span>
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                    Address: <span>{address}</span>
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Photo : <span>{photo}</span> 
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Acc Holder Name : <span>{accHolderName}</span> 
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Acc. Number : <span>{accNumber}</span> 
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Bank Name : <span>{bankName}</span> 
                  </Typography>
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Designation : <span>{designation}</span> 
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                    Phone: <span>{phone}</span>
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Role: <span >{role}</span>
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Tax Payer Id: <span>{taxPayerId}</span>
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Email : <span>{email}</span> 
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Date Of Join : <span>{dateOfJoin}</span> 
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Department : <span>{department}</span> 
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Designation : <span>{designation}</span> 
                  </Typography>
                  <Divider sx={{ marginBlockStart: 2, marginBlockEnd: 5 }} />
                  <Typography variant="h5" fontSize={16} fontWeight={600}>
                  Resume : <span>{resume}</span> 
                  </Typography>
                </Grid>
            </Grid>
          </Grid>
       
    </Grid>
</Modal>
  )
}

export default UserModel
