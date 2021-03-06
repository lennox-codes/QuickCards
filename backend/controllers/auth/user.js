const validator = require("validator");
const { validateRegistration, validateLogin } = require("../../custom-validators/user");
const passport = require("passport");
const User = require("../../models/User");

/* LOCAL AUTHENTICATION */
// @desc Process User Login
// @route POST /auth/login
const postLogin = async (req, res, next) => {
  const { validationErrors, isValid } = validateLogin(req.body);

  try {
    if (isValid) {
      req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

      passport.authenticate("local-user", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
          return res.json({ error: info });
          //return res.redirect("/");
        }

        req.login(user, (err) => {
          if (err) return next(err);
          return res.json({ success: { msg: "Success! you have been successfully logged in" } });
          //return res.redirect("/cards");
        });
      })(req, res, next);
    } else {
      return res.json(validationErrors);
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc Process User Registration
// @route POST /auth/register
const postRegistration = async (req, res, next) => {
  const { validationErrors, isValid } = validateRegistration(req.body);

  try {
    if (isValid) {
      req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      });

      const user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.json({ msg: "Account with that email address or username already exists" });
      }

      await newUser.save();

      req.login(newUser, function (err) {
        if (err) return next(err);
        return res.redirect("/");
      });
    } else {
      console.log(validationErrors);
      return res.json(validationErrors);
    }
  } catch (error) {
    console.error(error);
  }
};

const getSignUp = () => {};

//@desc Auth with Google
//@route GET/ auth/google
const getGoogleLogIn = (req, res, next) => {
  passport.authenticate("google", { scope: ["email", "profile"] })(req, res, next);
};

// @desc Google with callback
// @route GET/ auth/google/callback
const getGoogleCallback = (req, res, next) => {
  passport.authenticate("google")(req, res, (err) => {
    if (err) return console.log(err);
    return res.json({ msg: "Google Oauth Successful", email: req.user.email });
  });
};

const localAuthController = { postRegistration, postLogin };
const openAuthController = { getGoogleLogIn, getGoogleCallback };
module.exports = { localAuthController, openAuthController };
