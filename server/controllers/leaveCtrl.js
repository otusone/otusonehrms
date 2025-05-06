const Leave = require("../models/Leave");
const mongoose = require("mongoose");


const UserModel = require("../models/UserModel");

exports.applyForLeave = async (req, res) => {
  try {
    const { userId, startDate, endDate, reason } = req.body;


    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });


    const leave = new Leave({
      userId,
      userName: user.userName,
      startDate,
      endDate,
      reason,
    });

    await leave.save();
    res.status(201).json({ message: "Leave applied successfully", leave });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

exports.updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Leave ID:", id);

    // First validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid leave ID" });
    }

    // Now fetch the leave
    const leave = await Leave.findById(id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    const { startDate, endDate, status, reason } = req.body;

    leave.startDate = startDate ?? leave.startDate;
    leave.endDate = endDate ?? leave.endDate;
    leave.reason = reason ?? leave.reason;
    leave.status = status ?? leave.status;

    await leave.save();

    res.status(200).json({ message: "Leave updated successfully", leave });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};


exports.deleteLeave = async (req, res) => {
  try {

    const { id } = req.params;
    const deleted = await Leave.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Leave not found" });

    res.status(200).json({ message: "Leave deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

exports.updateLeaveStatusByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Use 'Pending' or 'Approved' or 'Rejected'." });
    }

    const leave = await Leave.findById(id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    leave.status = status;
    await leave.save();

    res.status(200).json({ message: `Leave ${status.toLowerCase()} successfully`, leave });

  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {

    const leaves = await Leave.find();

    res.status(200).json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};


