import axiosInstance from "../../utils/baseurl";
import axios from "axios";


export const getSundaysAnd4thSaturday = (year, month) => {
    const sundays = [];
    let fourthSaturday = null;
    let saturdayCount = 0;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay();

        if (dayOfWeek === 0) sundays.push(day);
        else if (dayOfWeek === 6) {
            saturdayCount++;
            if (saturdayCount === 4) fourthSaturday = day;
        }
    }

    return { sundays, fourthSaturday };
};

export const calculatePaidAndLopDays = async (userId, year, month) => {
    try {
        const res = await axios.get(`http://localhost:8000/api/v1/user/attendance/${userId}`);
        const attendanceData = res.data.data || [];
        console.log("attendace", attendanceData);
        console.log("userid", userId);

        const daysPresent = attendanceData
            .map(record => new Date(record.date))
            .filter(date => date.getFullYear() === year && date.getMonth() === month)
            .map(date => date.getDate());

        const { sundays, fourthSaturday } = getSundaysAnd4thSaturday(year, month);
        const paidDaysArray = [...daysPresent, ...sundays];
        if (fourthSaturday) paidDaysArray.push(fourthSaturday);

        const paidDaysSet = new Set(paidDaysArray);
        const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

        return {
            paidDays: paidDaysSet.size,
            lopDays: totalDaysInMonth - paidDaysSet.size,
        };
    } catch (err) {
        console.error("Error fetching attendance:", err);
        return { paidDays: 0, lopDays: 0 };
    }
};
