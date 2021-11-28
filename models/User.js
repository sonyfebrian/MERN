const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "please provide a username"],
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "please provide a email"],
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "please add a password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  ResetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;
