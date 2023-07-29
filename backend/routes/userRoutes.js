const express = require("express");
const { test,verifyOtp, sendOtp, signUp } = require("../controllers/userControllers");
const cloudinary = require("../utils/cloudinary");
const uploader = require("../middleware/multer")
const path = require("path");
const router = express.Router()

router.route("/test").get(test);

router.route("/send-otp").get(sendOtp);
router.route("/verify").post(verifyOtp);
router.route("/signup").post(uploader.single("avatar"),signUp);


module.exports = router;