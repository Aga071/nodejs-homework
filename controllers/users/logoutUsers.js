import User from "../../models/User.js";

const logoutUsers = async (req, res, next) => {
  const logoutUser = await User.findById(res.locals.user[0]._id);
  if (!logoutUser) {
    return res.status(401).json({ status: 401, message: "Not authorized" });
  }

  logoutUser.token = null;
  await logoutUser.save();
  return res.status(204).json({ startus: 204 });
};

export { logoutUsers };
