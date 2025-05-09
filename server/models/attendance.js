const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    clockIn: { type: Date, required: true },
    clockOut: { type: Date, required: false },
    date: { type: String, required: true },
    clockInLocation: { latitude: { type: Number }, longitude: { type: Number }, },
    clockOutLocation: { latitude: { type: Number }, longitude: { type: Number }, },
    workingHours: { type: Number, default: 0 },

}, { timestamps: true })

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;