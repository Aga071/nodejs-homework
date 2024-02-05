// import { signupUser, checkingEmail } from "../../models/users";
import User from "../../models/User.js";
import gravatar from "gravatar";

const createUser = async (req, res, next) => {
  const { email, password } = req.body;

  //   const user = await checkingEmail(body);

  const user = await User.findOne({ email }).lean();
  if (user) {
    return res.json({ Status: 409, message: "Email in use" });
  }
  try {
    const avatarURL = gravatar.url(email, {
      s: "250",
      r: "pg",
      d: "identicon",
    });
    const newUser = new User({ email });
    await newUser.setPassword(password);
    newUser.avatarURL = avatarURL;
    await newUser.save();
    return res.status(201).json({
      status: 201,
      data: { email, avatarURL, subscription: "starter" },
    });
  } catch (err) {
    console.log("Signup not found", err.message);
  }
};

export { createUser };
