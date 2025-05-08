// import React, { useEffect, useState } from "react";
// import { Avatar, Box, Grid, Typography, IconButton, Badge } from "@mui/material";
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import axios from "axios";

// const Topbar = () => {
//     const [profile, setProfile] = useState({ name: "", role: "", avatar: "" });

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const response = await axios.get("http://localhost:8000/api/v1/user/profile/6819b47a26c4b0f6be47018e");
//                 const data = response.data.user;
//                 setProfile({
//                     name: data.userName,
//                     role: data.role,
//                     avatar: data.avatar || "",
//                 });
//             } catch (err) {
//                 console.error("Failed to fetch profile:", err);
//             }
//         };
//         fetchProfile();
//     }, []);

//     const formattedDate = new Date().toDateString();

//     return (
//         <Box sx={{ backgroundColor: "#f4f4f4", padding: 2 }}>
//             <Grid container justifyContent="space-between" alignItems="center">
//                 <Grid item display="flex" alignItems="center" gap={2}>
//                     <Avatar src={profile.avatar} alt={profile.name} sx={{ width: 56, height: 56 }} />
//                     <Box>
//                         <Typography variant="h6" fontWeight="bold">Welcome, {profile.name || "Admin"}</Typography>
//                         <Typography variant="body2">{formattedDate}</Typography>
//                     </Box>
//                 </Grid>
//                 <Grid item>
//                     <IconButton>
//                         <Badge badgeContent={0} color="error">
//                             <ChatBubbleOutlineIcon style={{ color: "#d63384" }} />
//                         </Badge>
//                     </IconButton>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// };

// export default Topbar;

import React from 'react';
import './Heading.css';
import { Typography } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';

const Heading = () => {
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div className="heading-container">
            <div className="left-section">
                <FaUserCircle className="user-icon" />
                <div>
                    <Typography variant="h6" className="welcome-text">
                        Welcome, Admin
                    </Typography>
                    <Typography variant="body2" className="date-text">
                        {today}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default Heading;

