import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './sidebar.css';

import { AiOutlineHome } from 'react-icons/ai';
import { TbCalendarTime } from 'react-icons/tb';
import { GrDocumentTime } from "react-icons/gr";
import { PiNoteBold, PiBriefcaseBold } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdEventAvailable } from "react-icons/md";


const menuItems = [
    { id: 1, icon: <AiOutlineHome />, title: "Dashboard", link: "/user-dashboard" },
    { id: 2, icon: <TbCalendarTime />, title: "Attendance", link: "/user-attendance" },
    { id: 3, icon: <GrDocumentTime />, title: "Manage Leave", link: "/user-leave" },
    { id: 4, icon: <MdEventAvailable />, title: "Holidays", link: "/user-holiday" },
    { id: 5, icon: <PiNoteBold />, title: "Salary Slip", link: "/user-salary-slip" },
    { id: 6, icon: <PiBriefcaseBold />, title: "Assets", link: "/user-asset" }
];

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="sidebar-wrapper">
            <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                <GiHamburgerMenu />
            </div>

            <div className={`sidebarContainer ${isOpen ? 'open' : ''}`}>
                <div>
                    <img src="/assets/logo.png" alt="logo" className="logo" />
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
        </div>
    );
};

export default Sidebar;
