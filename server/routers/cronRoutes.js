const express = require("express");
const router = express.Router();
const Attendance = require("../models/attendance");

router.post("/auto-clockout", async (req, res) => {
    const secret = req.headers["x-cron-secret"];

    if (secret !== process.env.CRON_SECRET) {
        return res.status(403).send("Unauthorized");
    }

    try {
        const today = new Date().toISOString().split("T")[0];
        const utcClockOutTime = new Date(`${today}T13:30:00.000Z`);
        const istOffsetMs = 5.5 * 60 * 60 * 1000;
        const clockOutTime = new Date(utcClockOutTime.getTime() + istOffsetMs);


        const records = await Attendance.find({
            date: today,
            clockIn: { $ne: null },
            clockOut: null,
        });

        for (let record of records) {
            const clockInTime = new Date(record.clockIn);
            const hoursWorked = (clockOutTime - clockInTime) / (1000 * 60 * 60);

            record.clockOut = clockOutTime;
            record.clockOutLocation = { latitude: 0, longitude: 0 };
            record.workingHours = parseFloat(hoursWorked.toFixed(2));
            await record.save();
        }

        return res.status(200).json({ message: "Auto Clock-Out successful" });
    } catch (err) {
        console.error("Cron Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
