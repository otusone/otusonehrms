import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineTeam } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { PiNote } from 'react-icons/pi';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FaGraduationCap } from 'react-icons/fa';
import { GrDocumentTime } from "react-icons/gr";
import { TbCalendarTime } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";

export const menuData = [
    {
        "id": 1,
        "icon": <AiOutlineHome />,
        "title": "Dashboard",
        "link": "/"
    },
    {
        "id": 2,
        "icon": <AiOutlineTeam />,
        "title": "Staff",
        "link": "/user"
    },
    {
        "id": 3,
        "icon": <AiOutlineUser />,
        "title": "Employee",
        "link": "/employee",
    },
    {
        "id": 4,
        "icon": <TbCalendarTime />,
        "title": "Attandance",
        "link": "/attandance",
    },
    {
        "id": 5,
        "icon": <GrDocumentTime />,
        "title": "Manage Leave",
        "link": "/manage-leave",
    },
    {
        "id": 6,
        "icon": <FaTasks />,
        "title": "Ticket",
        "link": "/ticket",
    },
    {
        "id": 7,
        "icon": <PiNote />,
        "title": "Payroll",
        "link": "/payroll",
    },
]