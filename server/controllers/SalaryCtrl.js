const SalarySlip=require("../models/salarySlip");
const UserModel=require("../models/UserModel");

exports.generateSalarySlip=async(req,res)=>{
    try{
        const{userId,month,hra, basicSalary,allowances,deductions}=req.body;
        const user=await UserModel.findById(userId);
        if(!user)return res.status(404).json({message:"User not found"});

        const netSalary= basicSalary+hra+allowances-deductions;
        const slip=new SalarySlip({userId, userName: user.userName, month,hra,basicSalary,allowances,deductions,netSalary});
        await slip.save();
        res.status(201).json({message:"Salary Slip Generated Successfuly",slip});

    }catch(error){
        res.status(500).json({message:error.message||"Internal Server Error"});
    }
}
exports.updateSalarySlip=async(req,res)=>{
    try{
        const{id}=req.params;
        const{hra,basicSalary,allowances,deductions,month}=req.body;
        const slip = await SalarySlip.findById(id); 
 
        if(!slip)return res.status(404).json({message:"Salary Slip is not found"});

        slip.hra=hra ??slip.hra;
        slip.basicSalary=basicSalary??slip.basicSalary;
        slip.allowances=allowances??slip.allowances;
        slip.deductions=deductions??slip.deductions;
        slip.month=month??slip.month;
        slip.netSalary = slip.basicSalary + slip.hra + slip.allowances - slip.deductions;

        await slip.save();
        res.status(200).json({message:"Salary slip updated successfully",slip})

    }catch(error){
        res.status(500).json({message:error.message||"Internal Server Error"});
    }
}

exports.deleteSalarySlip=async(req,res)=>{
    try{
        const{id}=req.params;
        const slip= await SalarySlip.findByIdAndDelete(id);
        if(!slip)return res.status(400).json({message:"Salary Slip not found"});

        res.status(200).json({message:"Salary Slip deleted successfully"});

    }catch(error){
        res.status(500).json({message:error.message||"Internal Server Error"});
    }
}