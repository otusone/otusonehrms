const express=require("express");
// const {Auth,isUser,}=require("../middleware/auth")
const {register,login} = require("../controllers/Auth/userAuthCtrl");
const userController = require("../controllers/Auth/userAuthCtrl");
const router=express.Router();

router.use(express.json());


router.post("/register", register);
router.post("/login", login);
router.get('/profile',userController.getProfile);
// router.get('/profile', userAuthCtrl.getProfile);



module.exports=router;