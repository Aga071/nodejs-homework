import express from "express";
import { schema } from "./tools/validator.js";
import { bodyValidate } from "./middlewares/Validate.js";

import { getAllContacts } from "../../controllers/contacts/indexContacts.js";
import { getContact } from "../../controllers/contacts/showContacts.js";
import { createContact } from "../../controllers/contacts/createContacts.js";
import { delateContact } from "../../controllers/contacts/deleteContacts.js";
import { putContact } from "../../controllers/contacts/updateContacts.js";
import { patchContact } from "../../controllers/contacts/updateStatusContacts.js";


const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContact);

router.post("/", bodyValidate(schema), createContact);

router.delete("/:contactId", delateContact);

router.put("/:contactId", bodyValidate(schema), putContact);

router.patch("/:contactId", patchContact);

export { router };
