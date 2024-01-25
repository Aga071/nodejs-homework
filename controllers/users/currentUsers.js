import User from "../../models/User.js";

const currentUsers = async (req, res, next) => {
  const user = await User.findById(res.locals.user[0]._id);
  if (!user) {
    return res.status(401).json({ status: 401, message: "Not authorized" });
  }

  return res.status(204).json({
    startus: 204,
    message: { email: user.email, subscription: user.subscription },
  });
};

export { currentUsers };
