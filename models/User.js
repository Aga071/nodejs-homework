import mongoose from "mongoose";
import bCrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});
// register
userSchema.methods.setPassword = async function (password) {
  this.password = await bCrypt.hash(password, 10);
};

// login
userSchema.methods.validatePassword = async function (password) {
  return bCrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema, "users");

export default User;
