const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const User = require("../models/userModels");

exports.twilioSendOtp = async (phnNum, channl, res) => {
  await twilio.verify
    .services(process.env.TWILIO_SERVICE_ID)
    .verifications.create({
      to: `+${phnNum}`,
      channel: channl === "call" ? "call" : "sms",
    })
    .then((data) => {
      console.log("verification is send", data);
      res.status(200).send({
        message: "verification is send",
        phoneNumber: phnNum,
        data,
      });
    })
    .catch((error) => {
      console.log("twilio error", error);
      res.status(400).send({
        message: "Wrong phone number :(",
        poneNumber: phnNum,
      });
    });
};

exports.twilioVerifyOtp = async (phnNum, code, res) => {
  // if (phnNum && code === 6) {
  try {
    const verifiedResponse = await twilio.verify.v2
      .services(process.env.TWILIO_SERVICE_ID)
      .verificationChecks.create({
        to: `+${phnNum}`,
        code: code,
      });
    // const  y = verifiedResponse;
    // console.log("verify resss", y);

    if (verifiedResponse.status === "approved") {
      res.status(200).send({
        message: "User is Verified!!",
      });
    } else {
      res.status(400).send({
        message: "Wrong code :(",
        phonenumber: phnNum,
      });
    }
  } catch (error) {
    console.log("twillo verify err", error);
  }
  // }
};
