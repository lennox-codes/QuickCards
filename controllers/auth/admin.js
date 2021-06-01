const validator = require("validator");
const { validateLogin } = require("../../custom-validators/user");
const passport = require("passport");
const Admin = require("../../models/Admin");

// @desc Login Admin
// @router admin/login
const login = async (req, res, next) => {
  const { validationErrors, isValid } = validateLogin(req.body);

  try {
    if (isValid) {
      req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

      passport.authenticate("local-admin", (err, user, info) => {
        if (err) return next(err);
        console.log(user);
        if (!user) {
          return res.json({ error: info });
          //return res.redirect("/");
        }

        req.login(user, (err) => {
          if (err) return next(err);
          return res.json({ success: { msg: "You have been logged in successfully" } });
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

const register = async (req, res, next) => {
  try {
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

    const newAdmin = new Admin(req.body);

    const admin = await Admin.findOne({ email: req.body.email });

    if (admin) {
      return res.json({ msg: "Account with that email address or username already exists" });
    }

    await newAdmin.save();

    req.login(newAdmin, function (err) {
      if (err) return next(err);
      return res.json({ msg: "New admin account created successfully" });
    });
  } catch (error) {
    console.error(error);
  }
};
module.exports = { login, register };
