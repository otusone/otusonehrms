const express=require("express");
// const {Auth,isUser,}=require("../middleware/auth")
const {register,login} = require("../controllers/Auth/userAuthCtrl");
const userController = require("../controllers/Auth/userAuthCtrl");
const {markAttendance}= require("../controllers/attendanceCtrl");
const { userAuth } = require("../middleware/auth");
const router=express.Router();

router.use(express.json());


router.post("/register", register);
router.post("/login", login);
router.get('/profile',userAuth, userController.getProfile);
router.patch("/updateprofile",userAuth,userController.updateProfile);
router.delete("/deleteprofile",userAuth,userController.deleteProfile);
router.post("/clockinattendance",userAuth,markAttendance);
router.patch("/clockoutattendance",userAuth,markAttendance);

// router.get('/profile', userAuthCtrl.getProfile);



module.exports=router;