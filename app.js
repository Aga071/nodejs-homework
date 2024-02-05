import express from "express";
import logger from "morgan";
import cors from "cors";
import path from "path";

import { router as contactsRouter } from "./routes/api/contacts.js";
import { router as usersRouter } from "./routes/api/users.js";
import setJWTStrategy from "./config/jwt.js";
import authMiddlewer from "./routes/api/middlewares/jwt.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());


app.use(express.static(path.resolve(process.cwd(), "./public")));

setJWTStrategy();

app.use("/api/contacts", authMiddlewer, contactsRouter);

app.use("/users", usersRouter);

app.use((req, res) => {
  return res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  return res.status(500).json({ message: err.message });
});

export { app };
