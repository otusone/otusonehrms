import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './sidebar.css';

import { AiOutlineHome, AiOutlineTeam, AiOutlineUser } from 'react-icons/ai';
import { TbCalendarTime } from 'react-icons/tb';
import { GrDocumentTime } from "react-icons/gr";
import { PiNoteBold } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";

const menuItems = [
    { id: 1, icon: <AiOutlineHome />, title: "Dashboard", link: "/dashboard" },
    { id: 2, icon: <AiOutlineTeam />, title: "Staff", link: "/staff" },
    { id: 3, icon: <AiOutlineUser />, title: "Employee", link: "/employee" },
    { id: 4, icon: <TbCalendarTime />, title: "Attendance", link: "/attendance" },
    { id: 5, icon: <GrDocumentTime />, title: "Manage Leave", link: "/manage-leave" },
    { id: 6, icon: <PiNoteBold />, title: "Invoice", link: "/invoice" }
];

const Sidebar = ({ handleLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                <GiHamburgerMenu />
            </div>

            <div className={`sidebarContainer ${isOpen ? 'open' : ''}`}>
                <div>
                    <img src="/assets/logo.png" alt="logo" />
                    <div className="sidebarMenu">
                        {menuItems.map((item) => (
                            <div
                                key={item.id}
                                className={`menuItem ${location.pathname === item.link ? 'active' : ''}`}
                                onClick={() => {
                                    navigate(item.link);
                                    setIsOpen(false);
                                }}
                            >
                                {item.icon}
                                {item.title}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="logout" onClick={handleLogout}>
                    Logout
                </div>
            </div>
        </>
    );
};

export default Sidebar;
