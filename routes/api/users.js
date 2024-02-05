import express from "express";

import { shcemaUsers } from "./tools/validator.js";
import { bodyValidate } from "./middlewares/Validate.js";
import { createUser } from "../../controllers/users/signupUsers.js";
import { loginUsers } from "../../controllers/users/loginUsers.js";
import authMiddlewer from "./middlewares/jwt.js";
import { logoutUsers } from "../../controllers/users/logoutUsers.js";
import { currentUsers } from "../../controllers/users/currentUsers.js";
import { updateAvatar } from "../../controllers/users/apdateAvatar.js";
import { uploadMiddleware } from "./middlewares/upload.js";

const router = express.Router();

router.post("/signup", bodyValidate(shcemaUsers), createUser);

router.post("/login", bodyValidate(shcemaUsers), loginUsers);

router.get("/logout", authMiddlewer, logoutUsers);

router.get("/current", authMiddlewer, currentUsers);

router.patch(
  "/avatars",
  authMiddlewer,
  uploadMiddleware.single("picture"),
  updateAvatar
);
export { router };
