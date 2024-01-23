import express from "express";

import { shcemaUsers } from "./tools/validator.js";
import { bodyValidate } from "./middlewares/Validate.js";
import { createUser } from "../../controllers/users/signupUsers.js";
import { loginUsers } from "../../controllers/users/loginUsers.js";

const router = express.Router();

router.post("/signup", bodyValidate(shcemaUsers), createUser);

router.post("/login", bodyValidate(shcemaUsers), loginUsers);
export { router };