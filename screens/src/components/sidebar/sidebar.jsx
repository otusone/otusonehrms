import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './sidebar.css';
import ChangePassword from '../change-password/change-password';


import { AiOutlineHome, AiOutlineTeam, AiOutlineUser } from 'react-icons/ai';
import { TbCalendarTime } from 'react-icons/tb';
import { GrDocumentTime } from "react-icons/gr";
import { PiNoteBold, PiBriefcaseBold } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineKey } from "react-icons/hi";
import { MdEventAvailable } from "react-icons/md";






const menuItems = [
    { id: 1, icon: <AiOutlineHome />, title: "Dashboard", link: "/dashboard" },
    //{ id: 2, icon: <AiOutlineTeam />, title: "Staff", link: "/staff" },
    { id: 3, icon: <AiOutlineUser />, title: "Employee", link: "/employee" },
    { id: 4, icon: <TbCalendarTime />, title: "Attendance", link: "/attendance" },
    { id: 5, icon: <GrDocumentTime />, title: "Manage Leave", link: "/manage-leave" },
    { id: 6, icon: <MdEventAvailable />, title: "Holidays", link: "/holiday" },
    { id: 7, icon: <PiNoteBold />, title: "Salary Slip", link: "/salary-slip" },
    { id: 8, icon: <PiBriefcaseBold />, title: "Assets", link: "/asset" },
    { id: 9, icon: <HiOutlineKey />, title: "Change Password", link: "/change-password" }



];

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);



    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

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
                                    if (item.link === "/change-password") {
                                        setPasswordModalOpen(true);
                                    } else {
                                        navigate(item.link);
                                    }
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
            <ChangePassword open={isPasswordModalOpen} handleClose={() => setPasswordModalOpen(false)} />

        </>
    );
};

export default Sidebar;
