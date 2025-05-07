const express = require("express");
// const {Auth,isUser,}=require("../middleware/auth")
const { register, login } = require("../controllers/Auth/authController");
const { adminAuth } = require("../middleware/adminAuth");
const { generateSalarySlip, deleteSalarySlip, updateSalarySlip } = require("../controllers/SalaryCtrl");
const { updateLeaveStatusByAdmin, getAllLeaves } = require("../controllers/leaveCtrl");
const { createAsset, updateAsset, getAllAssets, getAssetById, deleteAsset } = require("../controllers/assetsCtrl");


const router = express.Router();


router.post("/register", register);
router.post("/login", login);

//salary-slip
router.post("/salary-slip", adminAuth, generateSalarySlip);
router.patch("/update-salary-slip/:id", adminAuth, updateSalarySlip);
router.delete("/delete-slip/:id", adminAuth, deleteSalarySlip);

//leave
router.patch("/leave/status/:id", adminAuth, updateLeaveStatusByAdmin);
router.get("/getAllLeaves", adminAuth, getAllLeaves);

//asset
router.post("/asset", adminAuth, createAsset);
router.patch("/update-asset/:id", adminAuth, updateAsset);
router.get("/get-asset", adminAuth, getAllAssets);
router.get("/get-asset/:id", adminAuth, getAssetById);
router.delete("/delete-asset/:id", adminAuth, deleteAsset);


module.exports = router;