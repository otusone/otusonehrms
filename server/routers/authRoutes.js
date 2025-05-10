const express = require("express");
const { register, login } = require("../controllers/Auth/authController");
const { userAuth, isAdmin } = require("../middleware/auth");
const { generateSalarySlip, deleteSalarySlip, updateSalarySlip } = require("../controllers/SalaryCtrl");
const { updateLeaveStatus, getAllLeaves } = require("../controllers/leaveCtrl");
const { createAsset, updateAsset, getAllAssets, getAssetById, deleteAsset } = require("../controllers/assetsCtrl");
const employeeController = require("../controllers/employeeCtrl");
const staffController = require("../controllers/staffCtrl");



const router = express.Router();


router.post("/register", register);
router.post("/login", login);

//salary-slip
router.post("/salary-slip", userAuth, isAdmin, generateSalarySlip);
router.patch("/update-salary-slip/:id", userAuth, isAdmin, updateSalarySlip);
router.delete("/delete-slip/:id", userAuth, isAdmin, deleteSalarySlip);

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



module.exports = router;