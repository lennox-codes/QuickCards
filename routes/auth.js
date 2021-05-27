const express = require("express");
const passport = require("passport");
const router = express.Router();
const localAuthController = require("../controllers/auth/local");
//const OpenAuthController = require("../controllers/auth/open");

// Local Authentication
//router.get("/login", localAuthController.getLogin);
router.post("/login", localAuthController.postLogin);
// router.get("/register", localAuthController.getregister);

// Note that using passport authentication here isn't quite necessary
router.post("/register", localAuthController.postRegistration);

// Open Authentication
//router.get("/google", OpenAuthController);

// LogOut
//router.post("/logout", authController.logout);

module.exports = router;
