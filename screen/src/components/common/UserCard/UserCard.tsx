// import React from 'react'
// import styles from './UserCard.module.scss'
// import { Grid, Box, Typography } from '@mui/material'
// import { PiDotsThreeOutlineVerticalDuotone } from 'react-icons/pi';
// import CommonButton from '../CommonButton/CommonButton';
// import img from '../../../asserst/images/profile_pic.jpg'
// import { RxAvatar } from "react-icons/rx";
// import { PiUserCircleLight } from "react-icons/pi";

// export interface IUserCard {
//     label: string;
//     image?: string;
//     name: string;
//     email: string;
//     IsButton: boolean;
//     IsLabel: boolean;
//     handleClick?: any
// }
// const UserCard = ({ label, image, name, email, IsButton, IsLabel, handleClick }: IUserCard) => {
//     return (
//         <Grid className={styles.userCardContainer}>
//             {IsLabel ? <Box sx={{ display: "flex", justifyContent: "space-between", marginInlineEnd: "auto" }}>
//                 <Typography variant='h5'>{label}</Typography>
//                 <PiDotsThreeOutlineVerticalDuotone fontSize={20} onClick={handleClick} cursor={"pointer"} />
//             </Box>
//              :
//               <PiDotsThreeOutlineVerticalDuotone fontSize={20} />}
//             <Box>
//                 <Box>
//                     {/* <img src={img} alt='img' /> */}
//                     <RxAvatar fontSize={90} />
//                 </Box>
//                 <Typography variant='h4' align='center'>{name}</Typography>
//                 <Typography align='center'>{email}</Typography>
//                 {IsButton ? <CommonButton
//                     name={"#EMP00001"} onClick={function (): void {
//                         throw new Error('Function not implemented.');
//                     }} /> : ""}
//             </Box>
//         </Grid>
//     )
// }

// export default UserCard;


import React, { useState } from 'react';
import styles from './UserCard.module.scss';
import { Grid, Box, Typography, Menu, MenuItem } from '@mui/material';
import { PiDotsThreeOutlineVerticalDuotone } from 'react-icons/pi';
import { RxAvatar } from 'react-icons/rx';
import CommonButton from '../CommonButton/CommonButton';
import img from '../../../asserst/images/profile_pic.jpg';

export interface IUserCard {
  label: string;
  image?: string;
  name: string;
  email: string;
  IsButton: boolean;
  IsLabel: boolean;
  handleClose:any;
  handleDelete?: any;
  handleClick:any;
}

const UserCard = ({ label,handleDelete, handleClick,image, name, email, IsButton, IsLabel }: IUserCard) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClickDots = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    // Implement your edit logic here
    handleClose();
  };

//   const handleDelete = () => {
//     // Implement your delete logic here
//     handleClose();
//   };

  return (
    <Grid className={styles.userCardContainer}>
      {IsLabel ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginInlineEnd: 'auto' }}>
          <Typography variant="h5">{label}</Typography>
          <PiDotsThreeOutlineVerticalDuotone
  fontSize={20}
  onClick={(event: React.MouseEvent<SVGElement, MouseEvent>) => handleClickDots(event)}
  cursor="pointer"
/>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </Box>
      ) : (
        <PiDotsThreeOutlineVerticalDuotone fontSize={20} 
        // onClick={handleClickDots} cursor="pointer"
        />
      )}
      <Box>
        <Box>
          {/* <img src={img} alt='img' /> */}
          <RxAvatar fontSize={90} />
        </Box>
        <Typography variant="h4" align="center">
          {name}
        </Typography>
        <Typography align="center">{email}</Typography>
        {IsButton ? (
          <CommonButton
            name={'#EMP00001'}
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        ) : (
          ''
        )}
      </Box>
    </Grid>
  );
};

export default UserCard;
