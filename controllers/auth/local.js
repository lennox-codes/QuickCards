const validator = require("validator");
const { validateRegistration, validateLogin } = require("../../custom_validators/user");
const User = require("../../models/User");

// //@route GET /auth/login
// const getLogin = (req, res) => {
//    if(req.user) {
//       //Return the index page if the user is already loggedIn
//       return res.redirect("/")
//    }
//    //res.render("login", {})
// },

//@route POST /auth/login
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

      // Run this block of code if the user already exists
      if (user) {
        return res.json({ msg: "Account with that email address or username already exists" });
        //   return res.redirect("../signup");
      }

      // Otherwise save the user in the database
      await newUser.save();
      // Then log said user in
      req.login(newUser, function (err) {
        if (err) {
          return next(err);
        }
        console.log(newUser);
        return res.redirect("/");
      });
    } else {
      console.log(validationErrors);
      return res.json(validationErrors);
    }
  } catch (error) {
    //console.error(error);
  }
};

const localController = { postRegistration };
module.exports = localController;
