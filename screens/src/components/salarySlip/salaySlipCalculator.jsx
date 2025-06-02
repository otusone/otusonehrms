import axiosInstance from "../../utils/baseurl";
import axios from "axios";
import { getSundaysAnd4thSaturday } from "../../utils/dateHelpers";

export const calculateSalary = async (userId, year, month, basicSalary, joiningDate, lastWorkingDate) => {
    try {
        const token = localStorage.getItem("authToken");

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const [attendanceRes, holidaysRes] = await Promise.all([
            axiosInstance.get(`/admin/attendance/${userId}`, config),
            axiosInstance.get(`/admin/get-holidays?year=${year}&month=${month}`, config),
        ]);

        const attendanceData = attendanceRes.data.data || [];
        const holidaysData = holidaysRes.data.holidays || [];
        //console.log(holidaysRes.data.holidays);

        const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

        const startDay = (joiningDate && new Date(joiningDate).getMonth() === month)
            ? new Date(joiningDate).getDate()
            : 1;

        const endDay = (lastWorkingDate && new Date(lastWorkingDate).getMonth() === month)
            ? new Date(lastWorkingDate).getDate()
            : totalDaysInMonth;

        const { sundays, fourthSaturday } = getSundaysAnd4thSaturday(year, month);
        const weekendSet = new Set(sundays);
        if (fourthSaturday) weekendSet.add(fourthSaturday);


        const holidayDates = holidaysData
            .map(holiday => new Date(holiday.date))
            .filter(date => date.getFullYear() === year && date.getMonth() === month)
            .map(date => date.getDate());

        const allPaidLeaveCandidates = new Set([...weekendSet, ...holidayDates]);
        //console.log("Raw Attendance:", attendanceData.map(r => r.date));
        //console.log("LeavePaid", allPaidLeaveCandidates);

        const daysPresent = attendanceData
            .map(record => new Date(`${record.date}T00:00:00Z`))
            .filter(date => date.getFullYear() === year && date.getMonth() === month)
            .map(date => date.getDate());

        //console.log("Present Days in Month:", daysPresent);

        const presentSet = new Set(daysPresent);


        const allAbsent = [];
        for (let day = startDay; day <= endDay; day++) {
            if (!presentSet.has(day) && !allPaidLeaveCandidates.has(day)) {
                allAbsent.push(day);
            }
        }


        const lopSet = new Set([...allAbsent]);


        for (let day = startDay + 1; day <= endDay - 1; day++) {
            if (
                allPaidLeaveCandidates.has(day) &&
                !presentSet.has(day) &&
                !lopSet.has(day)
            ) {
                let left = day - 1;
                let right = day + 1;

                while (allPaidLeaveCandidates.has(left) && !presentSet.has(left)) left--;
                while (allPaidLeaveCandidates.has(right) && !presentSet.has(right)) right++;

                if (lopSet.has(left) && lopSet.has(right)) {
                    const sandwichDays = [];

                    for (let d = left + 1; d < right; d++) {
                        if (
                            allPaidLeaveCandidates.has(d) &&
                            !presentSet.has(d)
                        ) {
                            sandwichDays.push(d);
                        }
                    }

                    if (sandwichDays.length >= 2) {
                        sandwichDays.forEach(d => lopSet.add(d));
                    }

                    day = right - 1;
                    // console.log(`Checking sandwich on day ${day}`);
                    // console.log(`Left: ${left}, Right: ${right}`);
                    // console.log(`lopSet.has(${left}):`, lopSet.has(left));
                    // console.log(`lopSet.has(${right}):`, lopSet.has(right));
                    // console.log(`Identified sandwich days:`, sandwichDays);

                }
            }

        }

        for (let day = startDay; day <= endDay - 3; day++) {

            if (lopSet.has(day)) {
                if (
                    allPaidLeaveCandidates.has(day + 1) &&
                    allPaidLeaveCandidates.has(day + 2) &&
                    !presentSet.has(day + 1) &&
                    !presentSet.has(day + 2)
                ) {

                    if (lopSet.has(day + 3)) {
                        lopSet.add(day + 1);
                        lopSet.add(day + 2);
                        //console.log(`Two holidays between LOP days detected on days ${day + 1} and ${day + 2}, counting as LOP.`);
                    }
                }
            }
        }


        for (let day = startDay; day <= endDay - 3; day++) {
            if (lopSet.has(day)) {
                if (
                    allPaidLeaveCandidates.has(day + 1) &&
                    allPaidLeaveCandidates.has(day + 2) &&
                    !presentSet.has(day + 1) &&
                    !presentSet.has(day + 2)
                ) {
                    if (lopSet.has(day + 3)) {
                        lopSet.add(day + 1);
                        lopSet.add(day + 2);
                        //console.log(`Two holidays between LOP days detected on days ${day + 1} and ${day + 2}, counting as LOP.`);
                    }
                }
            }
        }





        const paidDaysSet = new Set();
        for (let day = startDay; day <= endDay; day++) {
            if (presentSet.has(day)) {
                paidDaysSet.add(day);
            } else if (allPaidLeaveCandidates.has(day) && !lopSet.has(day)) {
                paidDaysSet.add(day);
            }
        }

        console.log(paidDaysSet)

        const eligibleDays = endDay - startDay + 1;
        const paidDays = paidDaysSet.size;
        const lopDays = eligibleDays - paidDays;
        const perDaySalary = basicSalary / totalDaysInMonth;
        const finalSalary = perDaySalary * paidDays;
        //console.log(finalSalary);

        return {
            paidDays,
            lopDays,
            finalSalary: Number(finalSalary.toFixed(2)),
        };
    } catch (err) {
        console.error("Error calculating salary:", err);
        return {
            paidDays: 0,
            lopDays: 0,
            finalSalary: 0,
        };
    }
};
