const User = require("../models/userModels");
const { twilioSendOtp, twilioVerifyOtp } = require("../utils/sendOtp");
const cloudinary = require("../utils/cloudinary");
const { catchAsyncError } = require("../middleware/catchAsyncError");

//for test routes
exports.test = (req, res) => {
  res.status(200).get("test routes called");
};

//for before signup otp sending using phone number 
exports.sendOtp = async (req, res) => {
  //    await User.create({phoneNumber: req.body.phoneNumber})
  await twilioSendOtp(req.query.phoneNumber, req.query.channel, res);
};

//for verify otp using phn number 
exports.verifyOtp = async (req, res) => {
  await twilioVerifyOtp(req.body.phoneNumber, req.body.code, res);
};

exports.signUp = catchAsyncError(async (req, res) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    birthdate,
  } = req.body;

  //for file upload using multer and cludinary
  console.log("req.file", req.file);
  const upload = await cloudinary.v2.uploader.upload(req.file.path);
  console.log("upload", upload);

  const users = await User.create({
    userName,
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    birthdate,
    avatar: upload.url,
  });

  res.status(201).json({
    success: true,
    message: "user registered successfully",
    users,
  });
});
