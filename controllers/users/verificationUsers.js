import User from "../../models/User.js";

const verificationUser = async (req, res, next) => {
  const { verificationToken } = req.params;
  const verifiedUser = await User.findOne({ verificationToken });

  if (!verifiedUser) {
    return res.status(404).json({ Status: 404, message: "User not found" });
  }
  try {
    verifiedUser.verificationToken = false;
    verifiedUser.verify = true;
    await verifiedUser.save();

    return res.status(200).json({ message: "Verification successful" });
  } catch (err) {
    console.log("Verification failed", err.message);
  }
};

export { verificationUser };
