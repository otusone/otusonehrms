const mongoose = require("mongoose");

const salarySlipSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    employeeId: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true, trim: true, },
    month: { type: String, required: true },
    designation: { type: String, required: true },
    dateOfJoining: { type: Date, required: true },
    payDate: { type: String, required: true },
    paidDays: { type: Number, required: true },
    lopDays: { type: Number, required: true },
    basicSalary: { type: Number, required: true },
    allowances: { type: Number, default: 0 },
    otherBenefits: { type: Number, default: 0 },
    grossEarnings: { type: Number, default: 0, set: (v) => Math.round(v * 100) / 100 },
    pf: { type: Number, default: 0 },
    tds: { type: Number, default: 0 },
    otherDeductions: { type: Number, default: 0 },
    totalDeductions: { type: Number, default: 0 },
    reimbursement1: { type: Number, default: 0 },
    reimbursement2: { type: Number, default: 0 },
    totalReimbursements: { type: Number, default: 0 },
    netSalary: { type: Number, required: true, set: (v) => Math.round(v * 100) / 100 },
}, { timestamps: true });

module.exports = mongoose.model("SalarySlip", salarySlipSchema);
