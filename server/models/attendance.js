const mongoose=require("mongoose");
const attendanceSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    clockIn:{type:Date,required:false},
    clockOut:{type:Date,required:false},
    date:{type:String,required:true},
    clockInLocation: {latitude: { type: Number, required: true },longitude: { type: Number, required: true },},
    clockOutLocation: {latitude: { type: Number },longitude: { type: Number },},
    workingHours:{type:Number,default:0},
 
},{ timestamp:true})

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;