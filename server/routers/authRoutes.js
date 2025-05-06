const express = require("express");
// const {Auth,isUser,}=require("../middleware/auth")
const { register, login } = require("../controllers/Auth/authController");
const { adminAuth } = require("../middleware/adminAuth");
const { generateSalarySlip, deleteSalarySlip, updateSalarySlip } = require("../controllers/SalaryCtrl");

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.post("/salary-slip", adminAuth, generateSalarySlip);
router.patch("/salary-slip/:id", adminAuth, updateSalarySlip);
router.delete("/delete-slip/:id", adminAuth, deleteSalarySlip);


module.exports = router;