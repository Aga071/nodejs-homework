// import { signupUser, checkingEmail } from "../../models/users";
import User from "../../models/User.js";

const createUser = async (req, res, next) => {
  const { email, password } = req.body;

  //   const user = await checkingEmail(body);

  const user = await User.findOne({ email }).lean();
  if (user) {
    return res.json({ Status: 409, message: "Email in use" });
  }
  try {
    const newUser = new User({ email });
    await newUser.setPassword(password);
    await newUser.save();
    return res.json({
      status: 201,
      data: { email, subscription: "starter" },
    });
  } catch (err) {
    console.log("Signup not found", err.message);
  }
};

export { createUser };
