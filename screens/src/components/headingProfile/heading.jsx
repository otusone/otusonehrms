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

