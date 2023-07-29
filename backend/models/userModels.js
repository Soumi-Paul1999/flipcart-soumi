const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  avatar: {
    type: String,
  },
  userName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },

  password: {
    type: String,
  },

  birthdate: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
