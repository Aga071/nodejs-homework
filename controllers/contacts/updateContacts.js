import { updateContact } from "../../models/contacts.js";

const putContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { contactId } = req.params;
  const body = {
    name,
    email,
    phone,
  };

  if (body.name || body.email || body.phone) {
    const renameContact = await updateContact(contactId, body);
    if (renameContact) {
      return res.json({ status: 200, body: renameContact });
    } else {
      return res.json({ status: 404, message: "Not found" });
    }
  } else {
    return res.json({ status: 400, message: "missing fields" });
  }
};
export { putContact };
