const express = require("express");
const passport = require("passport");
const router = express.Router();
const { localAuthController, openAuthController } = require("../controllers/auth/user");
const adminAuthController = require("../controllers/auth/admin");
const logOut = require("../controllers/auth/logout");

/* LOCAL AUTHENTICATION ROUTES */
// User
const { postLogin, postRegistration } = localAuthController;

//router.get("/login", localAuthController.getLogin);
router.post("/login", postLogin);
//router.get("/register", localAuthController.getregister);
router.post("/register", postRegistration);

//Admin
router.post("/admin/login", adminAuthController.login);
router.post("/admin/register", adminAuthController.register);

/* OPEN AUTHENTICATION ROUTES */
const { getGoogleCallback, getGoogleLogIn } = openAuthController;

router.get("/google", getGoogleLogIn);
router.get("/google/callback", getGoogleCallback);

/* LOG OUT ROUTE */
router.get("/logout", logOut);

module.exports = router;
