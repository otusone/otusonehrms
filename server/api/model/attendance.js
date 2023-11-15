const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    name: String,
    date: String,
    status: String,
    clock_in: String,
    clock_out: String,
    late: String,
    early_leaving: String,
    overtime: String,
});

module.exports = mongoose.model('Attendance', attendanceSchema);
