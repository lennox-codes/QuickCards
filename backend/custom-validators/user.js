const validator = require("validator");
const { isEmpty } = require("./helpers.js");

const validateRegistration = (data) => {
  const validationErrors = {};

  // Potentially redundant
  //   data.firstName = !validator.isEmpty(data.firstName) ? data.firstName : "";
  //   data.lastName = !validator.isEmpty(data.lastName) ? data.lastName : "";
  //   data.email = !validator.isEmpty(data.email) ? data.email : "";
  //   data.password = !validator.isEmpty(data.password) ? data.password : "";

  // Name validation
  if (validator.isEmpty(data.firstName)) validationErrors.firstName = "First name is required ";
  if (validator.isEmpty(data.lastName)) validationErrors.lastName = "Last name is required ";

  // Email validation
  if (validator.isEmpty(data.email)) validationErrors.email = "Email is required";
  if (!validator.isEmail(data.email) && !validator.isEmpty(data.email))
    validationErrors.email = "Please enter a valid email";

  // Password validation
  if (data.password !== data.confirmPassword) validationErrors.password = "Passwords do not match";
  if (validator.isEmpty(data.password)) validationErrors.password = "Password is required";
  if (!validator.isEmpty(data.password) && !validator.isLength(data.password, { min: 8 })) {
    validationErrors.password = "Password must be at least 8 characters long";
  }

  return {
    validationErrors,
    isValid: isEmpty(validationErrors),
  };
};

const validateLogin = (data) => {
  const validationErrors = {};

  if (validator.isEmpty(data.email)) validationErrors.email = "Email is required";
  if (!validator.isEmail(data.email) && !validator.isEmpty(data.email))
    validationErrors.email = "Please enter a valid email";
  if (validator.isEmpty(data.password)) validationErrors.password = "Password is required";

  return {
    validationErrors,
    isValid: isEmpty(validationErrors),
  };
};

module.exports = { validateRegistration, validateLogin };
