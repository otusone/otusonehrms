const express = require('express');
const router = express.Router();
const User=require('../controllers/Auth/authController')




const admin = require('./authRoutes');
router.use('/admin', admin)

const user = require('./userRoutes');
router.use('/user', user)


const profile= require("./userRoutes");
router.use("/user",user)


module.exports = router;
