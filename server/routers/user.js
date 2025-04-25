const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const {userAuth} = require("../middleware/auth");



router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/profile", userAuth, userController.getProfile);
router.delete("/profile", userAuth, userController.deleteProfile);

router.get("/", userAuth, userController.getAllUsers);
router.get("/:id", userAuth, userController.getUserById);
router.delete("/:id", userAuth,userController.deleteUser);

module.exports = router;