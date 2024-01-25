import passport from "passport";
import User from "../../../models/User.js";

export default function authMiddlewer(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({ status: 401, message: "Unauthorized" });
    }
    const bearerToken = req.headers.authorization.split(" ")[1];
    const checkUser = User.findById(user._id);
    console.log(user[0]);
    // console.log(checkUser);
    if (!checkUser || user[0].token !== bearerToken) {
      return res.status(401).json({ status: 401, message: "Unauthorized" });
    }
    res.locals.user = user;
    next();
  })(req, res, next);
}
