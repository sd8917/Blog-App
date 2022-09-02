const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");

router.get("/", userController.getAllUser);
router.post("/signup", userController.signUpUser);
router.post("/login", userController.loginUser);

module.exports = router;
