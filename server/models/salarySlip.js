const mongoose=require("mongoose");

const salarySlipSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    userName:{type:String,required:true},
    month:{type:String,required:true},
    basicSalary:{type:Number,required:true},
    hra:{type:Number,required:true},
    allowances:{type:Number,required:true},
    deductions:{type:Number,required:true},
    netSalary:{type:Number,required:true},


}, { timestamps: true })
module.exports = mongoose.model("SalarySlip", salarySlipSchema);