const express = require("express");
const { register, login } = require("../controllers/Auth/userAuthCtrl");
const userController = require("../controllers/Auth/userAuthCtrl");
const { userAuth, isAdmin } = require("../middleware/auth");
const { generateSalarySlip, deleteSalarySlip, updateSalarySlip, getAllSalarySlips } = require("../controllers/SalaryCtrl");
const { updateLeaveStatus, getAllLeaves } = require("../controllers/leaveCtrl");
const { createAsset, updateAsset, getAllAssets, getAssetById, deleteAsset } = require("../controllers/assetsCtrl");
const employeeController = require("../controllers/employeeCtrl");
const staffController = require("../controllers/staffCtrl");
const attendanceController = require("../controllers/attendanceCtrl");




const router = express.Router();


router.post("/register", register);
router.post("/login", login);

//profile
router.get('/profile/:id', userAuth, isAdmin, userController.getProfile);
router.patch("/updateprofile/:id", userAuth, isAdmin, userController.updateProfile);
router.delete("/deleteprofile", userAuth, isAdmin, userController.deleteProfile);

//salary-slip
//router.post("/salary-slip", userAuth, isAdmin, generateSalarySlip);
router.patch("/update-salary-slip/:id", userAuth, isAdmin, updateSalarySlip);
router.delete("/delete-slip/:id", userAuth, isAdmin, deleteSalarySlip);
router.get("/get-salary-slip", userAuth, isAdmin, getAllSalarySlips);

//leave
router.patch("/leave/status/:id", userAuth, isAdmin, updateLeaveStatus);
router.get("/getAllLeaves", userAuth, isAdmin, getAllLeaves);

//asset
router.post("/asset", userAuth, isAdmin, createAsset);
router.patch("/update-asset/:id", userAuth, isAdmin, updateAsset);
router.get("/get-asset", userAuth, isAdmin, getAllAssets);
router.get("/get-asset/:id", userAuth, isAdmin, getAssetById);
router.delete("/delete-asset/:id", userAuth, isAdmin, deleteAsset);


//employee
router.get("/get-employees", userAuth, isAdmin, employeeController.getAllEmployees);
router.post("/add-employee", userAuth, isAdmin, employeeController.addEmployee);
router.patch("/update-employee/:id", userAuth, isAdmin, employeeController.updateEmployee);
router.delete("/delete-employee/:id", userAuth, isAdmin, employeeController.deleteEmployee);

//staff
router.get("/get-staff", userAuth, isAdmin, staffController.getAllStaff);

//attendance
router.get("/get-attendance", userAuth, isAdmin, attendanceController.getAllAttendance);




module.exports = router;