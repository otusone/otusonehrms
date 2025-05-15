// const mongoose=require("mongoose");

// const salarySlipSchema=new mongoose.Schema({
//     userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
//     userName:{type:String,required:true},
//     month:{type:String,required:true},
//     basicSalary:{type:Number,required:true},
//     hra:{type:Number,required:true},
//     allowances:{type:Number,required:true},
//     deductions:{type:Number,required:true},
//     netSalary:{type:Number,required:true},


// }, { timestamps: true })
// module.exports = mongoose.model("SalarySlip", salarySlipSchema);

const mongoose = require("mongoose");

const salarySlipSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true, trim: true, },
    month: { type: String, required: true },
    employeeRef: { type: String, required: true },
    designation: { type: String, required: true },
    dateOfJoining: { type: String, required: true },
    payDate: { type: String, required: true },
    paidDays: { type: Number, required: true },
    lopDays: { type: Number, required: true },
    basicSalary: { type: Number, required: true },
    allowances: { type: Number, required: true },
    otherBenefits: { type: Number, required: true },
    grossEarnings: { type: Number, required: true },
    pf: { type: Number, required: true },
    tds: { type: Number, required: true },
    otherDeductions: { type: Number, required: true },
    totalDeductions: { type: Number, required: true },
    reimbursement1: { type: Number, required: true },
    reimbursement2: { type: Number, required: true },
    totalReimbursements: { type: Number, required: true },
    netSalary: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("SalarySlip", salarySlipSchema);
