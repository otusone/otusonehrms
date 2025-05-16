const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, trim: true, },
  email: { type: String, required: true, trim: true, },
  password: { type: String, required: true, trim: true, },
  employeeId: { type: String, trim: true, },
  designation: { type: String, required: true, trim: true },
  dateOfJoining: { type: Date },
  religion: { type: String, trim: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true, },
  mobile: { type: String, required: true, },
  address: { type: String, },
  dateOfBirth: { type: Date, },
  isActive: { type: Boolean, default: true, },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  verified: { type: Boolean, default: false },
  token: { type: String, },

}, {
  versionKey: false,
  timestamps: true
});

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  return userObject;
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString(), }, process.env.JWT_SECRET, {
    expiresIn: '10day'
  })
  user.token = token
  await user.save()
  return token
}

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();

  } catch (err) {
    next(err);
  }
});


userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model("User", userSchema);
module.exports = User;
