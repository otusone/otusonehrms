const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Accepted", "Denied"], default: "Pending" },
  reason: { type: String, required: true }
}, { timestamps: true }); 
const Leave = mongoose.model("Leave", LeaveSchema);

module.exports = Leave;
