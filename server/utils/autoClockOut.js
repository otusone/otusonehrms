const cron = require("node-cron");
const Attendance = require("../models/attendance");

cron.schedule("1 19 * * *", async () => {
    console.log(" Auto Clock-Out Job running at 7:01 PM");

    const today = new Date().toISOString().split("T")[0];
    const clockOutTime = new Date(`${today}T19:00:00.000Z`);

    try {
        const records = await Attendance.find({
            date: {
                $gte: new Date(`${today}T00:00:00.000Z`),
                $lte: new Date(`${today}T23:59:59.999Z`)
            },
            clockIn: { $ne: null },
            clockOut: null,
        });

        for (let record of records) {
            record.clockOut = clockOutTime;
            record.clockOutLocation = {
                latitude: 0,
                longitude: 0,
            };
            await record.save();
            console.log(`Auto clocked-out: ${record._id}`);
        }

        console.log("Auto Clock-Out complete");
    } catch (err) {
        console.error("Error during auto clock-out:", err);
    }
}, {
    timezone: "Asia/Kolkata"
});
