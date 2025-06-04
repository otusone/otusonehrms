import axiosInstance from "../../utils/baseurl";
import axios from "axios";
import { getSundaysAnd4thSaturday } from "../../utils/dateHelpers";

export const calculateSalary = async (userId, year, month, basicSalary, joiningDate, lastWorkingDate) => {
    try {
        const token = localStorage.getItem("authToken");

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const [attendanceRes, holidaysRes, employeeRes] = await Promise.all([
            axiosInstance.get(`/admin/attendance/${userId}`, config),
            axiosInstance.get(`/admin/get-holidays?year=${year}&month=${month}`, config),
            axiosInstance.get(`/admin/get-employees/${userId}`, config),
        ]);


        const attendanceData = attendanceRes.data.data || [];
        const holidaysData = holidaysRes.data.holidays || [];
        const totalDaysInMonth = new Date(year, month + 1, 0).getDate();


        const probationPeriodMonths = Number(employeeRes.data?.employee?.probationPeriodMonths || 0);
        const probationEndDate = new Date(joiningDate);
        probationEndDate.setMonth(probationEndDate.getMonth() + probationPeriodMonths);

        const monthEndDate = new Date(year, month + 1, 0);
        const isInProbation = probationEndDate > monthEndDate;

        // console.log("monthend", monthEndDate);
        // console.log("probationEndDate", probationEndDate);
        // console.log("joiningDate", joiningDate);
        // console.log("isInProbation", isInProbation);
        // console.log("Raw probationPeriodMonths from API:", employeeRes.data?.probationPeriodMonths);
        // console.log("Parsed probationPeriodMonths:", probationPeriodMonths);
        // console.log("Before mutation - probationEndDate:", probationEndDate);
        // console.log("employeeRes.data", employeeRes.data);


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
        //console.log("LeavePaid", allPaidLeaveCandidates);

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
        // console.log("absent days", lopSet);


        //LOP - Holiday- Holiday- Holiday - OR MORE - LOP
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

        console.log("LeavePaid", allPaidLeaveCandidates);
        console.log("absent days", lopSet);


        // Holiday - LOP - LOP - LOP - OR MORE - Holiday 
        for (let day = startDay; day <= endDay - 1; day++) {
            if (allPaidLeaveCandidates.has(day)) {
                let mid = day + 1;
                const middleLOPs = [];

                while (mid <= endDay && lopSet.has(mid)) {
                    middleLOPs.push(mid);
                    mid++;
                }

                if (middleLOPs.length > 0 && allPaidLeaveCandidates.has(mid)) {
                    console.log(`Sandwich Detected: ${day} -> ${middleLOPs.join(', ')} -> ${mid}`);
                    lopSet.add(day);
                    middleLOPs.forEach(d => lopSet.add(d));
                    lopSet.add(mid);
                }

                day = mid - 1;
            }
        }


        //LOP - H - LOP - H - LOP
        for (let day = startDay + 2; day <= endDay - 2; day++) {
            if (
                lopSet.has(day - 2) &&
                allPaidLeaveCandidates.has(day - 1) &&
                lopSet.has(day) &&
                allPaidLeaveCandidates.has(day + 1) &&
                lopSet.has(day + 2)
            ) {
                lopSet.add(day - 1);
                lopSet.add(day + 1);

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

        // Count half-day attendances
        let halfDayCount = 0;
        let fullDayCount = 0;
        let actualLOPdays = 0;

        attendanceData.forEach(record => {
            const date = new Date(`${record.date}T00:00:00Z`);
            if (date.getFullYear() === year && date.getMonth() === month) {
                if (record.attendanceType === "Half Day") halfDayCount++;
                else if (record.attendanceType === "Full Day") fullDayCount++;
            }
        });


        let lopFromHalfDays = 0;
        lopFromHalfDays = (halfDayCount * 0.5);

        actualLOPdays = Number((lopFromHalfDays + lopSet.size).toFixed(1));

        console.log("before loop", actualLOPdays);
        console.log(paidDaysSet);
        console.log(lopSet);

        if (!isInProbation && actualLOPdays > 0) {
            actualLOPdays = Math.max(0, actualLOPdays - 1);

        }
        console.log("after loop", actualLOPdays);


        const eligibleDays = endDay - startDay + 1;
        const paidDays = (endDay - startDay + 1) - actualLOPdays;
        const lopDays = eligibleDays - paidDays;
        const perDaySalary = basicSalary / totalDaysInMonth;
        const finalSalary = perDaySalary * paidDays;
        console.log(finalSalary);

        return {
            paidDays: paidDays,
            lopDays: actualLOPdays,
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
