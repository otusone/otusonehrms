import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineTeam } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { PiNote } from 'react-icons/pi';
import { AiOutlineClockCircle } from 'react-icons/ai';

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
        "title": "Attendance",
        "link": "/attendance"
    },
    {
        "id": 3,
        "icon": <AiOutlineUser />,
        "title": "Leaves",
        "link": "/leaves",
    }
]