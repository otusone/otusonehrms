const express =require("express");
const router=express.Router();


router.route("/").get(getAllSignups);
router.route("/testing").get(getAllSignupsTesting);


module.exports=router;