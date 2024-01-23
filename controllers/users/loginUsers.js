import User from "../../models/User.js";
import jwt from "jsonwebtoken";

const loginUsers = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }
  const isPasswordCorrect = await user.validatePassword(password);
  if (isPasswordCorrect) {
    const payload = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });
    user["token"] = token;
    await user.save();
    return res.status(200).json({ data: user });
  } else {
    return res.status(401).json({ message: "Email or password is wrong" });
  }
};
export { loginUsers };
