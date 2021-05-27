const express = require("express");
const passport = require("passport");
const router = express.Router();
const { localAuthController, OpenAuthController, logOut } = require("../controllers/auth");

/* LOCAL AUTHENTICATION ROUTES */
const { postLogin, postRegistration } = localAuthController;

//router.get("/login", localAuthController.getLogin);
router.post("/login", postLogin);
// router.get("/register", localAuthController.getregister);
router.post("/register", postRegistration);

/* OPEN AUTHENTICATION ROUTES */
const { getGoogleCallback, getGoogleLogIn } = OpenAuthController;

router.get("/google", getGoogleLogIn);
router.get("/google/callback", getGoogleCallback);

/* LOG OUT ROUTE */
router.get("/logout", logOut);

module.exports = router;
