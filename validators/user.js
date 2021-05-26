const validator = require("validator");
const isEmpty = require("./isEmpty");

//Data should be req.body

const validateRegistration = (data) => {
  const validationErrors = {};

  // Potentially redundant
  //   data.firstName = !validator.isEmpty(data.firstName) ? data.firstName : "";
  //   data.lastName = !validator.isEmpty(data.lastName) ? data.lastName : "";
  //   data.email = !validator.isEmpty(data.email) ? data.email : "";
  //   data.password = !validator.isEmpty(data.password) ? data.password : "";

  // Name validation
  if (!validator.isEmpty(data.firstName)) validationErrors.email = "First name is required ";
  if (!validator.isEmpty(data.lastName)) validationErrors.email = "Last name is required ";
  if (!validator.isEmpty(data.lastName)) validationErrors.email = "Last name is required ";

  // Email validation
  if (validator.isEmpty(data.email)) validationErrors.email = "Email is required";
  if (!validator.isEmail(data.email)) validationErrors.email = "Please enter a valid email";
  //   else data.email = validator.normalizeEmail(data.email, { gmail_remove_dots: false });

  // Password validation
  if (validator.isEmpty(data.password)) validationErrors.password = "Password is required";
  if (!validator.isLength(data.password, { min: 8 }))
    validationErrors.password = "Password must be at least 8 characters long";
  if (data.password !== data.confirmPassword) validationErrors.password = "Passwords do not match";

  return {
    errors: validationErrors,
    isValid: !isEmpty(validationErrors),
  };
};

const validateLogin = (data) => {
  const validationErrors = {};

  if (!validator.isEmpty(data.email)) validationErrors.email = "Email is required";
  if (!validator.isEmail(data.email)) validationErrors.email = "Please enter a valid email";
  if (validator.isEmpty(req.body.password)) validationErrors.email = "Password is required";

  return {
    errors: validationErrors,
    isValid: !isEmpty(validationErrors),
  };
};

module.exports = { validateRegistration, validateLogin };
