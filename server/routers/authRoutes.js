const express=require("express");
// const {Auth,isUser,}=require("../middleware/auth")
const {register,login} = require("../controllers/Auth/authController");


const router=express.Router();


router.post("/register", register);
router.post("/login", login);



module.exports=router;