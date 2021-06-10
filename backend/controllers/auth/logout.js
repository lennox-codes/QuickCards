const mongoose = require("mongoose");
const Admin = require("../../models/Admin");

const logOut = async (req, res) => {
  const admin = await Admin.findById(req.user.id);
  if (!admin) {
    return res.json({ msg: `User ${req.user.email} Log Out Successful` });
  } else {
    return res.json({ msg: "Admin Log Out Successful" });
  }
  //res.redirect("/");
};

module.exports = logOut;
