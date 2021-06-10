const express = require("express");
const router = express.Router();
const multer = require("multer");

const { handleCardUpload } = require("../controllers/admin");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
});

// Ensure upload is of type "image"
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) return cb(null, true);
  cb(new Error("Not an image! Please upload an image"), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

router.post("/upload", upload.single("card-image"), handleCardUpload);

module.exports = router;
