const Attendance = require("../models/attendance");

exports.markClockIn = async (req, res) => {
  try {
    const { userId, clockIn, date, clockInLocation } = req.body;

    const attendance = new Attendance({
      userId,
      clockIn,
      date,
      clockInLocation,
    });

    await attendance.save();

    res.status(201).json({
      success: true,
      message: "Attendance marked for Clock In successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


exports.markClockOut = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, clockOut, date, clockOutLocation } = req.body;
    const attendance = await Attendance.findByIdAndUpdate(id, { clockOut, clockOutLocation }, { new: true });

    if (!attendance) {
      return res.status(404).json({ success: false, message: "ClockOut Attendance record not found" });
    }
    res.status(200).json({ success: true, message: " ClockOut Attendence recorded successfully", data: attendance });
  } catch (error) {
    res.status(500).json({
      success: false, message: error.message || "Invalid Server Error"
    })
  }
}



exports.getAtendanceByDate = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { date } = req.query;
    const attendance = await Attendance.findOne({ userId, date });
    if (!attendance) {
      return res.status(404).json({ success: false, message: "No attendane found for the selected date" });
    }
    res.status(200).json({ success: true, message: "Attendace Record fetched Successfully", attendance })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
}

exports.getMonthlyReport = async (req, res) => {
  try {
    const userId = req.user._id;
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({
        success: false,
        message: "Please provide month in YYYY-MM format",
      });
    }

    const startDate = new Date(`${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const startStr = startDate.toISOString().split("T")[0];
    const endStr = endDate.toISOString().split("T")[0];

    const attendanceRecords = await Attendance.find({
      userId: userId,
      date: { $gte: startStr, $lt: endStr },
    }).sort({ date: 1 });

    if (!attendanceRecords.length) {
      return res.status(404).json({
        success: false,
        message: "No attendance records found for this month",
      });
    }

    let totalMonthlyHours = 0;

    const report = attendanceRecords.map((record) => {
      const {
        clockIn,
        clockOut,
        clockInLocation,
        clockOutLocation,
        date,
      } = record;

      let workingHours = 0;

      if (clockIn && clockOut) {
        workingHours =
          (new Date(clockOut) - new Date(clockIn)) / (1000 * 60 * 60);
        totalMonthlyHours += workingHours;
      }

      return {
        date,
        clockIn: clockIn ? new Date(clockIn).toISOString() : "N/A",
        clockOut: clockOut ? new Date(clockOut).toISOString() : "N/A",
        clockInLocation: clockInLocation || "N/A",
        clockOutLocation: clockOutLocation || "N/A",
        workingHours: workingHours.toFixed(2),
      };
    });

    return res.status(200).json({
      success: true,
      report,
      totalMonthlyHours: totalMonthlyHours.toFixed(2),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};


exports.getAllAttendance = async (req, res) => {
  try {
    const attendanceList = await Attendance.find()
      .populate("userId", "userName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All attendance records fetched successfully",
      data: attendanceList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

