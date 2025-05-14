const express = require("express");
const { register, login,resendVerification } = require("../controllers/Auth/userAuthCtrl");
const userController = require("../controllers/Auth/userAuthCtrl");
const { markClockIn, markClockOut, getAtendanceByDate, getMonthlyReport } = require("../controllers/attendanceCtrl");
const { userAuth, isUser } = require("../middleware/auth");
const { applyForLeave, updateLeave, deleteLeave } = require("../controllers/leaveCtrl");
const { getSalarySlipsByUser } = require("../controllers/SalaryCtrl");
const router = express.Router();
const otpCtrl = require('../controllers/otpCtrl');
const adminAuth = require("../middleware/adminAuth"); 

router.use(express.json());


router.post("/register", register);
router.post("/login", login);
router.post('/otpgeneration', otpCtrl.generateOTP);
router.post("/passwordreset",adminAuth,otpCtrl.resetPassword);


router.post('/otpverify', otpCtrl.verifyOTP);
//profile
router.get('/profile/:id', userAuth, userController.getProfile);
router.post("/resendverification",userController.resendVerification);
router.patch("/updateprofile", userAuth, userController.updateProfile);
router.delete("/deleteprofile", userAuth, userController.deleteProfile);
//attendance
router.post("/clockinattendance", userAuth, markClockIn);
router.patch("/clockoutattendance/:id", userAuth, markClockOut);
router.get("/attendance-list", userAuth, getAtendanceByDate);
router.get("/attendance-report", userAuth, getMonthlyReport);
//leave
router.post("/leave", userAuth, applyForLeave);
router.patch("/leave/:id", userAuth, updateLeave);
router.delete("/delete-leave/:id", userAuth, deleteLeave);
//salary-slip
router.get("/get-salary-slip/:userId", userAuth, getSalarySlipsByUser);




module.exports = router;