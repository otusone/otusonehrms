import React, { useState } from "react";
import styles from "./UserCard.module.scss";
import { Grid, Box, Typography, Menu, MenuItem } from "@mui/material";
import { PiDotsThreeOutlineVerticalDuotone } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import CommonButton from "../CommonButton/CommonButton";
import img from "../../../asserst/images/profile_pic.jpg";

export interface IUserCard {
  label: string;
  image?: string;
  name: string;
  email: string;
  IsButton: boolean;
  IsLabel: boolean;
  handleClose: any;
  handleClick: any;
}

const UserCard = ({
  label,
  handleClick,
  name,
  email,
  IsButton,
  IsLabel,
}: IUserCard) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClickDots = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    // Implement your edit logic here
    handleClose();
  };

  return (
    <Grid className={styles.userCardContainer}>
      {IsLabel ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginInlineEnd: "auto",
          }}
        >
          <Typography variant="h5">{label}</Typography>
          <PiDotsThreeOutlineVerticalDuotone
            fontSize={20}
            onClick={(event: React.MouseEvent<SVGElement, MouseEvent>) =>
              handleClickDots(event)
            }
            cursor="pointer"
          />

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleClick}>Delete</MenuItem>
          </Menu>
        </Box>
      ) : (
        <PiDotsThreeOutlineVerticalDuotone fontSize={20} />
      )}
      <Box>
        <Box>
          <RxAvatar fontSize={90} />
        </Box>
        <Typography variant="h4" align="center">
          {name}
        </Typography>
        <Typography align="center">{email}</Typography>
        {IsButton ? <CommonButton name={"#EMP00001"} /> : ""}
      </Box>
    </Grid>
  );
};

export default UserCard;
