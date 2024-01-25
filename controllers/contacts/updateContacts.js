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
      return res.status(200).json({ status: 200, body: renameContact });
    } else {
      return res.status(404).json({ status: 404, message: "Not found" });
    }
  } else {
    return res.status(400).json({ status: 400, message: "missing fields" });
  }
};
export { putContact };
