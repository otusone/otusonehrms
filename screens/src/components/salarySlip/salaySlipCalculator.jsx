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

        const allPaidLeaveCandidates = new Set([...weekendSet, ...holidayDates].map(Number));
        //console.log("Raw Attendance:", attendanceData.map(r => r.date));
        console.log("LeavePaid", allPaidLeaveCandidates);

        const daysPresent = attendanceData
            .map(record => new Date(`${record.date}T00:00:00Z`))
            .filter(date => date.getFullYear() === year && date.getMonth() === month)
            .map(date => date.getDate());

        console.log("Present Days in Month:", daysPresent);

        const presentSet = new Set(daysPresent);


        const allAbsent = [];
        for (let day = startDay; day <= endDay; day++) {
            if (!presentSet.has(day) && !allPaidLeaveCandidates.has(day)) {
                allAbsent.push(day);
            }
        }


        const lopSet = new Set([...allAbsent]);
        console.log("absent days", lopSet);
        //console.log("Type of absent day:", typeof absentDay);
        //console.log("Type in leavePaid:", [...allPaidLeaveCandidates].map(x => typeof x));



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

                    if (
                        sandwichDays.length >= 1 &&
                        lopSet.has(left) &&
                        lopSet.has(right)
                    ) {
                        sandwichDays.forEach(d => lopSet.add(d));
                        //console.log("day", d);
                    }


                    day = right - 1;
                    //console.log(`Checking sandwich on day ${day}`);
                    //console.log(`Left: ${left}, Right: ${right}`);
                    //console.log(`lopSet.has(${left}):`, lopSet.has(left));
                    //console.log(`lopSet.has(${right}):`, lopSet.has(right));
                    console.log(`Identified sandwich days:`, sandwichDays);

                }
            }

        }


        // LOP - Holiday - LOP 
        for (let day = startDay + 1; day <= endDay - 1; day++) {
            if (
                lopSet.has(day - 1) &&
                allPaidLeaveCandidates.has(day) &&
                lopSet.has(day + 1)
            ) {
                lopSet.add(day);
                //console.log("day3", day);

                allPaidLeaveCandidates.delete(day);

                console.log(`Marked holiday on day ${day} as LOP due to sandwich between LOPs.`);
            }
        }




        for (let day = startDay; day <= endDay - 1; day++) {
            if (lopSet.has(day)) {
                let mid = day + 1;
                const sandwichCandidates = [];

                while (
                    allPaidLeaveCandidates.has(mid) &&
                    !presentSet.has(mid) &&
                    mid < endDay &&
                    !lopSet.has(mid)
                ) {
                    sandwichCandidates.push(mid);
                    mid++;
                }

                if (lopSet.has(mid)) {
                    sandwichCandidates.forEach(d => lopSet.add(d));
                    //console.log("day4", d);

                }

                day = mid - 1;
            }
        }


        // Holiday - LOP - Holiday
        for (let day = startDay + 1; day <= endDay - 1; day++) {
            if (
                allPaidLeaveCandidates.has(day - 1) &&
                lopSet.has(day) &&
                allPaidLeaveCandidates.has(day + 1)
            ) {
                lopSet.add(day - 1);
                //console.log("day", day);

                lopSet.add(day + 1);
                //console.log("day", day);


                allPaidLeaveCandidates.delete(day - 1);
                allPaidLeaveCandidates.delete(day + 1);

                console.log(`Sandwich LOP: Marked ${day - 1} and ${day + 1} as LOP`);
            }
        }



        // Holiday - LOP - LOP - Holiday 
        for (let day = startDay; day <= endDay - 1; day++) {
            if (allPaidLeaveCandidates.has(day)) {
                let mid = day + 1;
                const middleLOPs = [];

                while (lopSet.has(mid) && mid < endDay) {
                    middleLOPs.push(mid);
                    mid++;
                }

                // if (allPaidLeaveCandidates.has(mid)) {
                //     lopSet.add(day);
                //     console.log("day", day);

                //     lopSet.add(mid);
                //     console.log("day", day);

                // }
                if (middleLOPs.length > 0 && allPaidLeaveCandidates.has(mid)) {
                    lopSet.add(day);
                    lopSet.add(mid);
                }

                day = mid;
            }
        }


        for (let day = startDay + 2; day <= endDay - 2; day++) {
            if (
                lopSet.has(day - 2) &&
                allPaidLeaveCandidates.has(day - 1) &&
                lopSet.has(day) &&
                allPaidLeaveCandidates.has(day + 1) &&
                lopSet.has(day + 2)
            ) {
                lopSet.add(day - 1);
                //console.log("day", day);

                lopSet.add(day + 1);
                //console.log("day", day);

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
