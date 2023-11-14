import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineTeam } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { PiNote } from 'react-icons/pi';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FaGraduationCap } from 'react-icons/fa';

export const menuData = [
    {
        "id": 1,
        "icon": <AiOutlineHome />,
        "title": "Dashboard",
        "link": "/",
        "subtitle": [
            {
                "id": 1,
                "icon": <AiOutlineHome />,
                "menu": "Overview",
                "subLink": "#!"
            },
            {
                "id": 2,
                "icon": <AiOutlineHome />,
                "menu": "Report",
                "subLink": "/report"
            }
        ]
    },
    {
        "id": 2,
        "icon": <AiOutlineTeam />,
        "title": "Staff",
        "link": "/user",
        "subtitle": [
            {
                "id": 1,
                "icon": <AiOutlineHome />,
                "menu": "User",
                "subLink": "/user"
            },
            {
                "id": 3,
                "icon": <AiOutlineHome />,
                "menu": "Employee Profile",
                "subLink": "/employee-profile"
            }
        ]
    },
    {
        "id": 3,
        "icon": <AiOutlineUser />,
        "title": "Employee",
        "link": "/employee",
    },
    {
        "id": 4,
        "icon": <PiNote />,
        "title": "Payroll",
        "link": "/payroll",
        "subtitle": [
            {
                "id": 1,
                "icon": <AiOutlineHome />,
                "menu": "Set Salary",
                "subLink": "/set-salary"
            },
            {
                "id": 2,
                "icon": <AiOutlineHome />,
                "menu": "Payslip",
                "subLink": "/payslip"
            }
        ]
    },
    {
        "id": 5,
        "icon": <AiOutlineClockCircle />,
        "title": "Timesheet",
        "link": "/timesheet",
        "subtitle": [
            {
                "id": 1,
                "icon": <AiOutlineHome />,
                "menu": "Timesheet",
                "subLink": "/timesheet"
            },
            {
                "id": 1,
                "icon": <AiOutlineHome />,
                "menu": "Manage Leave",
                "subLink": "/manage-leave"
            },
            {
                "id": 1,
                "icon": <AiOutlineHome />,
                "menu": "Attandance",
                "subLink": "/attandance"
            }
        ]
    },
    {
        "id": 6,
        "icon": <AiOutlineClockCircle />,
        "title": "Ticket",
        "link": "/ticket",
        "subtitle": []
    }
]