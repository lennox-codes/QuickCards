const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

// Password hash middleware
AdminSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  if (!hashedPassword) return console.log(error);
  user.password = hashedPassword;
  next();
});

// Helper method for validating password
AdminSchema.methods.comparePassword = async function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    callback(err, isMatch);
  });
};

module.exports = mongoose.model("Admin", AdminSchema);
