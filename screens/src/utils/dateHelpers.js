export function getSundaysAnd4thSaturday(year, month) {
    // month: 0-based (0 = Jan, 1 = Feb, etc.)
    const sundays = [];
    let fourthSaturday = null;
    let saturdayCount = 0;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay(); // Sunday = 0, Saturday = 6

        if (dayOfWeek === 0) {
            sundays.push(day);
        } else if (dayOfWeek === 6) {
            saturdayCount++;
            if (saturdayCount === 4) {
                fourthSaturday = day;
            }
        }
    }

    return { sundays, fourthSaturday };
}
