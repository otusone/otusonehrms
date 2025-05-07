const express = require("express");
// const {Auth,isUser,}=require("../middleware/auth")
const { register, login } = require("../controllers/Auth/userAuthCtrl");
const userController = require("../controllers/Auth/userAuthCtrl");
const { markClockIn, markClockOut, getAtendanceByDate, getMonthlyReport } = require("../controllers/attendanceCtrl");
const { userAuth } = require("../middleware/auth");
const { applyForLeave, updateLeave, deleteLeave } = require("../controllers/leaveCtrl");
const { getSalarySlipsByUser } = require("../controllers/SalaryCtrl");
const router = express.Router();

router.use(express.json());


router.post("/register", register);
router.post("/login", login);
router.get('/profile', userAuth, userController.getProfile);
router.patch("/updateprofile", userAuth, userController.updateProfile);
router.delete("/deleteprofile", userAuth, userController.deleteProfile);
router.post("/clockinattendance", userAuth, markClockIn);
router.patch("/clockoutattendance/:id", userAuth, markClockOut);
router.get("/attendance-list", userAuth, getAtendanceByDate);
router.get("/attendance-report", userAuth, getMonthlyReport);
router.post("/leave", userAuth, applyForLeave);
router.patch("/leave/:id", userAuth, updateLeave);
router.delete("/delete-leave/:id", userAuth, deleteLeave);
router.get("/get-salary-slip/:userId", userAuth, getSalarySlipsByUser);
// router.post("/salary-slip", userAuth, generateSalarySlip);
// router.patch("/salary-slip/:id", userAuth, updateSalarySlip);
// router.delete("/delete-slip/:id", userAuth, deleteSalarySlip);

// router.get('/profile', userAuthCtrl.getProfile);



module.exports = router;