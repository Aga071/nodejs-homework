import { sendVerificationMail } from "../../config/service/mail.service.js";
import User from "../../models/User.js";

const reVerificationUser = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ Status: 400, message: "missing required field email" });
  }
  const verifiedUser = await User.findOne({ email });
  //   console.log(verifiedUser);
  if (!verifiedUser) {
    return res.status(404).json({ Status: 404, message: "User not found" });
  }

  if (verifiedUser.verificationToken === "false") {
    return res
      .status(400)
      .json({ Status: 404, message: "Verification has already been passed" });
  }
  try {
    sendVerificationMail(verifiedUser.verificationToken, email);

    return res.status(200).json({ message: "Verification email sent" });
  } catch (err) {
    console.log("Verification failed", err.message);
  }
};

export { reVerificationUser };
