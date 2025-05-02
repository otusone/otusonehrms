const mongoose=require("mongoose");
const attendanceSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    clockIn:{type:Date,required:true},
    clockOut:{type:Date,required:true},
    date:{type:String,required:true},
    clockInLocation: {latitude: { type: Number, required: true },longitude: { type: Number, required: true },},
    clockOutLocation: {latitude: { type: Number },longitude: { type: Number },},
 
},{ timestamp:true})

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;