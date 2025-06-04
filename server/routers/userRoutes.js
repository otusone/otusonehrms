const express = require("express");
const { register, login, verifyToken } = require("../controllers/Auth/userAuthCtrl");
const userController = require("../controllers/Auth/userAuthCtrl");
const { markClockIn, markClockOut, getAtendanceByDate, getMonthlyReport, getAllAttendance, getAttendanceByUserId } = require("../controllers/attendanceCtrl");
const { userAuth, isUser } = require("../middleware/auth");
const { applyForLeave, updateLeave, deleteLeave, getMyLeaves } = require("../controllers/leaveCtrl");
const { getSalarySlipsByUser } = require("../controllers/SalaryCtrl");
const { getAssetsByUserId } = require("../controllers/assetsCtrl");
const { getHolidays } = require("../controllers/holidayCtrl");
const employeeController = require("../controllers/employeeCtrl");


const router = express.Router();

router.use(express.json());


router.post("/register", register);
router.post("/login", login);
router.get("/verify-token", verifyToken);


//profile
router.get('/profile/:id', userAuth, userController.getProfile);
router.patch("/updateprofile/:id", userAuth, userController.updateProfile);
router.delete("/deleteprofile", userAuth, userController.deleteProfile);
//attendance
router.post("/clockinattendance", markClockIn);
router.patch("/clockoutattendance/:id", userAuth, markClockOut);
router.get("/attendance-list", userAuth, getAtendanceByDate);
router.get("/attendance-report", userAuth, getMonthlyReport);
router.get("/get-attendance", getAllAttendance);
router.get("/attendance/:userId", getAttendanceByUserId);


//leave
router.post("/leave", userAuth, applyForLeave);
router.patch("/leave/:id", userAuth, updateLeave);
router.delete("/delete-leave/:id", userAuth, deleteLeave);
router.get("/my-leaves", userAuth, getMyLeaves);

//salary-slip
router.get("/get-salary-slip/:userId", userAuth, getSalarySlipsByUser);


//asset
router.get("/get-asset/:userId", userAuth, getAssetsByUserId);

//holidays
router.get('/get-holidays', userAuth, getHolidays);

//employee
router.get("/get-employees/:id", userAuth, employeeController.getEmployeeById);






module.exports = router;