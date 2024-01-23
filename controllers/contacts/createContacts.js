import { addContact } from "../../models/contacts.js";

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const body = {
    name,
    email,
    phone,
  };

  if (body.name && body.email && body.phone) {
    const newContact = await addContact(body);
    return res.json({ status: 201, data: newContact });
  } else {
    returnres.json({ status: 400, message: "missing required name - field" });
  }
};
export { createContact };
