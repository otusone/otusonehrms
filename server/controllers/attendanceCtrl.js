const Attendance=require("../models/attendance");

exports.markAttendance=async(req,res)=>{
    try{
        const{userId,clockIn,date,clockInLocation}=req.body;
        
        const attendance=new Attendance({userId,clockIn,date,clockInLocation});
        await attendance.save();

        res.status(201).json({success:true,message:"attendance marked successfullyy",data:attendance});

    }catch(error){
        res.status(500).json({success:false,message:error.message||"Internal server Error"});
    }
}