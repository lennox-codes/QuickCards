const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Card = require("../models/Card");

const cloudinary = require("cloudinary").v2;

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const image = path.resolve("./", "uploads", req.file.filename);

    const uploadedImage = await cloudinary.uploader.upload(
      image,
      {
        folder: "Quickcards/images",
      },
      (err, result) => {
        if (err) return console.log(err);
        console.log(result);
      }
    );

    // Create new card

    await Card.create({
      category: req.body.category,
      type: "starter",
      image: uploadedImage.url,
    });

    // Clear Directory After uplaod to cloudinary
    const imageDirectory = path.resolve("./", "uploads");

    fs.readdir(imageDirectory, (err, files) => {
      if (err) return console.error(err);

      for (const file of files) {
        fs.unlink(path.join(imageDirectory, file), (err) => {
          if (err) throw err;
        });
      }

      console.log("Directory cleared successfully");
    });

    //res.redirect("/");
    res.json("Image upload and storage was a success");
  } catch (error) {
    console.error;
  }
});

module.exports = router;
